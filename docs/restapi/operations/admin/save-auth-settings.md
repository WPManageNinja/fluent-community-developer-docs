---
title: Save Auth Settings
description: "Normalises and stores the login and signup configuration, then returns it with the recalculated form field definitions."
outline: false
aside: false
---

Normalises and stores the login and signup configuration, then returns it with the recalculated form field definitions.

The payload is passed through the auth settings formatter, so unrecognised keys are dropped and each field is coerced to its expected shape. The saved settings are also written to a week-long cache used by the front-end auth screens.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/auth-settings`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@saveAuthSettings`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:15`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveAuthSettings" specUrl="/openapi/public/admin/save-auth-settings.json" />
