---
title: Get Comment
description: "Returns a single comment with its author profile, optionally in the shape the editor expects."
outline: false
aside: false
---

Returns a single comment with its author profile, optionally in the shape the editor expects.

Pass `context=edit` to receive `media_images` resolved from the stored media metadata instead of the raw `meta` blob. Access is checked against the parent post, so a comment on a post the caller cannot reach returns a 404.

## Endpoint

- **Method:** `GET`
- **Path:** `/comments/{id}`
- **Edition:** Core
- **Controller:** `CommentsController@show`
- **Route source:** `fluent-community/app/Http/Routes/api.php:148`
- **Controller source:** `fluent-community/app/Http/Controllers/CommentsController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getComment" specUrl="/openapi/public/comments/get-comment.json" />
