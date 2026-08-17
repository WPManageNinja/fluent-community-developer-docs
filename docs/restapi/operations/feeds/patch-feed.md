---
title: Patch Feed
description: "Applies a small state change to a post — pinning it, changing its priority, or turning comments off."
outline: false
aside: false
---

Applies a small state change to a post — pinning it, changing its priority, or turning comments off.

Moderators may set `is_sticky`, `priority` and `comments_disabled`; a plain author is restricted to `comments_disabled` only. Making a post sticky first clears the sticky flag from every other post in the same space, so a space holds at most one pinned post.

## Endpoint

- **Method:** `PATCH`
- **Path:** `/feeds/{feed_id}`
- **Edition:** Core
- **Controller:** `FeedsController@patchFeed`
- **Route source:** `fluent-community/app/Http/Routes/api.php:45`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

- Requires the post author, a community moderator, or a community admin, either globally or in the space.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="patchFeed" specUrl="/openapi/public/feeds/patch-feed.json" />
