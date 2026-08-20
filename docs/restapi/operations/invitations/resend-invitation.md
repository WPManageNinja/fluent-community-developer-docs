---
title: Resend Invitation
description: "Sends the invitation email again for an invitation that has not yet been redeemed."
outline: false
aside: false
---

Sends the invitation email again for an invitation that has not yet been redeemed.

Refused once the invitation has been sent more than five times; the send count is tracked on the invitation record.

## Endpoint

- **Method:** `POST`
- **Path:** `/invitations/{invitation_id}/resend`
- **Edition:** Core
- **Controller:** `InvitationController@resend`
- **Route source:** `fluent-community/Modules/Auth/InvitationModule.php:27`
- **Controller source:** `fluent-community/Modules/Auth/Classes/InvitationController.php`

- Requires the `community_moderator` permission in the space the invitation was issued for.
- Requires FluentCommunity Pro with the `invitation` feature enabled.
- The token is not regenerated, so previously sent links stay valid.
- Nothing restricts this to email invitations. Calling it on a shareable link mails an empty recipient and still increments the counter, which for link invitations is the redemption count checked against the limit — repeated calls can exhaust a working invite link.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="resendInvitation" specUrl="/openapi/public/invitations/resend-invitation.json" />
