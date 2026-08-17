---
title: Create Invitation Link
description: "Creates a shareable invitation link for a space that any recipient can redeem, and returns its access URL."
outline: false
aside: false
---

Creates a shareable invitation link for a space that any recipient can redeem, and returns its access URL.

`title` and `space_id` are required; `limit` caps how many people may redeem it and `expire_date` sets an expiry. The link is actually created by whatever is listening on the `fluent_community/create_invitation_link` filter, so the call fails with a generic message when no handler is registered.

## Endpoint

- **Method:** `POST`
- **Path:** `/invitations/link`
- **Edition:** Core
- **Controller:** `InvitationController@createNewLink`
- **Route source:** `fluent-community/Modules/Auth/InvitationModule.php:26`
- **Controller source:** `fluent-community/Modules/Auth/Classes/InvitationController.php`

- Requires the `community_moderator` permission in the space named by `space_id`.
- Requires FluentCommunity Pro with the `invitation` feature enabled — Pro also supplies the filter that actually creates the link.
- Anyone holding the returned URL can join the space until the limit or expiry is reached; neither `limit` nor `expire_date` is validated.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="createInvitationLink" specUrl="/openapi/public/invitations/create-invitation-link.json" />
