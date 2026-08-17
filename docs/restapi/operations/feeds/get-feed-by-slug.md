---
title: Get Feed By Slug
description: "Returns a single post by slug, fully transformed, along with its reactions summary and author profile."
outline: false
aside: false
---

Returns a single post by slug, fully transformed, along with its reactions summary and author profile.

Pass `context=edit` to receive the raw editable form instead of the rendered one; that variant requires edit access and fails otherwise. Only `published` and `unlisted` posts are readable by link — anything else returns a 404 unless the caller can edit it.

## Endpoint

- **Method:** `GET`
- **Path:** `/feeds/{feed_slug}/by-slug`
- **Edition:** Core
- **Controller:** `FeedsController@getFeedBySlug`
- **Route source:** `fluent-community/app/Http/Routes/api.php:49`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

- A post in a space the caller cannot reach returns 404 rather than 403, so post existence cannot be probed.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getFeedBySlug" specUrl="/openapi/public/feeds/get-feed-by-slug.json" />
