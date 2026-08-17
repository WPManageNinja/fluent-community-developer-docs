---
title: List Feed Comments
description: "Returns every comment on a post in chronological order, with each author profile attached and the current user liked state flagged."
outline: false
aside: false
---

Returns every comment on a post in chronological order, with each author profile attached and the current user liked state flagged.

Comments are not paginated — the whole thread is returned in one response. Pending comments are only visible to moderators when content moderation is enabled. A post the caller cannot reach, or an unpublished post they cannot edit, returns a 404 rather than an empty list.

## Endpoint

- **Method:** `GET`
- **Path:** `/feeds/{feed_id}/comments`
- **Edition:** Core
- **Controller:** `CommentsController@getComments`
- **Route source:** `fluent-community/app/Http/Routes/api.php:52`
- **Controller source:** `fluent-community/app/Http/Controllers/CommentsController.php`

- Comments from deactivated or blocked profiles are excluded.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listFeedComments" specUrl="/openapi/public/comments/list-feed-comments.json" />
