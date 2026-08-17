---
title: Search Giphy
description: "Proxies a Giphy search — or the trending feed when no query is given — and returns a trimmed list of GIFs carrying only the preview and medium renditions."
outline: false
aside: false
---

Proxies a Giphy search — or the trending feed when no query is given — and returns a trimmed list of GIFs carrying only the preview and medium renditions.

Pass `q` to search and `offset` to page through results; the page size is fixed at 20. The request is made server-side against a hardcoded Giphy endpoint using the stored API key, which is never included in the response. A missing key returns a 400 with a message rather than an empty list.

## Endpoint

- **Method:** `GET`
- **Path:** `/giphy`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `GiphyController@index`
- **Route source:** `fluent-community-pro/app/Modules/Giphy/Http/giphy_api.php:8`

- Requires FluentCommunity Pro with the `giphy_module` feature enabled and an API key configured; with the flag off the route does not exist.
- Requires an active portal user, and on a portal whose access level is public that includes anonymous visitors.
- Responses are neither cached nor rate limited, so calls here consume the site owner Giphy quota directly.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="searchGiphy" specUrl="/openapi/public/giphy/search-giphy.json" />
