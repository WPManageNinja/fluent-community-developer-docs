---
title: Search Admin Users
description: "Searches WordPress users for the admin pickers, returning a paginated list matched on name, login and email."
outline: false
aside: false
---

Searches WordPress users for the admin pickers, returning a paginated list matched on name, login and email.

Pass `context=add_manager` to exclude users who already hold a community role. On multisite the result is limited to users with capabilities on the current site.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/users`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@getUsers`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:13`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="searchAdminUsers" specUrl="/openapi/public/admin/search-admin-users.json" />
