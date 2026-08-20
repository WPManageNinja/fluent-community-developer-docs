---
title: Create Comment
description: "Posts a comment or a threaded reply on a feed item, renders its Markdown, links any attached media and bumps the post comment count."
outline: false
aside: false
---

Posts a comment or a threaded reply on a feed item, renders its Markdown, links any attached media and bumps the post comment count.

Either `comment` text or a media attachment is required; text is capped at 10 000 characters by default. Pass `parent_id` to reply, which must reference a comment on the same post. An identical comment by the same user on the same post is rejected as a duplicate. Mentions are parsed and recorded so the mentioned members are notified. Where content moderation holds the comment, the response carries the resulting status instead of a success message.

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/{feed_id}/comments`
- **Edition:** Core
- **Controller:** `CommentsController@store`
- **Route source:** `fluent-community/app/Http/Routes/api.php:53`
- **Controller source:** `fluent-community/app/Http/Controllers/CommentsController.php`

- Requires the `can_comment` permission in the space, and fails when the post author has disabled comments or the course has comments switched off.
- Fires `fluent_community/comment_added`, which is what sends reply and mention notifications.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="createComment" specUrl="/openapi/public/comments/create-comment.json" />
