---
title: Update Space Lockscreen Settings
description: "Stores the lock screen configuration a space shows to non-members."
outline: false
aside: false
---

Stores the lock screen configuration a space shows to non-members.

The route group only requires portal access, so the controller performs its own check and returns 403 unless the caller manages spaces or holds the admin role in this one.

## Endpoint

- **Method:** `PUT`
- **Path:** `/spaces/{spaceSlug}/lockscreens`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@updateSpaceLockscreenSettings`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:59`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires community-admin or course-admin access, or the admin role in this space.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateSpaceLockscreenSettings" specUrl="/openapi/public/spaces/update-space-lockscreen-settings.json" />
