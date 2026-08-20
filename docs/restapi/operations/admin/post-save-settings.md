---
title: Post Save Settings
description: "Validates and stores the Progressive Web App settings, marking a custom icon as permanent media and recording its pixel dimensions."
outline: false
aside: false
---

Validates and stores the Progressive Web App settings, marking a custom icon as permanent media and recording its pixel dimensions.

`app_name` is required and length-capped, as is `short_name`. `icon_source` must be `default` or `custom`, and a custom source without a resolvable icon is rejected. `install_position` accepts only `top` or `bottom`. Icon dimensions are validated before the media row is activated.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/pwa-settings`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `PwaController@saveSettings`
- **Route source:** `fluent-community-pro/app/Modules/Pwa/Http/pwa_api.php:9`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro; this is the PWA module settings endpoint despite its generic path name.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postSaveSettings" specUrl="/openapi/public/admin/post-save-settings.json" />
