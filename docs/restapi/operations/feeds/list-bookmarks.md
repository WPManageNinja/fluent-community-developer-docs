---
title: List Bookmarks
description: "Returns a page of the published posts the current user has bookmarked, newest first and transformed for display."
outline: false
aside: false
---

Returns a page of the published posts the current user has bookmarked, newest first and transformed for display.

Supports `topic_slug`, `search`, `order_by_type` and a `type` filter on the post type. Pagination behaves like the main feed: `total` is an estimate and `has_more` means the page came back full.

## Endpoint

- **Method:** `GET`
- **Path:** `/feeds/bookmarks`
- **Edition:** Core
- **Controller:** `FeedsController@getBookmarks`
- **Route source:** `fluent-community/app/Http/Routes/api.php:48`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

- Requires a signed-in user; bookmarks are per-user and never shared.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listBookmarks" specUrl="/openapi/public/feeds/list-bookmarks.json" />
