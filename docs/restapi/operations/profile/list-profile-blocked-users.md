---
title: List Profile Blocked Users
description: "Returns the paginated list of members this profile has blocked."
outline: false
aside: false
---

Returns the paginated list of members this profile has blocked.

## Endpoint

- **Method:** `GET`
- **Path:** `/profile/{username}/blocked-users`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FollowController@getBlockedUsers`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:130`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/FollowController.php`

- Requires FluentCommunity Pro with the `followers_module` feature enabled.
- Only the profile owner and community moderators may read this list; anyone else gets a 403.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listProfileBlockedUsers" specUrl="/openapi/public/profile/list-profile-blocked-users.json" />
