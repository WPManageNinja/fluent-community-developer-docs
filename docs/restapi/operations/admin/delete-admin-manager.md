---
title: Delete Admin Manager
description: "Revokes every FluentCommunity management role from a user, leaving their WordPress account and community profile intact."
outline: false
aside: false
---

Revokes every FluentCommunity management role from a user, leaving their WordPress account and community profile intact.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/admin/managers/{user_id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@deleteManager`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:12`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteAdminManager" specUrl="/openapi/public/admin/delete-admin-manager.json" />
