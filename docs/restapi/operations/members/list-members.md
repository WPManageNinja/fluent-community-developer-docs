---
title: List Members
description: "Returns a paginated directory of community members in the requested sort order, or the trimmed candidate list the mention autocomplete uses."
outline: false
aside: false
---

Returns a paginated directory of community members in the requested sort order, or the trimmed candidate list the mention autocomplete uses.

Passing `mention` switches the endpoint into autocomplete mode: at most ten matches, the current user excluded, and — when `space` or `space_id` is given — restricted to that space, which the caller must belong to. The directory mode instead honours `search`, `sort_by` (`last_activity`, `display_name` or `created_at`) and `sort_dir`, and is gated by the `members_page_status` privacy setting.

## Endpoint

- **Method:** `GET`
- **Path:** `/members`
- **Edition:** Core
- **Controller:** `MembersController@getMembers`
- **Route source:** `fluent-community/app/Http/Routes/api.php:130`
- **Controller source:** `fluent-community/app/Http/Controllers/MembersController.php`

- Moderators may pass `status` to list `pending`, `blocked` or `deactivated` members; everyone else only ever sees active profiles.
- When the members page is restricted the response is an error carrying `permission_failed`, not an empty list.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listMembers" specUrl="/openapi/public/members/list-members.json" />
