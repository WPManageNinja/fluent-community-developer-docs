---
title: Get Color Config
description: "Returns the active light and dark colour schema selection alongside the full catalogue of available schemas."
outline: false
aside: false
---

Returns the active light and dark colour schema selection alongside the full catalogue of available schemas.

## Endpoint

- **Method:** `GET`
- **Path:** `/settings/color-config`
- **Edition:** Core
- **Controller:** `SettingController@getColorConfig`
- **Route source:** `fluent-community/app/Http/Routes/api.php:163`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Reading is available in core, but saving a colour configuration is a Pro endpoint.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getColorConfig" specUrl="/openapi/public/settings/get-color-config.json" />
