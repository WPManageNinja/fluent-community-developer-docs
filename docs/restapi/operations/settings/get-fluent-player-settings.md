---
title: Get Fluent Player Settings
description: "Returns the FluentPlayer integration settings used for lesson and post video playback."
outline: false
aside: false
---

Returns the FluentPlayer integration settings used for lesson and post video playback.

## Endpoint

- **Method:** `GET`
- **Path:** `/settings/fluent-player-settings`
- **Edition:** Core
- **Controller:** `SettingController@getFluentPlayerSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:174`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getFluentPlayerSettings" specUrl="/openapi/public/settings/get-fluent-player-settings.json" />
