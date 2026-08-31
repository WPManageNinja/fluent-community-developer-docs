---
title: Get Feature Settings
description: "Returns the feature flag configuration together with the add-on catalogue and whether each companion plugin is installed."
outline: false
aside: false
---

Returns the feature flag configuration together with the add-on catalogue and whether each companion plugin is installed.

A stored Giphy API key is replaced with the literal `FCOM_ENCRYPTED_DATA_KEY` rather than being returned, so the key never leaves the server.

## Endpoint

- **Method:** `GET`
- **Path:** `/settings/features`
- **Edition:** Core
- **Controller:** `SettingController@getFeatures`
- **Route source:** `fluent-community/app/Http/Routes/api.php:158`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getFeatureSettings" specUrl="/openapi/public/settings/get-feature-settings.json" />
