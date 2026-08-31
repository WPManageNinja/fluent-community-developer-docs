---
title: Get Overview Widget Report
description: "Returns the four headline community counters — members, posts, comments and spaces — each with a period-over-period comparison."
outline: false
aside: false
---

Returns the four headline community counters — members, posts, comments and spaces — each with a period-over-period comparison.

`start_date` and `end_date` default to the last 30 days and are read as plain dates in UTC. The comparison baseline is always the same window shifted back one calendar month, regardless of how wide the requested range is, so a seven-day range is compared against the same seven days a month earlier. `comparison` comes back as a string.

## Endpoint

- **Method:** `GET`
- **Path:** `/analytics/overview/widget`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ReportsController@getOverviewWidget`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:74`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ReportsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro. Counts are unfiltered by status, so drafts and pending posts are included.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getOverviewWidgetReport" specUrl="/openapi/public/reports/get-overview-widget-report.json" />
