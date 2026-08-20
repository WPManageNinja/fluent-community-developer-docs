---
title: Get Member Widget Report
description: "Returns the member counters for a date range — total, active, new and pending — each with a period-over-period comparison."
outline: false
aside: false
---

Returns the member counters for a date range — total, active, new and pending — each with a period-over-period comparison.

All four are counts within the requested window rather than lifetime totals, so `total_members` and `new_members` are computed identically and always match; only their titles differ. `active_members` counts by last activity instead of signup date.

## Endpoint

- **Method:** `GET`
- **Path:** `/analytics/members/widget`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `MembersReportsController@widget`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:77`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/MembersReportsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.
- The comparison figure on `pending_members` is not reliable — the previous-period query is built on the already-filtered one, so it resolves to zero.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getMemberWidgetReport" specUrl="/openapi/public/reports/get-member-widget-report.json" />
