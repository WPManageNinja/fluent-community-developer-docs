---
title: Update Comment
description: "Replaces the body of an existing comment, re-renders it, and reconciles its attached media with the submitted list."
outline: false
aside: false
---

Replaces the body of an existing comment, re-renders it, and reconciles its attached media with the submitted list.

The comment must belong to the post named in the path. Media rows attached to the comment but absent from the new payload are handed to the `fluent_community/comment/media_deleted` action for cleanup. Notification hooks fire only when something actually changed.

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/{feed_id}/comments/{comment_id}`
- **Edition:** Core
- **Controller:** `CommentsController@update`
- **Route source:** `fluent-community/app/Http/Routes/api.php:54`
- **Controller source:** `fluent-community/app/Http/Controllers/CommentsController.php`

- The comment author can always edit; anyone else needs the `edit_any_comment` permission in the space.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateComment" specUrl="/openapi/public/comments/update-comment.json" />
