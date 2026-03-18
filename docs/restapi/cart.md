---
title: Cart Integration API
description: FluentCart-backed paywall search, creation, retrieval, and removal for spaces.
---

# Cart Integration API

FluentCart-backed paywall search, creation, retrieval, and removal for spaces.

## Authentication

Cart routes use `SpacePolicy` and assume the FluentCart integration module is active.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/cart/products/search` | Core | [Search Cart Products](/restapi/operations/cart/search-cart-products) | `PaywallController@searchProduct` |
| `POST` | `/cart/products/create` | Core | [Create Cart Product](/restapi/operations/cart/create-cart-product) | `PaywallController@createProduct` |
| `GET` | `/cart/spaces/{spaceId}/paywalls` | Core | [List Space Paywalls](/restapi/operations/cart/list-space-paywalls) | `PaywallController@getPaywalls` |
| `POST` | `/cart/spaces/{spaceId}/paywalls` | Core | [Create Space Paywall](/restapi/operations/cart/create-space-paywall) | `PaywallController@addPaywall` |
| `DELETE` | `/cart/spaces/{spaceId}/paywalls` | Core | [Delete Space Paywall](/restapi/operations/cart/delete-space-paywall) | `PaywallController@removePaywall` |
