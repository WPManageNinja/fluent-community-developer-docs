---
title: List Top Post Starters Report
description: "Returns the ten members who published the most posts within the requested range, each with their post count."
outline: false
aside: false
---

Returns the ten members who published the most posts within the requested range, each with their post count.

The range is applied to the posts rather than to the member record, so this ranks activity in the window as expected. Only plain text posts are counted — lessons and documents are excluded — and post status is not filtered. Fixed at ten results.

## Endpoint

- **Method:** `GET`
- **Path:** `/analytics/members/top-post-starters`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `MembersReportsController@topPostStarter`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:80`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/MembersReportsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listTopPostStartersReport" specUrl="/openapi/public/reports/list-top-post-starters-report.json" />
