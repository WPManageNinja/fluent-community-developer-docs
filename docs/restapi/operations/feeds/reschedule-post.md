---
title: Reschedule Post
description: "Moves a scheduled post to a new publish time and re-queues the background action that will publish it."
outline: false
aside: false
---

Moves a scheduled post to a new publish time and re-queues the background action that will publish it.

`scheduled_at` is required, is read in the site timezone and must be at least 30 minutes in the future. The previously queued publish action is cancelled before the new one is scheduled.

## Endpoint

- **Method:** `PUT`
- **Path:** `/scheduled-posts/{feed_id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `SchedulePostsController@reschedulePost`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:110`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php`

- Requires the post author or a community moderator, either globally or in the post space.
- Requires FluentCommunity Pro and a working Action Scheduler queue.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="reschedulePost" specUrl="/openapi/public/feeds/reschedule-post.json" />
