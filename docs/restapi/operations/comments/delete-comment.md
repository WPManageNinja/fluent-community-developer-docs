---
title: Delete Comment
description: "Deletes a comment, recounts the comments on its post and hands any attached media to the media cleanup hook."
outline: false
aside: false
---

Deletes a comment, recounts the comments on its post and hands any attached media to the media cleanup hook.

The comment must belong to the post named in the path. The post `comments_count` is recalculated from the table rather than decremented, and the post `updated_at` is deliberately left untouched.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/feeds/{feed_id}/comments/{comment_id}`
- **Edition:** Core
- **Controller:** `CommentsController@deleteComment`
- **Route source:** `fluent-community/app/Http/Routes/api.php:57`
- **Controller source:** `fluent-community/app/Http/Controllers/CommentsController.php`

- The comment author can always delete; anyone else needs the `delete_any_comment` permission in the space.
- Destructive: the comment row is removed outright, and replies to it are orphaned rather than deleted.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteComment" specUrl="/openapi/public/comments/delete-comment.json" />
