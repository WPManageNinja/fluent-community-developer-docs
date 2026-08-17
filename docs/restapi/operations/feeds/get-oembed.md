---
title: Get OEmbed
description: "Fetches and returns link preview metadata for a URL so the composer can show a card before the post is saved."
outline: false
aside: false
---

Fetches and returns link preview metadata for a URL so the composer can show a card before the post is saved.

Makes an outbound HTTP request to the target URL, so it is slower than other endpoints and fails with an error payload when the URL yields no usable metadata.

## Endpoint

- **Method:** `GET`
- **Path:** `/feeds/oembed`
- **Edition:** Core
- **Controller:** `FeedsController@getOembed`
- **Route source:** `fluent-community/app/Http/Routes/api.php:68`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getOembed" specUrl="/openapi/public/feeds/get-oembed.json" />
