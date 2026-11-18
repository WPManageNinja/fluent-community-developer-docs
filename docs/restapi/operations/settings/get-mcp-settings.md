---
title: "Get MCP Settings"
description: "Returns everything the MCP settings screen shows: whether the server is on, its endpoint and name, the adapter's state, the tool count and the FluentHub connection details."
outline: false
aside: false
---

Returns everything the MCP settings screen shows: whether the server is on, its endpoint and name, the adapter's state, the tool count and the FluentHub connection details.

The tool count is what this site has switched on rather than what the calling admin may run, and the Pro count is zero on a free site, where Pro's tools are present only as upsell stubs. `adapter.active` is the field that matters: it is true only when an MCP adapter plugin is active and the WordPress Abilities API is available. `hub` is null unless FluentHub is installed and reports a usable state.

## Endpoint

- **Method:** `GET`
- **Path:** `/settings/mcp`
- **Edition:** Core
- **Controller:** `McpSettingsController@get`
- **Route source:** `fluent-community/Modules/Mcp/Http/mcp_api.php:9`
- **Controller source:** `fluent-community/Modules/Mcp/Http/Controllers/McpSettingsController.php`

- Site administrators only.
- It answers normally with MCP switched off and with no adapter installed — the settings routes are registered either way.
- `is_local_dev` is true for the usual local hostnames and private addresses, which the screen uses to explain why a remote AI client cannot reach the site.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getMcpSettings" specUrl="/openapi/public/settings/get-mcp-settings.json" />
