---
title: Toggle Comment Reaction
description: "Toggle Comment Reaction for the FluentCommunity Reactions API."
outline: false
aside: false
---

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/{feed_id}/comments/{comment_id}/reactions`
- **Edition:** Core
- **Controller:** `CommentsController@toggleReaction`
- **Route source:** `fluent-community/app/Http/Routes/api.php:59`
- **Controller source:** `fluent-community/app/Http/Controllers/CommentsController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="toggleCommentReaction" specUrl="/openapi/public/reactions/toggle-comment-reaction.json" />
