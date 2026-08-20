---
title: Get Feed Links
description: "Returns the configurable link list shown alongside the main feed."
outline: false
aside: false
---

Returns the configurable link list shown alongside the main feed.

Pass `scope=view` to receive only the links that are currently enabled; without it the full stored list comes back, including disabled entries, which is what the editor needs.

## Endpoint

- **Method:** `GET`
- **Path:** `/feeds/links`
- **Edition:** Core
- **Controller:** `FeedsController@getLinks`
- **Route source:** `fluent-community/app/Http/Routes/api.php:70`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getFeedLinks" specUrl="/openapi/public/feeds/get-feed-links.json" />
