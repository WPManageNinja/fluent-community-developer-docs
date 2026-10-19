---
title: Get Pages
description: "Lists the Insights pages the current admin can open, plus the state the admin UI needs before it renders any of them."
outline: false
aside: false
---

Lists the Insights pages the current admin can open, plus the state the admin UI needs before it renders any of them.

Pages come from the card registry and are filtered to the ones visible for the request scope, so the list differs between a free and a Pro install. Alongside them the response carries the install's Insights `level`, whether the installed Pro is too old for this core (`pro_outdated`), whether the tracking tables are still being optimised in the background (`optimising`), the date tracking started (`tracking_since`, `null` until the first backfill), and the course options for the course picker.

## Endpoint

- **Method:** `GET`
- **Path:** `/insights/pages`
- **Edition:** Core
- **Controller:** `InsightsController@pages`
- **Route source:** `fluent-community/app/Http/Routes/api.php:165`
- **Controller source:** `fluent-community/app/Http/Controllers/InsightsController.php`

- Site admins only (`InsightsPolicy`).
- `tracking_since` matters when reading any chart: nothing before that date was captured, so an earlier range is not an empty community, it is an un-tracked one.
- While `optimising` is true the numbers are still incomplete.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getPages" specUrl="/openapi/public/insights/get-pages.json" />
