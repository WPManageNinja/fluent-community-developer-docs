---
title: List All Space Courses
description: "Returns every space and course row in serial order, ignoring privacy and membership, for use in admin pickers and mapping screens."
outline: false
aside: false
---

Returns every space and course row in serial order, ignoring privacy and membership, for use in admin pickers and mapping screens.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/all_space_courses`
- **Edition:** Core
- **Controller:** `AdminController@getAllSpaceCourses`
- **Route source:** `fluent-community/app/Http/Routes/api.php:120`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Secret spaces and unpublished courses are included; do not reuse this response in member-facing UI.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listAllSpaceCourses" specUrl="/openapi/public/admin/list-all-space-courses.json" />
