---
title: Save Feature Settings
description: "Saves the feature flag configuration, merging the submitted flags over the stored ones."
outline: false
aside: false
---

Saves the feature flag configuration, merging the submitted flags over the stored ones.

Only recognised flags are accepted — courses, leaderboard, Giphy, emoji, badges, cloud storage, CRM sync, followers, custom profile fields and PWA. Enabling the Giphy module requires a key. Sending back the `FCOM_ENCRYPTED_DATA_KEY` placeholder preserves the stored key instead of overwriting it.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/features`
- **Edition:** Core
- **Controller:** `SettingController@setFeatures`
- **Route source:** `fluent-community/app/Http/Routes/api.php:162`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Several flags gate whole route groups, so turning one off removes its endpoints on the next request.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveFeatureSettings" specUrl="/openapi/public/settings/save-feature-settings.json" />
