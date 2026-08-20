---
title: Get Space Lockscreens
description: "Returns the lock screen configuration a space shows to visitors who are not members — its copy, imagery and call to action."
outline: false
aside: false
---

Returns the lock screen configuration a space shows to visitors who are not members — its copy, imagery and call to action.

## Endpoint

- **Method:** `GET`
- **Path:** `/spaces/{spaceSlug}/lockscreens`
- **Edition:** Core
- **Controller:** `SpaceController@getLockScreenSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:25`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- A secret space the caller is neither a member nor an admin of returns the same 404 as a space that does not exist.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getSpaceLockscreens" specUrl="/openapi/public/spaces/get-space-lockscreens.json" />
