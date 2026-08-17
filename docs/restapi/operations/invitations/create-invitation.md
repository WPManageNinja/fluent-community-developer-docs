---
title: Create Invitation
description: "Invites one email address to join a space and sends the invitation email immediately."
outline: false
aside: false
---

Invites one email address to join a space and sends the invitation email immediately.

A valid `email` and a `space_id` are required; `invitee_name` is optional. The invitation is refused when the address already belongs to a member of that space, or when the caller has already invited the same address to the same space.

## Endpoint

- **Method:** `POST`
- **Path:** `/invitations`
- **Edition:** Core
- **Controller:** `InvitationController@store`
- **Route source:** `fluent-community/Modules/Auth/InvitationModule.php:25`
- **Controller source:** `fluent-community/Modules/Auth/Classes/InvitationController.php`

- Requires the `community_moderator` permission in the space named by `space_id`.
- Requires FluentCommunity Pro with the `invitation` feature enabled.
- Sends outbound email synchronously, so the request is only as fast as the mail transport. Nothing rate limits it — the daily cap helper exists in the controller but is never called.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="createInvitation" specUrl="/openapi/public/invitations/create-invitation.json" />
