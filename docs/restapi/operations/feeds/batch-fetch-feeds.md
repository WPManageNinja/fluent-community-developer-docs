---
title: Batch Fetch Feeds
description: "Returns the full transformed payload for a list of post ids in one request, for refreshing items a ticker call flagged as changed."
outline: false
aside: false
---

Returns the full transformed payload for a list of post ids in one request, for refreshing items a ticker call flagged as changed.

Send `feed_ids`; only the first 20 are honoured and the rest are dropped silently. Only published posts the caller may read come back, so the returned count can be lower than the number requested.

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/batch`
- **Edition:** Core
- **Controller:** `FeedsController@batchFetch`
- **Route source:** `fluent-community/app/Http/Routes/api.php:66`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="batchFetchFeeds" specUrl="/openapi/public/feeds/batch-fetch-feeds.json" />
