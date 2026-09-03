---
title: Get Auth Settings
description: "Returns the login and signup configuration together with the resolved form field definitions the auth screens render."
outline: false
aside: false
---

Returns the login and signup configuration together with the resolved form field definitions the auth screens render.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/auth-settings`
- **Edition:** Core
- **Controller:** `AdminController@getAuthSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:116`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Reading is available in core, but saving these settings is a Pro endpoint.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getAuthSettings" specUrl="/openapi/public/admin/get-auth-settings.json" />
