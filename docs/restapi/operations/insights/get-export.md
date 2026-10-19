---
title: Get Export
description: "Returns one card's data as CSV content plus a suggested filename, for the export button."
outline: false
aside: false
---

Returns one card's data as CSV content plus a suggested filename, for the export button.

Takes the same range, scope and option parameters as the card endpoint and builds the payload the same way, then serialises it with `CsvExporter`. The response is JSON carrying `filename` and `content` — not a file download — so the client writes the file itself. The filename embeds the card key and the resolved range.

## Endpoint

- **Method:** `GET`
- **Path:** `/insights/cards/{card}/export`
- **Edition:** Core
- **Controller:** `InsightsController@export`
- **Route source:** `fluent-community/app/Http/Routes/api.php:168`
- **Controller source:** `fluent-community/app/Http/Controllers/InsightsController.php`

- Site admins only (`InsightsPolicy`).
- Returns 422 when the card does not list `export` among the features it supports.
- `fresh` is not read here: an export always recomputes.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getExport" specUrl="/openapi/public/insights/get-export.json" />
