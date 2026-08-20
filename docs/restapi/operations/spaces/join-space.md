---
title: Join Space
description: "Joins the current user to a space, or lodges a join request when the space requires approval, and returns the resulting membership."
outline: false
aside: false
---

Joins the current user to a space, or lodges a join request when the space requires approval, and returns the resulting membership.

Public spaces grant immediate active membership. Private spaces produce a `pending` membership by default, which the `fluent_community/space/join_status_for_private` filter can override. Community admins and moderators bypass this and join directly as admin or moderator respectively. Attempting to join a space you already have a membership row for is an error.

## Endpoint

- **Method:** `POST`
- **Path:** `/spaces/{spaceSlug}/join`
- **Edition:** Core
- **Controller:** `SpaceController@join`
- **Route source:** `fluent-community/app/Http/Routes/api.php:13`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires a signed-in user.
- Secret spaces cannot be self-joined by ordinary members; they must be added by an admin.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="joinSpace" specUrl="/openapi/public/spaces/join-space.json" />
