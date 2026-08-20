---
title: Get Notification Preferences
description: "Returns the email notification preferences for a member — the global toggles, the per-space post preferences grouped by space group, and the digest send day."
outline: false
aside: false
---

Returns the email notification preferences for a member — the global toggles, the per-space post preferences grouped by space group, and the digest send day.

Preferences the member has never set are filled in from the community defaults, so the response is always complete. The per-space preference is flattened to `all_member_posts`, `admin_only_posts` or empty. Spaces with no parent group are gathered under a synthetic "Other Spaces" group.

## Endpoint

- **Method:** `GET`
- **Path:** `/profile/{username}/notification-preferences`
- **Edition:** Core
- **Controller:** `ProfileController@getNotificationPreferance`
- **Route source:** `fluent-community/app/Http/Routes/api.php:95`
- **Controller source:** `fluent-community/app/Http/Controllers/ProfileController.php`

- Requires the profile owner or a community moderator.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getNotificationPreferences" specUrl="/openapi/public/profile/get-notification-preferences.json" />
