---
title: Post Change Password
description: "Changes the account password after verifying the current one, and returns freshly minted nonces so the open session keeps working."
outline: false
aside: false
---

Changes the account password after verifying the current one, and returns freshly minted nonces so the open session keeps working.

All three of `current_password`, `new_password` and `confirm_password` are required; the new password must be at least four characters, must match the confirmation and must differ from the current one. Because WordPress destroys every session on a password change, the endpoint re-issues the auth cookie and returns new `rest_nonce` and `ajax_nonce` values — the client must adopt them or every subsequent request will fail.

## Endpoint

- **Method:** `POST`
- **Path:** `/profile/{username}/change-password`
- **Edition:** Core
- **Controller:** `ProfileController@changePassword`
- **Route source:** `fluent-community/app/Http/Routes/api.php:89`
- **Controller source:** `fluent-community/app/Http/Controllers/ProfileController.php`

- Only the account owner can call this; moderators and admins cannot change a password here.
- Blocked entirely when the `can_change_password` privacy setting is off.
- Every other session for the account is logged out.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postChangePassword" specUrl="/openapi/public/profile/post-change-password.json" />
