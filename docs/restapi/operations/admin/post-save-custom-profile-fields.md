---
title: Post Save Custom Profile Fields
description: "Replaces the whole custom profile field configuration and keeps the `custom_profile_fields` feature flag in step with the submitted `is_enabled` value."
outline: false
aside: false
---

Replaces the whole custom profile field configuration and keeps the `custom_profile_fields` feature flag in step with the submitted `is_enabled` value.

Groups are sanitised first and fields are then validated against the surviving group slugs, so a field pointing at a removed group is dropped. Switching the feature on for the first time runs a one-off migration that copies existing custom field values into the profile table.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/custom-profile-fields`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@saveCustomProfileFields`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:25`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.
- The submitted set replaces the stored one, so any group or field left out is deleted.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postSaveCustomProfileFields" specUrl="/openapi/public/admin/post-save-custom-profile-fields.json" />
