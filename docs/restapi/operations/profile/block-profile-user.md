---
title: Block Profile User
description: "Blocks a member, converting any existing follow relationship into a block rather than creating a second row."
outline: false
aside: false
---

Blocks a member, converting any existing follow relationship into a block rather than creating a second row.

Blocking yourself is rejected, as is blocking anyone who holds community-moderator access. Community moderators are themselves forbidden from blocking anybody.

## Endpoint

- **Method:** `POST`
- **Path:** `/profile/{username}/block`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FollowController@block`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:134`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/FollowController.php`

- Requires FluentCommunity Pro with the `followers_module` feature enabled.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="blockProfileUser" specUrl="/openapi/public/profile/block-profile-user.json" />
