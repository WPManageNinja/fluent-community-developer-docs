---
title: "Save MCP Settings"
description: "Switches the MCP server on or off."
outline: false
aside: false
---

Switches the MCP server on or off.

Takes `settings.active` as the exact string `yes` or `no`; anything else is rejected. The value is stored in FluentCommunity's own options and the response is the full settings screen payload with a message.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/mcp`
- **Edition:** Core
- **Controller:** `McpSettingsController@save`
- **Route source:** `fluent-community/Modules/Mcp/Http/mcp_api.php:10`
- **Controller source:** `fluent-community/Modules/Mcp/Http/Controllers/McpSettingsController.php`

- Site administrators only, and the switch saves as soon as it is toggled — there is no separate save step.
- Turning it on neither installs nor checks for an adapter. Without one the MCP endpoint does not exist at all, so check `adapter.active` in the response rather than assuming the server is reachable.
- Abilities are registered on the next request, not this one.
- A missing or out-of-range value answers 422.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="saveMcpSettings" specUrl="/openapi/public/settings/save-mcp-settings.json" />
