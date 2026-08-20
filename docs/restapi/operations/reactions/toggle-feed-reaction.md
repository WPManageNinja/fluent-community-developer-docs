---
title: Toggle Feed Reaction
description: "Adds or removes the current user reaction on a post and returns the updated count — a second route onto the same behaviour as the reactions toggle endpoint."
outline: false
aside: false
---

Adds or removes the current user reaction on a post and returns the updated count — a second route onto the same behaviour as the reactions toggle endpoint.

This path is served by the comments controller rather than the reaction controller, but the logic is duplicated line for line: same `react_type` handling, same `remove` flag, same response. New integrations should prefer `POST /feeds/{feed_id}/reactions/toggle`.

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/{feed_id}/react`
- **Edition:** Core
- **Controller:** `CommentsController@addOrRemovePostReact`
- **Route source:** `fluent-community/app/Http/Routes/api.php:56`
- **Controller source:** `fluent-community/app/Http/Controllers/CommentsController.php`

- Requires a signed-in user, and the post must be published.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="toggleFeedReaction" specUrl="/openapi/public/reactions/toggle-feed-reaction.json" />
