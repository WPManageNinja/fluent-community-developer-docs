---
title: Get License Status
description: "Returns the current Pro licence state, including expiry and a renewal URL when the licence has lapsed."
outline: false
aside: false
---

Returns the current Pro licence state, including expiry and a renewal URL when the licence has lapsed.

The licence key itself is stripped from the response. A remote lookup failure is reported as an `invalid` status with the error message rather than as an HTTP error.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/license`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `LicenseController@getStatus`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:17`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/LicenseController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getLicenseStatus" specUrl="/openapi/public/admin/get-license-status.json" />
