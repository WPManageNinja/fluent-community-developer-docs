---
title: List Space Groups
description: "Returns the space groups with their spaces expanded, plus any space or course that has not been assigned to a group."
outline: false
aside: false
---

Returns the space groups with their spaces expanded, plus any space or course that has not been assigned to a group.

Pass `options_only` for the trimmed id and title list used by pickers, which any portal user may read. The full response formats each community space for the caller and attaches topics to courses, so it is considerably heavier.

## Endpoint

- **Method:** `GET`
- **Path:** `/spaces/space_groups`
- **Edition:** Core
- **Controller:** `SpaceController@getSpaceGroups`
- **Route source:** `fluent-community/app/Http/Routes/api.php:32`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- The full listing requires community-admin or course-admin access, or the admin role in the space named by `space_id`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listSpaceGroups" specUrl="/openapi/public/spaces/list-space-groups.json" />
