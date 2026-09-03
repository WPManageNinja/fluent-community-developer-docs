---
title: List Comment Reactions
description: "Returns the members who liked a comment, with their public profiles."
outline: false
aside: false
---

Returns the members who liked a comment, with their public profiles.

Capped at 100 distinct users with no pagination. Access is validated against the parent post, so a comment on an unreachable post returns a 404.

## Endpoint

- **Method:** `GET`
- **Path:** `/comments/{comment_id}/reactions`
- **Edition:** Core
- **Controller:** `ReactionController@getByCommentId`
- **Route source:** `fluent-community/app/Http/Routes/api.php:150`
- **Controller source:** `fluent-community/app/Http/Controllers/ReactionController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listCommentReactions" specUrl="/openapi/public/reactions/list-comment-reactions.json" />
