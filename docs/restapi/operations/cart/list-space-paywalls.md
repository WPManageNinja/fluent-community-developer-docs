---
title: List Space Paywalls
description: "Returns the published FluentCart products attached to a space as paywalls, each variant carrying its price, thumbnail and a ready-made instant-checkout URL."
outline: false
aside: false
---

Returns the published FluentCart products attached to a space as paywalls, each variant carrying its price, thumbnail and a ready-made instant-checkout URL.

Pass `paywall_ids` to narrow the result to specific variants. The checkout URL already carries the redirect back into the portal with the space id attached.

## Endpoint

- **Method:** `GET`
- **Path:** `/cart/spaces/{spaceId}/paywalls`
- **Edition:** Core
- **Controller:** `PaywallController@getPaywalls`
- **Route source:** `fluent-community/Modules/Integrations/FluentCart/Http/cart_api.php:15`
- **Controller source:** `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php`

- Only portal access is required because this is a GET route, and the space is loaded without global scopes, so paywall details can be read for any space id including secret ones. The response also carries a wp-admin URL per product.
- The whole cart route group only exists while FluentCart is active.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="listSpacePaywalls" specUrl="/openapi/public/cart/list-space-paywalls.json" />
