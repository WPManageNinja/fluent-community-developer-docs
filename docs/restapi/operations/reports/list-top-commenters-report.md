---
title: List Top Commenters Report
description: "Returns the ten members who wrote the most comments within the requested range, each with their comment count."
outline: false
aside: false
---

Returns the ten members who wrote the most comments within the requested range, each with their comment count.

The range is applied to the comments, so this ranks activity in the window. Fixed at ten results.

## Endpoint

- **Method:** `GET`
- **Path:** `/analytics/members/top-commenters`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `MembersReportsController@topCommenters`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:84`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/MembersReportsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listTopCommentersReport" specUrl="/openapi/public/reports/list-top-commenters-report.json" />
