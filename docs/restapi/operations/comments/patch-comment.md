---
title: Patch Comment
description: "Pins or unpins a top-level comment so it sorts above the rest of the thread."
outline: false
aside: false
---

Pins or unpins a top-level comment so it sorts above the rest of the thread.

`is_sticky` is the only field accepted. Pinning first clears the sticky flag from every other comment on the same post, so a post can only ever have one pinned comment. Replies cannot be pinned.

## Endpoint

- **Method:** `PATCH`
- **Path:** `/feeds/{feed_id}/comments/{comment_id}`
- **Edition:** Core
- **Controller:** `CommentsController@patchComment`
- **Route source:** `fluent-community/app/Http/Routes/api.php:55`
- **Controller source:** `fluent-community/app/Http/Controllers/CommentsController.php`

- Requires a community moderator or community admin, either globally or within the post space.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="patchComment" specUrl="/openapi/public/comments/patch-comment.json" />
