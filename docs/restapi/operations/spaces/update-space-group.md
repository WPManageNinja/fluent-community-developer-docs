---
title: Update Space Group
description: "Updates the title, description and expansion behaviour of a space group."
outline: false
aside: false
---

Updates the title, description and expansion behaviour of a space group.

`title` is required and must not collide with any other space record title. The slug cannot be changed here.

## Endpoint

- **Method:** `PUT`
- **Path:** `/spaces/space_groups/{id}`
- **Edition:** Core
- **Controller:** `SpaceController@updateSpaceGroup`
- **Route source:** `fluent-community/app/Http/Routes/api.php:34`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin or course-admin access, or the admin role in the space named by `space_id`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateSpaceGroup" specUrl="/openapi/public/spaces/update-space-group.json" />
