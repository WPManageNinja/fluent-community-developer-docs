---
title: "Get Mine Detail"
description: "Returns one of the caller's own certificates, including everything needed to render it."
outline: false
aside: false
---

Returns one of the caller's own certificates, including everything needed to render it.

Adds a `render` block to the summary: the published template design with image IDs resolved to URLs, the merge values frozen at issue time, and the verification URL for the QR code. The lookup is scoped to the caller, so another member's credential ID reads as missing.

## Endpoint

- **Method:** `GET`
- **Path:** `/certificates/mine/{credential}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateController@mineDetail`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:49`

- The owner gets the full design — elements the template hides and merge values it never prints are both present, unlike the public verification payload.
- `render` is `null` when the published template version it points at no longer exists. That is still a 200.
- A revoked certificate returns 404 here, the same as an unknown ID.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getMineDetail" specUrl="/openapi/public/certificates/get-mine-detail.json" />
