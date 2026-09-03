---
title: Unblock Profile User
description: "Lifts a block, deleting the relationship row entirely rather than reverting it to a follow."
outline: false
aside: false
---

Lifts a block, deleting the relationship row entirely rather than reverting it to a follow.

## Endpoint

- **Method:** `POST`
- **Path:** `/profile/{username}/unblock`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FollowController@unblock`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:138`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/FollowController.php`

- Requires FluentCommunity Pro with the `followers_module` feature enabled.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="unblockProfileUser" specUrl="/openapi/public/profile/unblock-profile-user.json" />
