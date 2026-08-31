---
title: Save Sidebar Link
description: "Creates or updates a custom sidebar link inside a space group, including its icon, target and visibility rule."
outline: false
aside: false
---

Creates or updates a custom sidebar link inside a space group, including its icon, target and visibility rule.

A title, a `parent_id` space group, a `privacy` value of `public`, `logged_in`, `members_only` or `logged_out_only`, and a valid `settings.permalink` URL are all required. `members_only` links additionally need `settings.membership_ids`, which are checked against real spaces. Supplying `shape_svg` clears any emoji icon. New links are appended at the end of the group serial order.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/links`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@saveSidebarLink`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:57`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveSidebarLink" specUrl="/openapi/public/admin/save-sidebar-link.json" />
