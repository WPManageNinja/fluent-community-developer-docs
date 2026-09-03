---
title: List Top Members Report
description: "Returns ten member profiles ordered by lifetime points, drawn from those who joined within the requested range."
outline: false
aside: false
---

Returns ten member profiles ordered by lifetime points, drawn from those who joined within the requested range.

The date range filters on the profile creation date, not on points earned, so this is really the highest-scoring recent joiners. A long-standing member with a high score never appears unless the range covers the date they signed up. Fixed at ten results with no pagination.

## Endpoint

- **Method:** `GET`
- **Path:** `/analytics/members/top-members`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `MembersReportsController@getTopMembers`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:82`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/MembersReportsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro; full profile records are returned, including their meta.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listTopMembersReport" specUrl="/openapi/public/reports/list-top-members-report.json" />
