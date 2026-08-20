---
title: Leave Space
description: "Removes the current user membership of a space and refreshes their cached space access."
outline: false
aside: false
---

Removes the current user membership of a space and refreshes their cached space access.

## Endpoint

- **Method:** `POST`
- **Path:** `/spaces/{spaceSlug}/leave`
- **Edition:** Core
- **Controller:** `SpaceController@leave`
- **Route source:** `fluent-community/app/Http/Routes/api.php:14`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires a signed-in user who currently holds a membership row.
- Destructive: the membership is deleted, so a private or secret space cannot be rejoined without a new approval or invitation. Posts and comments already made are left in place.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="leaveSpace" specUrl="/openapi/public/spaces/leave-space.json" />
