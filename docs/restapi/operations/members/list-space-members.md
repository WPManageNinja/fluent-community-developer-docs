---
title: List Space Members
description: "Returns the paginated active membership of a space, each entry carrying the member profile and their role, plus the count of outstanding join requests."
outline: false
aside: false
---

Returns the paginated active membership of a space, each entry carrying the member profile and their role, plus the count of outstanding join requests.

Sort with `sort_by` set to `created_at` (join date, the default), `display_name` or `last_activity`, and `sort_dir`; filter with `search`. Callers who can add members may pass `status=pending` to list the join requests instead of the members.

## Endpoint

- **Method:** `GET`
- **Path:** `/spaces/{spaceSlug}/members`
- **Edition:** Core
- **Controller:** `SpaceController@getMembers`
- **Route source:** `fluent-community/app/Http/Routes/api.php:18`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Gated by the `can_view_members` space permission; failure comes back as an error carrying `permission_failed`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listSpaceMembers" specUrl="/openapi/public/members/list-space-members.json" />
