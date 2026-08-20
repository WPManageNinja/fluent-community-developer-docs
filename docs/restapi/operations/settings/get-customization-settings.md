---
title: Get Customization Settings
description: "Returns the portal appearance settings — dark mode, header and sidebar behaviour, post modal, and the powered-by line."
outline: false
aside: false
---

Returns the portal appearance settings — dark mode, header and sidebar behaviour, post modal, and the powered-by line.

## Endpoint

- **Method:** `GET`
- **Path:** `/settings/customization-settings`
- **Edition:** Core
- **Controller:** `SettingController@getCustomizationSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:159`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getCustomizationSettings" specUrl="/openapi/public/settings/get-customization-settings.json" />
