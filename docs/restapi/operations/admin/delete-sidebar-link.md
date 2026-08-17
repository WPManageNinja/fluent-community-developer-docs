---
title: Delete Sidebar Link
description: "Removes a custom sidebar link from the portal navigation."
outline: false
aside: false
---

Removes a custom sidebar link from the portal navigation.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/admin/links/{id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@deleteSidebarLink`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:55`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteSidebarLink" specUrl="/openapi/public/admin/delete-sidebar-link.json" />
