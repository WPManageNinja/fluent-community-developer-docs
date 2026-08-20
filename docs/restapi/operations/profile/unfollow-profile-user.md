---
title: Unfollow Profile User
description: "Removes the follow relationship from the current user to the named member."
outline: false
aside: false
---

Removes the follow relationship from the current user to the named member.

## Endpoint

- **Method:** `POST`
- **Path:** `/profile/{username}/unfollow`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FollowController@unfollow`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:132`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/FollowController.php`

- Requires FluentCommunity Pro with the `followers_module` feature enabled.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="unfollowProfileUser" specUrl="/openapi/public/profile/unfollow-profile-user.json" />
