---
title: Get Custom Profile Fields
description: "Returns the custom profile field configuration — the field groups, the field definitions and whether the feature is switched on."
outline: false
aside: false
---

Returns the custom profile field configuration — the field groups, the field definitions and whether the feature is switched on.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/custom-profile-fields`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@getCustomProfileFields`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:24`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getCustomProfileFields" specUrl="/openapi/public/admin/get-custom-profile-fields.json" />
