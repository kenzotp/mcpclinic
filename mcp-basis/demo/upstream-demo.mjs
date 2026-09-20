// Demo upstream: a fake CRM REST API with per-tenant in-memory data.
// Stand-in for the client's real API while developing/testing the template.
import http from "node:http";

const store = new Map(); // tenant -> Map(id -> contact)
let nextId = 41;

function tenantMap(tenant) {
  if (!store.has(tenant)) {
    const m = new Map();
    if (tenant === "acme") {
      m.set("c_42", { id: "c_42", name: "Anna Beispiel", email: "anna@beispiel.de", company: "Beispiel GmbH" });
      m.set("c_43", { id: "c_43", name: "Ben Demo", email: "ben@demo.io", company: "Demo AG" });
    }
    store.set(tenant, m);
  }
  return store.get(tenant);
}

const server = http.createServer((req, res) => {
  // auth: the demo token only; a real client API has its own model
  if (req.headers.authorization !== "Bearer demo-upstream-token") {
    res.writeHead(401, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "unauthorized" }));
    return;
  }
  const m = req.url.match(/^\/tenants\/([^/]+)\/contacts(?:\/([^?]+))?(\?.*)?$/);
  if (!m) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not found" }));
    return;
  }
  const tenant = decodeURIComponent(m[1]);
  const id = m[2] ? decodeURIComponent(m[2]) : null;
  const query = new URL(m[3] ?? "", "http://x").searchParams;
  const contacts = tenantMap(tenant);

  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    const payload = body ? JSON.parse(body) : null;
    const json = (code, obj) => {
      res.writeHead(code, { "content-type": "application/json" });
      res.end(JSON.stringify(obj));
    };

    if (req.method === "GET" && !id) {
      const q = (query.get("query") ?? "").toLowerCase();
      const limit = Number(query.get("limit") ?? 20);
      const all = [...contacts.values()].filter(
        (c) => !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q),
      );
      json(200, { contacts: all.slice(0, limit), total: all.length });
    } else if (req.method === "GET" && id) {
      const c = contacts.get(id);
      c ? json(200, c) : json(404, { error: `contact '${id}' not found` });
    } else if (req.method === "POST" && !id) {
      const dup = [...contacts.values()].find((c) => c.email === payload.email);
      if (dup) return json(409, { error: `contact with email '${payload.email}' already exists (id ${dup.id})` });
      const created = {
        id: `c_${nextId++}`,
        name: payload.name,
        email: payload.email,
        company: payload.company ?? null,
      };
      contacts.set(created.id, created);
      json(201, created);
    } else if (req.method === "PATCH" && id) {
      const c = contacts.get(id);
      if (!c) return json(404, { error: `contact '${id}' not found` });
      Object.assign(c, payload);
      json(200, c);
    } else if (req.method === "DELETE" && id) {
      if (!contacts.delete(id)) return json(404, { error: `contact '${id}' not found` });
      json(204, null);
      return;
    } else {
      json(405, { error: "method not allowed" });
    }
  });
});

const port = Number(process.env.UPSTREAM_PORT ?? 8091);
server.listen(port, () => process.stderr.write(`upstream demo on :${port}\n`));
