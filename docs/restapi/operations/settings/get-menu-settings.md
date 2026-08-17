---
title: Get Menu Settings
description: "Returns the portal navigation configuration — the main menu, the profile dropdown, the pre-community items and the custom footer link groups."
outline: false
aside: false
---

Returns the portal navigation configuration — the main menu, the profile dropdown, the pre-community items and the custom footer link groups.

Groups are normalised to plain arrays and groups without a title are dropped, so the response is always render-ready.

## Endpoint

- **Method:** `GET`
- **Path:** `/settings/menu-settings`
- **Edition:** Core
- **Controller:** `SettingController@getMenuSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:156`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getMenuSettings" specUrl="/openapi/public/settings/get-menu-settings.json" />
