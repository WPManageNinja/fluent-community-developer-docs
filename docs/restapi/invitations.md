---
title: Invitations API
description: Invitation listing, creation, resend, delete, and link-generation endpoints.
---

# Invitations API

Invitation listing, creation, resend, delete, and link-generation endpoints.

## Authentication

Invitation routes are protected by the dedicated invitation policy and intended for community management flows.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/invitations` | Core | [List Invitations](/restapi/operations/invitations/list-invitations) | `InvitationController@getInvitations` |
| `DELETE` | `/invitations/{invitation_id}` | Core | [Delete Invitation](/restapi/operations/invitations/delete-invitation) | `InvitationController@delete` |
| `POST` | `/invitations` | Core | [Create Invitation](/restapi/operations/invitations/create-invitation) | `InvitationController@store` |
| `POST` | `/invitations/link` | Core | [Create Invitation Link](/restapi/operations/invitations/create-invitation-link) | `InvitationController@createNewLink` |
| `POST` | `/invitations/{invitation_id}/resend` | Core | [Resend Invitation](/restapi/operations/invitations/resend-invitation) | `InvitationController@resend` |
