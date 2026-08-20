---
title: Toggle Comment Reaction
description: "Sets or clears the current user like on a comment and returns the new reaction count with the resulting liked state."
outline: false
aside: false
---

Sets or clears the current user like on a comment and returns the new reaction count with the resulting liked state.

Unlike the post reaction endpoints this takes an explicit `state` boolean rather than a `remove` flag: truthy likes, falsy unlikes, and repeating the same state is a no-op. The comment must belong to the post named in the path.

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/{feed_id}/comments/{comment_id}/reactions`
- **Edition:** Core
- **Controller:** `CommentsController@toggleReaction`
- **Route source:** `fluent-community/app/Http/Routes/api.php:59`
- **Controller source:** `fluent-community/app/Http/Controllers/CommentsController.php`

- Requires a signed-in user with at least registered access to the space holding the post.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="toggleCommentReaction" specUrl="/openapi/public/reactions/toggle-comment-reaction.json" />
