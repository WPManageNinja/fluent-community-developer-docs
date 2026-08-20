---
title: Get Space Activity Report
description: "Returns a gap-filled time series of posts, optionally narrowed to one space with `space_id`."
outline: false
aside: false
---

Returns a gap-filled time series of posts, optionally narrowed to one space with `space_id`.

Despite sitting under the spaces analytics group this charts posts, not spaces — the `activity` key in the response reads `posts`.

## Endpoint

- **Method:** `GET`
- **Path:** `/analytics/spaces/activity`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `SpacesReportsController@activity`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:86`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/SpacesReportsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getSpaceActivityReport" specUrl="/openapi/public/reports/get-space-activity-report.json" />
