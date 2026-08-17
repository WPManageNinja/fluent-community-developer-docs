---
title: Get Email Settings
description: "Returns the global email notification settings — digest schedule, sender details and template branding — falling back to the portal logo when no email-specific logo is set."
outline: false
aside: false
---

Returns the global email notification settings — digest schedule, sender details and template branding — falling back to the portal logo when no email-specific logo is set.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/email-settings`
- **Edition:** Core
- **Controller:** `AdminController@getEmailSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:103`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getEmailSettings" specUrl="/openapi/public/admin/get-email-settings.json" />
