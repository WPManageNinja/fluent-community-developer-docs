---
title: Save License Key
description: "Activates a Pro licence key against the remote licensing service and stores the returned licence data."
outline: false
aside: false
---

Activates a Pro licence key against the remote licensing service and stores the returned licence data.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/license`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `LicenseController@saveLicense`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:29`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/LicenseController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro; makes an outbound HTTP request, so it can fail on restricted networks.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="saveLicenseKey" specUrl="/openapi/public/admin/save-license-key.json" />
