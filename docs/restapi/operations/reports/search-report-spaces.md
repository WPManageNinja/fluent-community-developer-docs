---
title: Search Report Spaces
description: "Searches community spaces by title, returning id and title pairs for the analytics space picker."
outline: false
aside: false
---

Searches community spaces by title, returning id and title pairs for the analytics space picker.

Only `search` is read. Space groups, courses and sidebar links are excluded, and unpublished spaces are not filtered out.

## Endpoint

- **Method:** `GET`
- **Path:** `/analytics/spaces/search`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `SpacesReportsController@searchSpace`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:91`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/SpacesReportsController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.
- There is no result limit, so an empty `search` returns every community space on the site in one response.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="searchReportSpaces" specUrl="/openapi/public/reports/search-report-spaces.json" />
