---
title: Get Followers Settings
description: "Returns the followers module configuration, including who may see a member follower and following lists."
outline: false
aside: false
---

Returns the followers module configuration, including who may see a member follower and following lists.

## Endpoint

- **Method:** `GET`
- **Path:** `/settings/followers/config`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@getFollowersSettings`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:39`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getFollowersSettings" specUrl="/openapi/public/settings/get-followers-settings.json" />
