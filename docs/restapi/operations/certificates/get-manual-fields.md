---
title: "Get Manual Fields"
description: "Returns the fields an admin has to fill in to issue from a given template, with sensible defaults."
outline: false
aside: false
---

Returns the fields an admin has to fill in to issue from a given template, with sensible defaults.

Reads the template's published version and offers one field per merge tag that a visible text element actually prints, plus the certificate title. Pass a course to prefill course values, or a name to prefill the student ones.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/certificates/manual/fields`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ManualCertificateController@manualFields`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:32`

- Tags inside hidden elements, in non-text elements, or that the template does not use are not offered at all.
- The four generated values — issue date, expiry date, credential ID and serial — come back read-only and empty, because the system fills them.
- Requires a published template; a draft or archived one answers 422.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getManualFields" specUrl="/openapi/public/certificates/get-manual-fields.json" />
