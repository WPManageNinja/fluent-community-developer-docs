---
title: Save Color Config
description: "Selects the light and dark colour schemas, and compiles the resulting CSS once so the portal can serve it without regenerating per request."
outline: false
aside: false
---

Selects the light and dark colour schemas, and compiles the resulting CSS once so the portal can serve it without regenerating per request.

Both `light_schema` and `dark_schema` must name a schema that exists, otherwise the call is rejected. Choosing `custom` for either side stores the matching `light_config` or `dark_config` selector map; choosing a named schema clears it. The compiled CSS is cached against the plugin version.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/color-config`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@saveColorConfig`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:31`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveColorConfig" specUrl="/openapi/public/settings/save-color-config.json" />
