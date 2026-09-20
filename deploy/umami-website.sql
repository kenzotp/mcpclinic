INSERT INTO website (website_id, name, domain, user_id, created_by)
VALUES (gen_random_uuid(), 'MCP Clinic', 'mcpclinic.dev', '41e2b680-648e-4b09-bcd7-3e2b10c06264', '41e2b680-648e-4b09-bcd7-3e2b10c06264');
SELECT website_id, name, domain FROM website WHERE domain = 'mcpclinic.dev';
