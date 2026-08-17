---
title: Get Ticker Updates
description: "Returns a lightweight list of post ids that have changed since a given moment, marked created, updated or deleted, without any post content."
outline: false
aside: false
---

Returns a lightweight list of post ids that have changed since a given moment, marked created, updated or deleted, without any post content.

Scope with `context` set to `global`, `space-<slug>` or `user-<id>`. Up to 100 changes and 50 deletions are reported per call. Use this when you only need to know what to refetch; use the ticker endpoint when you want the posts themselves.

## Endpoint

- **Method:** `GET`
- **Path:** `/feeds/ticker-updates`
- **Edition:** Core
- **Controller:** `FeedsController@getTickerUpdates`
- **Route source:** `fluent-community/app/Http/Routes/api.php:65`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

- Signed-out callers get an empty payload with an error string rather than an HTTP error.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getTickerUpdates" specUrl="/openapi/public/feeds/get-ticker-updates.json" />
