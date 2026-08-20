---
title: Patch Profile
description: "Applies a targeted profile change — swapping the avatar or cover photo, or deactivating the account."
outline: false
aside: false
---

Applies a targeted profile change — swapping the avatar or cover photo, or deactivating the account.

Media URLs must resolve to an unclaimed uploaded media row, otherwise the call fails; the previous image is queued for cleanup. Sending `data[status]=deactivated` on an active profile blanks the profile status and stamps the deactivation time, and returns early without touching anything else.

## Endpoint

- **Method:** `PUT`
- **Path:** `/profile/{username}`
- **Edition:** Core
- **Controller:** `ProfileController@patchProfile`
- **Route source:** `fluent-community/app/Http/Routes/api.php:88`
- **Controller source:** `fluent-community/app/Http/Controllers/ProfileController.php`

- Requires the profile owner or a community moderator.
- Deactivation is gated by the `can_deactive_account` privacy setting unless the caller is a community admin.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="patchProfile" specUrl="/openapi/public/profile/patch-profile.json" />
