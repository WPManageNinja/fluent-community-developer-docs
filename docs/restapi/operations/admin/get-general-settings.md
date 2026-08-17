---
title: Get General Settings
description: "Returns the portal-wide settings record together with the list of WordPress roles that can be granted portal access and whether open registration is enabled on the site."
outline: false
aside: false
---

Returns the portal-wide settings record together with the list of WordPress roles that can be granted portal access and whether open registration is enabled on the site.

The `administrator` role is stripped from `user_roles` because administrators always have access. `users_can_register` reflects the WordPress option, not a FluentCommunity setting.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/general`
- **Edition:** Core
- **Controller:** `AdminController@getGeneralSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:100`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getGeneralSettings" specUrl="/openapi/public/admin/get-general-settings.json" />
