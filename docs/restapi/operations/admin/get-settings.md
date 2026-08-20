---
title: Get Settings
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

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getSettings" specUrl="/openapi/public/admin/get-settings.json" />
