---
title: Toggle Profile Notification
description: "Turns notifications about a member you already follow on or off, without changing the follow itself."
outline: false
aside: false
---

Turns notifications about a member you already follow on or off, without changing the follow itself.

The follow relationship stores this as a level, so the toggle flips between plain following and following with notifications. Calling it when you do not follow the member, or when you have blocked them, is an error.

## Endpoint

- **Method:** `POST`
- **Path:** `/profile/{username}/notification`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FollowController@toggleNotification`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:139`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/FollowController.php`

- Requires FluentCommunity Pro with the `followers_module` feature enabled.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="toggleProfileNotification" specUrl="/openapi/public/profile/toggle-profile-notification.json" />
