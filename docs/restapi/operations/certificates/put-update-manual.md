---
title: "Put Update Manual"
description: "Edits a manual certificate's holder, values, privacy, expiry or template version."
outline: false
aside: false
---

Edits a manual certificate's holder, values, privacy, expiry or template version.

Typed values are merged over the stored ones, the title and expiry are recomputed, and an entry is appended to the certificate's history recording who changed what. Fires `fluent_community/certificate/manual_updated` with the list of changed areas.

## Endpoint

- **Method:** `PUT`
- **Path:** `/admin/certificates/issued/{id}/manual`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ManualCertificateController@updateManual`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:35`

- The credential ID, serial and issue date cannot be changed, and an expiry before the issue date is rejected.
- Omitting `values` changes nothing, but omitting `expires_at` clears the expiry.
- Changing the holder email, or linking an account, invalidates any holder link already sent.
- A suspended certificate can be edited; a revoked one cannot.
- No email goes to the holder, and the history keeps only the most recent 50 entries.
- When nothing actually changed the response is still a success, with no history entry written.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="putUpdateManual" specUrl="/openapi/public/certificates/put-update-manual.json" />
