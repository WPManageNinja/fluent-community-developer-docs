---
title: Search Cart Products
description: "Searches published FluentCart products that have at least one variant, returning up to 20 with their formatted price range, for the paywall picker."
outline: false
aside: false
---

Searches published FluentCart products that have at least one variant, returning up to 20 with their formatted price range, for the paywall picker.

## Endpoint

- **Method:** `GET`
- **Path:** `/cart/products/search`
- **Edition:** Core
- **Controller:** `PaywallController@searchProduct`
- **Route source:** `fluent-community/Modules/Integrations/FluentCart/Http/cart_api.php:13`
- **Controller source:** `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php`

- Only portal access is required because this is a GET route, so any member — and anonymous visitors on a public portal — can enumerate product titles and prices; an empty `search` returns the first 20 products.
- The whole cart route group only exists while FluentCart is active.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="searchCartProducts" specUrl="/openapi/public/cart/search-cart-products.json" />
