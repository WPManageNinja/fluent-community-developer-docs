---
title: Insights API
description: Reporting — the pages an admin can open, each page's cards, a single card's data for a date range and scope, and CSV export. Replaced the old Pro analytics endpoints.
---

# Insights API

Reporting — the pages an admin can open, each page's cards, a single card's data for a date range and scope, and CSV export. Replaced the old Pro analytics endpoints.

## Authentication

Every route is registered with `InsightsPolicy`, which is site-admin only and implements one method per action, so none of them falls back to the weaker `verifyRequest()`. Cards are additionally checked with `canView()` for the requested scope and skipped when the install's Insights level does not include them.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/insights/pages` | Core | [Get Pages](/restapi/operations/insights/get-pages) | Lists the Insights pages the current admin can open, plus the state the admin UI needs before it renders any of them. |
| `GET` | `/insights/pages/{page}` | Core | [Get Page](/restapi/operations/insights/get-page) | Returns one Insights page's definition together with the definition of every card on it. |
| `GET` | `/insights/cards/{card}` | Core | [Get Card](/restapi/operations/insights/get-card) | Returns one card's data for a date range and scope: the series or rows it plots, its totals, and the comparison against the preceding period. |
| `GET` | `/insights/cards/{card}/export` | Core | [Get Export](/restapi/operations/insights/get-export) | Returns one card's data as CSV content plus a suggested filename, for the export button. |
