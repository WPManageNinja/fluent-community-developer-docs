---
title: Get Welcome Banner
description: "Returns the welcome banner for the current audience — the signed-in variant for members, the logged-out variant for visitors."
outline: false
aside: false
---

Returns the welcome banner for the current audience — the signed-in variant for members, the logged-out variant for visitors.

## Endpoint

- **Method:** `GET`
- **Path:** `/feeds/welcome-banner`
- **Edition:** Core
- **Controller:** `FeedsController@getWelcomeBanner`
- **Route source:** `fluent-community/app/Http/Routes/api.php:73`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getWelcomeBanner" specUrl="/openapi/public/feeds/get-welcome-banner.json" />
