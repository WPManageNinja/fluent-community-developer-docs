---
title: Create Cart Product
description: "Creates a simple one-time digital FluentCart product with a single variant, so a paywall can be set up without leaving the community admin."
outline: false
aside: false
---

Creates a simple one-time digital FluentCart product with a single variant, so a paywall can be set up without leaving the community admin.

Takes `title` and `price`; the price is stored in minor units. The product is published immediately and tagged with a `created_from` meta of `fluent_community`. Neither field is validated, so an empty title or a negative price is accepted.

## Endpoint

- **Method:** `POST`
- **Path:** `/cart/products/create`
- **Edition:** Core
- **Controller:** `PaywallController@createProduct`
- **Route source:** `fluent-community/Modules/Integrations/FluentCart/Http/cart_api.php:14`
- **Controller source:** `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php`

- Requires community-admin access, or the admin role in the space named by `space_id`.
- Also requires the FluentCart `products/create` permission, which is checked separately and returns a 422 when missing.
- The generated variant is created with a stock of 1, so the product sells exactly once until its stock is raised in FluentCart.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="createCartProduct" specUrl="/openapi/public/cart/create-cart-product.json" />
