---
title: Create Feed
description: "Creates a post, renders its Markdown, attaches media and topics, and returns the transformed post ready to prepend to the feed."
outline: false
aside: false
---

Creates a post, renders its Markdown, attaches media and topics, and returns the transformed post ready to prepend to the feed.

`message` is required. Pass `space` with a space slug to post into a space, or the sentinel `__self__post__` to post to your own profile, which only works when global posts are enabled. Spaces with `topic_required` reject posts carrying no valid `topic_ids`, and topics beyond the configured maximum are trimmed. Reposting the same text into the same space within seven days is rejected as a duplicate. Mentions are parsed and recorded, and moderators may set `send_announcement_email=yes` to email the space.

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds`
- **Edition:** Core
- **Controller:** `FeedsController@store`
- **Route source:** `fluent-community/app/Http/Routes/api.php:43`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

- Requires the `can_create_post` permission in the target space.
- Where content moderation or scheduling changes the status, the response carries that status instead of a published message, and the notification hooks do not fire.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="createFeed" specUrl="/openapi/public/feeds/create-feed.json" />
