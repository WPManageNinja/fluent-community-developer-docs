---
title: "Enable MCP Hub"
description: "Turns on FluentHub's shared MCP server, or another Fluent plugin's MCP, through FluentHub."
outline: false
aside: false
---

Turns on FluentHub's shared MCP server, or another Fluent plugin's MCP, through FluentHub.

This endpoint writes nothing itself: it asks FluentHub to do the switching and translates the answer. `target` defaults to `hub`, which turns on FluentHub's single-URL server; a plugin slug turns that plugin's MCP on instead.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/mcp/enable-hub`
- **Edition:** Core
- **Controller:** `McpSettingsController@enableHub`
- **Route source:** `fluent-community/Modules/Mcp/Http/mcp_api.php:12`
- **Controller source:** `fluent-community/Modules/Mcp/Http/Controllers/McpSettingsController.php`

- Site administrators only, and FluentHub applies its own permission check on top.
- FluentHub has to be installed and active. Without it the call answers 422, so this endpoint is useless on its own.
- It only ever turns things on. Switching off stays in FluentHub.
- A refusal from FluentHub answers 403, and every other failure — a missing or outdated adapter, an unknown product, no handler — answers 422 with the reason in the message.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="enableMcpHub" specUrl="/openapi/public/settings/enable-mcp-hub.json" />
