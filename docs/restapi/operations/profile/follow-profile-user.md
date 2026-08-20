---
title: Follow Profile User
description: "Creates a follow relationship from the current user to the named member."
outline: false
aside: false
---

Creates a follow relationship from the current user to the named member.

Following yourself is rejected, as is following someone you already follow or have blocked — the block is stored in the same table, so an existing block surfaces as an already-following error.

## Endpoint

- **Method:** `POST`
- **Path:** `/profile/{username}/follow`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FollowController@follow`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:131`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/FollowController.php`

- Requires FluentCommunity Pro with the `followers_module` feature enabled.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="followProfileUser" specUrl="/openapi/public/profile/follow-profile-user.json" />
