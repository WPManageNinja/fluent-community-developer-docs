---
title: Get Space Widget Report
description: "Returns the space counters for a date range — spaces, posts, comments and members — optionally narrowed to one space."
outline: false
aside: false
---

Returns the space counters for a date range — spaces, posts, comments and members — optionally narrowed to one space.

Pass `space_id` to scope posts, comments and members to a single space; the space total ignores it and always counts community-wide. Status filtering is inconsistent between the two modes: the site-wide post count includes drafts while the per-space count does not.

## Endpoint

- **Method:** `GET`
- **Path:** `/analytics/spaces/widget`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `SpacesReportsController@widget`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:88`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/SpacesReportsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.
- The period-over-period `comparison` on all four counters is unreliable here, because each previous-period query is built on top of the current-period one; treat only `total_records` as meaningful.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getSpaceWidgetReport" specUrl="/openapi/public/reports/get-space-widget-report.json" />
