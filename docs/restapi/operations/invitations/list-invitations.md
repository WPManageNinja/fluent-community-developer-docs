---
title: List Invitations
description: "Returns the paginated invitations the current user has issued for one space, newest first, with a ready-to-share access URL on each one that is still valid."
outline: false
aside: false
---

Returns the paginated invitations the current user has issued for one space, newest first, with a ready-to-share access URL on each one that is still valid.

`space_id` is required — the space is loaded with `findOrFail`, so omitting it fails rather than returning every invitation. `status` defaults to `pending`; pass `all` to drop the status filter. The response also carries an `is_mod` flag for the client.

## Endpoint

- **Method:** `GET`
- **Path:** `/invitations`
- **Edition:** Core
- **Controller:** `InvitationController@getInvitations`
- **Route source:** `fluent-community/Modules/Auth/InvitationModule.php:23`
- **Controller source:** `fluent-community/Modules/Auth/Classes/InvitationController.php`

- Requires the `community_moderator` permission in the space named by `space_id`.
- The query is always scoped to the caller own invitations, so a moderator does not see invitations issued by other moderators despite the `is_mod` flag suggesting otherwise.
- Although the controller ships in the free plugin, the routes are only registered by FluentCommunity Pro and only while the `invitation` feature is enabled; otherwise they return 404.
- This GET also writes: invitations past their expiry are flipped to `expired` and saved as the list is built.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listInvitations" specUrl="/openapi/public/invitations/list-invitations.json" />
