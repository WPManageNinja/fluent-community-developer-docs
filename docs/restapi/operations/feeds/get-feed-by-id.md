---
title: Get Feed By ID
description: "Returns a single post by numeric id; the id is resolved to a slug and then handled exactly as the by-slug endpoint."
outline: false
aside: false
---

Returns a single post by numeric id; the id is resolved to a slug and then handled exactly as the by-slug endpoint.

Because it delegates, `context=edit` and the same access rules apply. Note that the id lookup happens before the access check, so an id that does not exist at all fails differently from one the caller may not read.

## Endpoint

- **Method:** `GET`
- **Path:** `/feeds/{feed_id}/by-id`
- **Edition:** Core
- **Controller:** `FeedsController@getFeedById`
- **Route source:** `fluent-community/app/Http/Routes/api.php:50`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getFeedById" specUrl="/openapi/public/feeds/get-feed-by-id.json" />
