---
title: Save Privacy Settings
description: "Stores the privacy configuration."
outline: false
aside: false
---

Stores the privacy configuration.

These values feed the visibility checks on the members directory, profile pages, profile space lists, and the username, email and password change controls, so a change here alters what several member-facing endpoints return.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/privacy-settings`
- **Edition:** Core
- **Controller:** `SettingController@updatePrivacySettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:169`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="savePrivacySettings" specUrl="/openapi/public/settings/save-privacy-settings.json" />
