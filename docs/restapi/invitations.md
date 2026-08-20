---
title: Invitations API
description: Invitation listing, creation, resend, delete, and link-generation endpoints.
---

# Invitations API

Invitation listing, creation, resend, delete, and link-generation endpoints.

## Authentication

Invitation routes are protected by the dedicated invitation policy and intended for community management flows.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/invitations` | Core | [List Invitations](/restapi/operations/invitations/list-invitations) | Returns the paginated invitations the current user has issued for one space, newest first, with a ready-to-share access URL on each one that is still valid. |
| `DELETE` | `/invitations/{invitation_id}` | Core | [Delete Invitation](/restapi/operations/invitations/delete-invitation) | Revokes an invitation so its email and link can no longer be redeemed. |
| `POST` | `/invitations` | Core | [Create Invitation](/restapi/operations/invitations/create-invitation) | Invites one email address to join a space and sends the invitation email immediately. |
| `POST` | `/invitations/link` | Core | [Create Invitation Link](/restapi/operations/invitations/create-invitation-link) | Creates a shareable invitation link for a space that any recipient can redeem, and returns its access URL. |
| `POST` | `/invitations/{invitation_id}/resend` | Core | [Resend Invitation](/restapi/operations/invitations/resend-invitation) | Sends the invitation email again for an invitation that has not yet been redeemed. |
