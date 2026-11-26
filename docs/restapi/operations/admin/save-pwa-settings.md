---
title: "Save PWA Settings"
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

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="savePwaSettings" specUrl="/openapi/public/admin/save-pwa-settings.json" />
