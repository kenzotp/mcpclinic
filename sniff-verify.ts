import { readFile } from "node:fs/promises";
import { httpPost, extractJsonRpcMessages } from "./src/probe/http.ts";
import { deriveSiblingHosts } from "./src/probe/discovery.ts";

const targets = JSON.parse(await readFile("report/targets.json", "utf8")) as {
  name: string;
  docsUrl: string;
}[];

const NAMES = [
  "Personio",
  "JTL-Software",
  "Lexware Office",
  "weclapp",
  "easybill",
  "propstack",
  "Userlike (jetzt Lime Connect)",
  "rexx systems",
];

const INIT = {
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2026-07-28",
    capabilities: {},
    clientInfo: { name: "probe", version: "0" },
  },
};

for (const name of NAMES) {
  const t = targets.find((x) => x.name === name);
  if (!t) continue;
  const hostname = new URL(t.docsUrl).hostname;
  const bare = hostname.replace(/^(www|docs|api|developers|developer)\./i, "");
  const hosts = [`mcp.${bare}`, ...deriveSiblingHosts(hostname)];
  console.log(`=== ${name} (${t.docsUrl})`);
  for (const h of hosts) {
    const url = `https://${h}/mcp`;
    const r = await httpPost(url, INIT).catch(() => null);
    if (!r) {
      console.log(`   ${url} -> no response`);
      continue;
    }
    const rpc = extractJsonRpcMessages(r);
    const www = r.headers.get("www-authenticate") || "";
    console.log(
      `   ${url} -> ${r.status} | jsonrpc:${rpc.length > 0} | ${r.contentType.slice(0, 28)} | www:${www.slice(0, 50) || "-"} | body:${(r.body || "").slice(0, 70).replace(/\s+/g, " ")}`,
    );
  }
}
