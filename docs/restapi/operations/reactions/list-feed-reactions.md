---
title: List Feed Reactions
description: "Returns the members who liked a post, with their public profiles, for the reaction list popover."
outline: false
aside: false
---

Returns the members who liked a post, with their public profiles, for the reaction list popover.

Capped at 100 distinct users with no pagination, so a very popular post shows a truncated list. Only `like` reactions are returned; bookmarks are stored in the same table but excluded.

## Endpoint

- **Method:** `GET`
- **Path:** `/feeds/{feed_id}/reactions`
- **Edition:** Core
- **Controller:** `ReactionController@getByFeedId`
- **Route source:** `fluent-community/app/Http/Routes/api.php:75`
- **Controller source:** `fluent-community/app/Http/Controllers/ReactionController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listFeedReactions" specUrl="/openapi/public/reactions/list-feed-reactions.json" />
