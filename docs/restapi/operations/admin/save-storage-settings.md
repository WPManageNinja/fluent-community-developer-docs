---
title: Save Storage Settings
description: "Validates and stores the media storage driver configuration, testing the connection before saving anything for remote drivers."
outline: false
aside: false
---

Validates and stores the media storage driver configuration, testing the connection before saving anything for remote drivers.

Required fields differ per driver (`amazon_s3`, `bunny_cdn`, `cloudflare_r2` and `local`). Sending the literal `FCOM_ENCRYPTED_DATA_KEY` for `access_key` or `secret_key` keeps the currently stored credential instead of overwriting it. A failed connection test aborts the save. Selecting `local` also switches the `cloud_storage` feature flag off; any remote driver switches it on.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/storage-settings`
- **Edition:** Core
- **Controller:** `AdminController@updateStorageSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:111`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro; rejected outright when the `FLUENT_COMMUNITY_CLOUD_STORAGE` constant defines the config in code.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveStorageSettings" specUrl="/openapi/public/admin/save-storage-settings.json" />
