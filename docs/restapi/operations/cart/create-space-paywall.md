---
title: Create Space Paywall
description: "Attaches a published FluentCart product to a space as a paywall."
outline: false
aside: false
---

Attaches a published FluentCart product to a space as a paywall.

`cart_product_id` must reference a published product, and attaching the same product twice is rejected. The product id list is stored on the space settings, and `fluent_community/paywall_added` fires afterwards.

## Endpoint

- **Method:** `POST`
- **Path:** `/cart/spaces/{spaceId}/paywalls`
- **Edition:** Core
- **Controller:** `PaywallController@addPaywall`
- **Route source:** `fluent-community/Modules/Integrations/FluentCart/Http/cart_api.php:16`
- **Controller source:** `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php`

- Requires community-admin access, or the admin role in this space.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="createSpacePaywall" specUrl="/openapi/public/cart/create-space-paywall.json" />
