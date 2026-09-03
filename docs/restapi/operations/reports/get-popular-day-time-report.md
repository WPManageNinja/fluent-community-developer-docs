---
title: Get Popular Day Time Report
description: "Returns a day-of-week by time-of-day heatmap of community activity, as a fixed grid of six four-hour blocks against the seven weekdays."
outline: false
aside: false
---

Returns a day-of-week by time-of-day heatmap of community activity, as a fixed grid of six four-hour blocks against the seven weekdays.

Only `start_date` and `end_date` are read; the block size is fixed. Each cell sums posts, comments, spaces and member signups into a single figure, so it measures overall busyness rather than any one activity.

## Endpoint

- **Method:** `GET`
- **Path:** `/analytics/overview/popular-day-time`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ReportsController@popularDayTimeReport`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:76`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ReportsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.
- Expensive: the report issues one count query per day, per block, per model — roughly 720 queries for the default 30-day range, and proportionally more for wider ones. There is no range cap and no caching.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getPopularDayTimeReport" specUrl="/openapi/public/reports/get-popular-day-time-report.json" />
