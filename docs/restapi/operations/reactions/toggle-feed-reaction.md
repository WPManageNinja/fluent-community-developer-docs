---
title: Toggle Feed Reaction
description: "Toggle Feed Reaction for the FluentCommunity Reactions API."
outline: false
aside: false
---

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/{feed_id}/react`
- **Edition:** Core
- **Controller:** `CommentsController@addOrRemovePostReact`
- **Route source:** `fluent-community/app/Http/Routes/api.php:56`
- **Controller source:** `fluent-community/app/Http/Controllers/CommentsController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="toggleFeedReaction" specUrl="/openapi/public/reactions/toggle-feed-reaction.json" />
