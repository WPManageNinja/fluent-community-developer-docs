---
title: Post Add Or Remove Post React
description: "Adds or removes the current user reaction on a post and returns the updated reaction count."
outline: false
aside: false
---

Adds or removes the current user reaction on a post and returns the updated reaction count.

`react_type` accepts `like` or `bookmark` and defaults to `like`; anything else falls back to `like`. Send `remove` truthy to withdraw the reaction. Only likes affect `reactions_count` — a bookmark is private and does not change the visible count. Reacting twice is a no-op that still returns the current count. The post `updated_at` is deliberately not touched so reactions do not resurface the post in ticker polls.

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/{feed_id}/reactions/toggle`
- **Edition:** Core
- **Controller:** `ReactionController@addOrRemovePostReact`
- **Route source:** `fluent-community/app/Http/Routes/api.php:76`
- **Controller source:** `fluent-community/app/Http/Controllers/ReactionController.php`

- Requires a signed-in user, and the post must be published.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postAddOrRemovePostReact" specUrl="/openapi/public/reactions/post-add-or-remove-post-react.json" />
