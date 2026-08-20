---
title: Save Admin Manager
description: "Grants or replaces the FluentCommunity role set for one WordPress user, creating their community profile if they do not have one yet."
outline: false
aside: false
---

Grants or replaces the FluentCommunity role set for one WordPress user, creating their community profile if they do not have one yet.

`user_id` and a non-empty `roles` array are required. Granting `admin` discards every other role in the payload, and `course_admin` supersedes `course_creatror`. Existing managers are updated in place; the role set is stored whole, so omitting a role removes it.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/managers`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@addOrUpdateManager`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:11`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveAdminManager" specUrl="/openapi/public/admin/save-admin-manager.json" />
