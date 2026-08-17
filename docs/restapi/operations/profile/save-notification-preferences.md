---
title: Save Notification Preferences
description: "Stores the email notification preferences for a member, translating the per-space choices into the underlying subscription rows."
outline: false
aside: false
---

Stores the email notification preferences for a member, translating the per-space choices into the underlying subscription rows.

Global toggles are sent as `yes` or `no` under `user_globals`. `message_email_frequency` accepts `disabled`, `hourly`, `daily` or `weekly`; anything else leaves the stored value untouched. Under `space_prefs`, `all_member_posts` enables notifications for both member and admin posts while `admin_only_posts` enables only the admin one.

## Endpoint

- **Method:** `POST`
- **Path:** `/profile/{username}/notification-preferences`
- **Edition:** Core
- **Controller:** `ProfileController@saveNotificationPreferance`
- **Route source:** `fluent-community/app/Http/Routes/api.php:96`
- **Controller source:** `fluent-community/app/Http/Controllers/ProfileController.php`

- Requires the profile owner or a community moderator.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveNotificationPreferences" specUrl="/openapi/public/profile/save-notification-preferences.json" />
