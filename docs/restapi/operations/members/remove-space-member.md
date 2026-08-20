---
title: Remove Space Member
description: "Removes a member from a space and refreshes their cached space access list."
outline: false
aside: false
---

Removes a member from a space and refreshes their cached space access list.

## Endpoint

- **Method:** `POST`
- **Path:** `/spaces/{spaceSlug}/members/remove`
- **Edition:** Core
- **Controller:** `SpaceController@removeMember`
- **Route source:** `fluent-community/app/Http/Routes/api.php:23`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires the `can_remove_member` permission in this space.
- Destructive: the membership row is deleted, which revokes access to the space content immediately. Posts and comments the member made in the space are left in place.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="removeSpaceMember" specUrl="/openapi/public/members/remove-space-member.json" />
