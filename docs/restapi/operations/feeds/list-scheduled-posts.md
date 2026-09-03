---
title: List Scheduled Posts
description: "Returns the paginated list of posts one member has scheduled but not yet published, soonest first."
outline: false
aside: false
---

Returns the paginated list of posts one member has scheduled but not yet published, soonest first.

`user_id` is effectively required: the check compares it against the current user id strictly, so omitting it fails for everyone except community admins, and for them it then matches no rows. Community admins may pass any `user_id` to inspect another member queue.

## Endpoint

- **Method:** `GET`
- **Path:** `/scheduled-posts`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `SchedulePostsController@getScheduledPosts`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:112`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php`

- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listScheduledPosts" specUrl="/openapi/public/feeds/list-scheduled-posts.json" />
