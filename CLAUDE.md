@AGENTS.md

## Claude Code notes

- EmDash skills are in `.claude/skills/` (`building-emdash-site`, `creating-plugins`, `emdash-cli`). Load `building-emdash-site` before touching pages, schema or seed.
- The `emdash-docs` MCP server is configured in `.mcp.json`; use it to confirm APIs.
- When the dev server is already running (port 4321), reuse it instead of starting another.
- Reply to the user in Vietnamese; code, commits and docs stay in English.
