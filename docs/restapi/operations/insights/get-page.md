---
title: "Get Page"
description: "Returns one Insights page's definition together with the definition of every card on it."
outline: false
aside: false
---

Returns one Insights page's definition together with the definition of every card on it.

Each card definition describes what the card is and what it supports (compare, export, a space or course scope, sorting) — it carries no data. The client then fetches each card separately, so a slow card cannot hold up the page. `page` is passed through `sanitize_key()` and must be an available page in the registry.

## Endpoint

- **Method:** `GET`
- **Path:** `/insights/pages/{page}`
- **Edition:** Core
- **Controller:** `InsightsController@page`
- **Route source:** `fluent-community/app/Http/Routes/api.php:166`
- **Controller source:** `fluent-community/app/Http/Controllers/InsightsController.php`

- Site admins only (`InsightsPolicy`).
- Returns 404 for both an unknown page and a page that exists but is not available on this install, so a Pro-only page reads the same as a typo.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getPage" specUrl="/openapi/public/insights/get-page.json" />
