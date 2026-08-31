---
title: Get Overview Activity Report
description: "Returns a gap-filled time series of one activity type across the community, ready to plot without client-side interpolation."
outline: false
aside: false
---

Returns a gap-filled time series of one activity type across the community, ready to plot without client-side interpolation.

`activity` selects the series and accepts `posts` (the default), `comments`, `members` or `spaces`; any other value raises an unhandled error rather than a validation message. Bucket size switches automatically with the range — daily up to 62 days, weekly to 92, monthly beyond — and the `date` label format changes with it, which the response does not signal.

## Endpoint

- **Method:** `GET`
- **Path:** `/analytics/overview/activity`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ReportsController@activityReport`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:75`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ReportsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro. Weekly and monthly grouping has no year component, so a range spanning a year boundary merges buckets.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getOverviewActivityReport" specUrl="/openapi/public/reports/get-overview-activity-report.json" />
