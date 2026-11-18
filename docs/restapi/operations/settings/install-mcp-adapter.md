---
title: "Install MCP Adapter"
description: "Asks another Fluent plugin to install the MCP adapter, and returns the refreshed adapter state."
outline: false
aside: false
---

Asks another Fluent plugin to install the MCP adapter, and returns the refreshed adapter state.

FluentCommunity ships no installer of its own. This endpoint delegates to FluentHub's installer and then re-reads the adapter state in the same request — it is synchronous, with no background job. Takes no parameters.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/mcp/install-adapter`
- **Edition:** Core
- **Controller:** `McpSettingsController@installAdapter`
- **Route source:** `fluent-community/Modules/Mcp/Http/mcp_api.php:11`
- **Controller source:** `fluent-community/Modules/Mcp/Http/Controllers/McpSettingsController.php`

- Site administrators who also hold the WordPress capability to install plugins.
- It answers 422 when nothing on the site offers an installer, which is the normal case; the screen then links to the adapter download instead.
- It can answer 200 while the adapter is still not active, so read `adapter.active` rather than the status code.
- Either of two plugins can supply the adapter, and the response says which one is in play.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="installMcpAdapter" specUrl="/openapi/public/settings/install-mcp-adapter.json" />
