---
title: Get Feed Ticker
description: "Returns posts created or updated since a given moment, each with its full payload, plus the unread notification count — the polling endpoint that keeps an open feed fresh."
outline: false
aside: false
---

Returns posts created or updated since a given moment, each with its full payload, plus the unread notification count — the polling endpoint that keeps an open feed fresh.

Pass `since` as a datetime; it defaults to one minute ago, and any value older than five minutes is clamped back to one minute to bound the query. At most 20 posts come back per poll, each flagged `created` or `updated` and tagged with a context of `global` or `space-<slug>`. Calling it also fires the activity tracker that stamps the user last-seen time.

## Endpoint

- **Method:** `GET`
- **Path:** `/feeds/ticker`
- **Edition:** Core
- **Controller:** `FeedsController@getTicker`
- **Route source:** `fluent-community/app/Http/Routes/api.php:64`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

- Signed-out callers get an empty payload with an error string rather than an HTTP error.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getFeedTicker" specUrl="/openapi/public/feeds/get-feed-ticker.json" />
