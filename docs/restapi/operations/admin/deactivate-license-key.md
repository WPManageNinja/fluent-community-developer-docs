---
title: Deactivate License Key
description: "Releases the Pro licence activation for this site so the key can be used elsewhere."
outline: false
aside: false
---

Releases the Pro licence activation for this site so the key can be used elsewhere.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/admin/license`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `LicenseController@deactivateLicense`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:19`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/LicenseController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro; Pro updates stop after deactivation.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="deactivateLicenseKey" specUrl="/openapi/public/admin/deactivate-license-key.json" />
