---
title: Update Member
description: "Changes the community status of one member, moving them between active, pending and blocked."
outline: false
aside: false
---

Changes the community status of one member, moving them between active, pending and blocked.

`status` must be `active`, `pending` or `blocked`; any other value is ignored and the call still reports success. Demoting another community admin is refused — their manager role has to be removed first.

## Endpoint

- **Method:** `PATCH`
- **Path:** `/members/{user_id}`
- **Edition:** Core
- **Controller:** `MembersController@patchMember`
- **Route source:** `fluent-community/app/Http/Routes/api.php:127`
- **Controller source:** `fluent-community/app/Http/Controllers/MembersController.php`

- Requires the `delete_any_feed` community permission, which in practice means a community moderator or admin.
- Blocking a member hides their posts and comments from the portal.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateMember" specUrl="/openapi/public/members/update-member.json" />
