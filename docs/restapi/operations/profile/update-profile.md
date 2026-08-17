---
title: Update Profile
description: "Saves the editable profile fields — names, bio, headline, website and social links — and mirrors the display name onto the WordPress user record."
outline: false
aside: false
---

Saves the editable profile fields — names, bio, headline, website and social links — and mirrors the display name onto the WordPress user record.

`first_name` is required. The bio is capped at 5000 characters and the headline at 60, both adjustable by filter. Social links whose key is not a registered provider are dropped. Changing the username is allowed for moderators, or for the owner when `can_customize_username` is on, and returns a `redirect_url` because the profile URL changes. Changing the email address is only offered when the caller has `edit_users` or the `can_change_email` privacy setting permits it on their own profile; in the latter case the change is held pending a confirmation email rather than applied.

## Endpoint

- **Method:** `POST`
- **Path:** `/profile/{username}`
- **Edition:** Core
- **Controller:** `ProfileController@updateProfile`
- **Route source:** `fluent-community/app/Http/Routes/api.php:87`
- **Controller source:** `fluent-community/app/Http/Controllers/ProfileController.php`

- Editing someone else profile requires community-moderator access; only moderators may set `is_verified`, `status` or badge slugs.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateProfile" specUrl="/openapi/public/profile/update-profile.json" />
