---
title: Get Privacy Settings
description: "Returns the privacy configuration that governs who can see the members directory, member profiles and member space lists, and what members may change about their own account."
outline: false
aside: false
---

Returns the privacy configuration that governs who can see the members directory, member profiles and member space lists, and what members may change about their own account.

## Endpoint

- **Method:** `GET`
- **Path:** `/settings/privacy-settings`
- **Edition:** Core
- **Controller:** `SettingController@getPrivacySettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:168`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getPrivacySettings" specUrl="/openapi/public/settings/get-privacy-settings.json" />
