---
title: Delete Invitation
description: "Revokes an invitation so its email and link can no longer be redeemed."
outline: false
aside: false
---

Revokes an invitation so its email and link can no longer be redeemed.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/invitations/{invitation_id}`
- **Edition:** Core
- **Controller:** `InvitationController@delete`
- **Route source:** `fluent-community/Modules/Auth/InvitationModule.php:24`
- **Controller source:** `fluent-community/Modules/Auth/Classes/InvitationController.php`

- Requires the `community_moderator` permission in the space the invitation was issued for.
- Requires FluentCommunity Pro with the `invitation` feature enabled.
- Destructive: the invitation row is deleted and any link already shared stops working immediately.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteInvitation" specUrl="/openapi/public/invitations/delete-invitation.json" />
