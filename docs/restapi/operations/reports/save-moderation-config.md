---
title: Save Moderation Config
description: "Stores the content moderation configuration and keeps the `content_moderation` feature flag in step with its `is_enabled` value."
outline: false
aside: false
---

Stores the content moderation configuration and keeps the `content_moderation` feature flag in step with its `is_enabled` value.

Recognised keys are `is_enabled`, `profanity_filter`, `flag_after_threshold`, `first_comment_approval`, `auto_flag_user_reject_threshold` and `auto_flag_user_report_threshold`. Any other key sent in `config` is stored as submitted rather than being discarded, so send only the documented fields.

## Endpoint

- **Method:** `POST`
- **Path:** `/moderation/config`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ModerationController@saveConfig`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:108`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ModerationController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro. Disabling the feature here also removes the moderation queue routes on the next request.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveModerationConfig" specUrl="/openapi/public/reports/save-moderation-config.json" />
