---
title: Create Space Group
description: "Creates a space group to hold spaces in the sidebar."
outline: false
aside: false
---

Creates a space group to hold spaces in the sidebar.

`title` and `slug` are both required and must be unique across all space records, groups and spaces alike. The group is appended to the end of the sidebar order.

## Endpoint

- **Method:** `POST`
- **Path:** `/spaces/space_groups`
- **Edition:** Core
- **Controller:** `SpaceController@createSpaceGroup`
- **Route source:** `fluent-community/app/Http/Routes/api.php:33`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin or course-admin access, or the admin role in the space named by `space_id`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="createSpaceGroup" specUrl="/openapi/public/spaces/create-space-group.json" />
