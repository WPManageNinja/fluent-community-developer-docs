---
title: Save Followers Settings
description: "Stores the followers module configuration and returns the normalised result."
outline: false
aside: false
---

Stores the followers module configuration and returns the normalised result.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/followers/config`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@saveFollowersSettings`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:40`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro; these values govern the follower and following list endpoints.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveFollowersSettings" specUrl="/openapi/public/settings/save-followers-settings.json" />
