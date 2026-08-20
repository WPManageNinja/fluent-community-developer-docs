---
title: Cart Integration API
description: FluentCart-backed paywall search, creation, retrieval, and removal for spaces.
---

# Cart Integration API

FluentCart-backed paywall search, creation, retrieval, and removal for spaces.

## Authentication

Cart routes use `SpacePolicy` and assume the FluentCart integration module is active.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/cart/products/search` | Core | [Search Cart Products](/restapi/operations/cart/search-cart-products) | Searches published FluentCart products that have at least one variant, returning up to 20 with their formatted price range, for the paywall picker. |
| `POST` | `/cart/products/create` | Core | [Create Cart Product](/restapi/operations/cart/create-cart-product) | Creates a simple one-time digital FluentCart product with a single variant, so a paywall can be set up without leaving the community admin. |
| `GET` | `/cart/spaces/{spaceId}/paywalls` | Core | [List Space Paywalls](/restapi/operations/cart/list-space-paywalls) | Returns the published FluentCart products attached to a space as paywalls, each variant carrying its price, thumbnail and a ready-made instant-checkout URL. |
| `POST` | `/cart/spaces/{spaceId}/paywalls` | Core | [Create Space Paywall](/restapi/operations/cart/create-space-paywall) | Attaches a published FluentCart product to a space as a paywall. |
| `DELETE` | `/cart/spaces/{spaceId}/paywalls` | Core | [Delete Space Paywall](/restapi/operations/cart/delete-space-paywall) | Detaches a FluentCart product from a space so it no longer sells access to it. |
