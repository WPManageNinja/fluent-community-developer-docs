---
title: Toggle Profile Follow
description: "Follows the named member if not already followed, and unfollows them if they are — addressed by numeric user id rather than username."
outline: false
aside: false
---

Follows the named member if not already followed, and unfollows them if they are — addressed by numeric user id rather than username.

A blocked relationship cannot be toggled; unblock first. The response message tells you which way the toggle went.

## Endpoint

- **Method:** `POST`
- **Path:** `/profile/{userId}/toggle-follow`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FollowController@toggleFollow`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:133`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/FollowController.php`

- Requires FluentCommunity Pro with the `followers_module` feature enabled.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="toggleProfileFollow" specUrl="/openapi/public/profile/toggle-profile-follow.json" />
