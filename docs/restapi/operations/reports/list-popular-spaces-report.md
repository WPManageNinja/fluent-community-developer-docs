---
title: List Popular Spaces Report
description: "Returns a ranked table of the busiest spaces, or — when `space_id` is supplied — the busiest posts inside that one space."
outline: false
aside: false
---

Returns a ranked table of the busiest spaces, or — when `space_id` is supplied — the busiest posts inside that one space.

Both variants come back as a `columns` and `data` pair, but the columns differ: spaces are ranked on posts, comments and members, while posts are ranked on comments and reactions with a 40-character title excerpt. The space `comments_count` is an all-time figure even though the post and member counts beside it are scoped to the range.

## Endpoint

- **Method:** `GET`
- **Path:** `/analytics/spaces/popular`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `SpacesReportsController@getTopSpaces`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:87`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/SpacesReportsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.
- The space ranking takes ten rows before sorting them, so on a site with more than ten spaces it ranks the ten oldest spaces among themselves rather than returning the ten most popular.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listPopularSpacesReport" specUrl="/openapi/public/reports/list-popular-spaces-report.json" />
