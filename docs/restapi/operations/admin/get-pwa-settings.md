---
title: "Get PWA Settings"
description: "Returns the Progressive Web App settings — app name, short name, icon source, theme colour and install prompt position."
outline: false
aside: false
---

Returns the Progressive Web App settings — app name, short name, icon source, theme colour and install prompt position.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/pwa-settings`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `PwaController@getSettings`
- **Route source:** `fluent-community-pro/app/Modules/Pwa/Http/pwa_api.php:8`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro; this is the PWA module settings endpoint despite its generic path name.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getPwaSettings" specUrl="/openapi/public/admin/get-pwa-settings.json" />
