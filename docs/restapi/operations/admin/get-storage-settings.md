---
title: Get Storage Settings
description: "Returns the media storage driver configuration, with secrets masked; without the Pro plugin it always reports the local driver."
outline: false
aside: false
---

Returns the media storage driver configuration, with secrets masked; without the Pro plugin it always reports the local driver.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/storage-settings`
- **Edition:** Core
- **Controller:** `AdminController@getStorageSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:110`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Remote storage drivers require FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getStorageSettings" specUrl="/openapi/public/admin/get-storage-settings.json" />
