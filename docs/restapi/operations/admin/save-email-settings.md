---
title: Save Email Settings
description: "Merges the submitted email notification settings over the stored ones and saves the result."
outline: false
aside: false
---

Merges the submitted email notification settings over the stored ones and saves the result.

Submitted values are merged onto the previous settings, so a partial payload is safe. If `digest_mail_day` or `daily_digest_time` changes, every queued `fluent_community_send_daily_digest_init` action is unscheduled and the digest is re-queued on the next cron pass.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/email-settings`
- **Edition:** Core
- **Controller:** `AdminController@saveEmailSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:104`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveEmailSettings" specUrl="/openapi/public/admin/save-email-settings.json" />
