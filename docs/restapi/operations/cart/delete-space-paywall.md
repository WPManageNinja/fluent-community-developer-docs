---
title: Delete Space Paywall
description: "Detaches a FluentCart product from a space so it no longer sells access to it."
outline: false
aside: false
---

Detaches a FluentCart product from a space so it no longer sells access to it.

`cart_product_id` must currently be attached to the space, and the product must still be published — a product unpublished in FluentCart after being linked cannot be detached here. Passing `revoke_access=yes` additionally drops the space from the FluentCart product integration feed.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/cart/spaces/{spaceId}/paywalls`
- **Edition:** Core
- **Controller:** `PaywallController@removePaywall`
- **Route source:** `fluent-community/Modules/Integrations/FluentCart/Http/cart_api.php:17`
- **Controller source:** `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php`

- Requires community-admin access, or the admin role in this space.
- The product itself is not deleted; only the link between it and the space is removed.
- Even with `revoke_access=yes`, members who already bought access keep their membership — the setting only stops future orders from granting it.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="deleteSpacePaywall" specUrl="/openapi/public/cart/delete-space-paywall.json" />
