---
title: "Get Card"
description: "Returns one card's data for a date range and scope: the series or rows it plots, its totals, and the comparison against the preceding period."
outline: false
aside: false
---

Returns one card's data for a date range and scope: the series or rows it plots, its totals, and the comparison against the preceding period.

The card key is matched against `^[a-z0-9_.-]+$` and looked up in the registry. `from`/`to` (or a named `range`) set the window and `granularity` the bucket size; `space_id` and `course_id` are read only when the card declares it supports them, so an unsupported scope is ignored rather than rejected. `compare` defaults to `previous` on cards that support comparison and is forced to `none` on those that do not. `page`, `per_page` and `sort` apply to table cards. Pass `fresh=1` to bypass the cached payload.

## Endpoint

- **Method:** `GET`
- **Path:** `/insights/cards/{card}`
- **Edition:** Core
- **Controller:** `InsightsController@card`
- **Route source:** `fluent-community/app/Http/Routes/api.php:167`
- **Controller source:** `fluent-community/app/Http/Controllers/InsightsController.php`

- Site admins only (`InsightsPolicy`), and the card is additionally checked with `canView()` for the requested scope — that one returns 403.
- A locked card (not included in this install's Insights level) returns 404, the same as an unknown key.
- The range includes `to`, and a comparison window is the period immediately before the requested one, not the same dates in the previous month.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getCard" specUrl="/openapi/public/insights/get-card.json" />
