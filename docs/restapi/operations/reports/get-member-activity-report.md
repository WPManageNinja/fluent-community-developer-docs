---
title: Get Member Activity Report
description: "Returns a gap-filled time series of member signups across the requested range."
outline: false
aside: false
---

Returns a gap-filled time series of member signups across the requested range.

The end date is excluded from this series while the member widget includes the whole end day, so the chart and the counters for the same range cover slightly different windows.

## Endpoint

- **Method:** `GET`
- **Path:** `/analytics/members/activity`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `MembersReportsController@activity`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:78`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/MembersReportsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getMemberActivityReport" specUrl="/openapi/public/reports/get-member-activity-report.json" />
