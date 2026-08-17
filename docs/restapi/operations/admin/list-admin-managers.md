---
title: List Admin Managers
description: "Returns the paginated list of members who hold a FluentCommunity management role, with their role set and profile attached."
outline: false
aside: false
---

Returns the paginated list of members who hold a FluentCommunity management role, with their role set and profile attached.

The optional `search` term matches display name, email address or login. Members whose profile is not active are excluded.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/managers`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@getManagers`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:10`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listAdminManagers" specUrl="/openapi/public/admin/list-admin-managers.json" />
