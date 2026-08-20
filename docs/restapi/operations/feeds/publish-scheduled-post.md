---
title: Publish Scheduled Post
description: "Publishes a scheduled post immediately, cancelling its queued publish action and restamping its creation time to now."
outline: false
aside: false
---

Publishes a scheduled post immediately, cancelling its queued publish action and restamping its creation time to now.

Only posts still in `scheduled` state are accepted. Publishing fires the normal post-created hooks, so notifications and announcement emails go out at this point rather than at the original scheduled time.

## Endpoint

- **Method:** `POST`
- **Path:** `/scheduled-posts/publish/{feed_id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `SchedulePostsController@publishPost`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:111`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php`

- Requires the post author or a community moderator, either globally or in the post space.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="publishScheduledPost" specUrl="/openapi/public/feeds/publish-scheduled-post.json" />
