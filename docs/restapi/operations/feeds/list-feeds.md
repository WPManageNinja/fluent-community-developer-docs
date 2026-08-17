---
title: List Feeds
description: "Returns a page of posts the current user is allowed to read, transformed for display, with the pinned post of a space returned separately on the first page."
outline: false
aside: false
---

Returns a page of posts the current user is allowed to read, transformed for display, with the pinned post of a space returned separately on the first page.

Pass `space` to scope to one space, `user_id` to scope to one author, `topic_slug` to filter by topic, and `search` with an optional `search_in` list of columns. `order_by_type` selects the sort. `per_page` defaults to 10 and is capped by the `fluent_community/max_per_page` filter (100 by default). Pagination is cursor-like rather than counted: `total` is an estimate derived from the page size, and `has_more` means only that the page came back full.

## Endpoint

- **Method:** `GET`
- **Path:** `/feeds`
- **Edition:** Core
- **Controller:** `FeedsController@get`
- **Route source:** `fluent-community/app/Http/Routes/api.php:42`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

- Sticky posts are hoisted into the separate `sticky` key on page 1 of a space, and suppressed entirely when searching, filtering by topic, or when `disable_sticky=yes`.
- Posts from spaces the caller is not a member of, and posts by deactivated or blocked profiles, are excluded.
- Filtering by `status` is only honoured for moderators or for a caller reading their own posts.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listFeeds" specUrl="/openapi/public/feeds/list-feeds.json" />
