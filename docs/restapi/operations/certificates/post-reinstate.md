---
title: "Post Reinstate"
description: "Returns a suspended certificate to force."
outline: false
aside: false
---

Returns a suspended certificate to force.

The inverse of suspending, and the only way back. Clears the stored reason and fires `fluent_community/certificate/reinstated`, which clears the badge status-list cache.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/certificates/issued/{id}/reinstate`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateAdminController@reinstate`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:26`

- Only a suspended certificate can be reinstated; anything else answers 422.
- A revoked certificate cannot be reinstated — that state is final.
- Any `reason` sent is ignored here.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postReinstate" specUrl="/openapi/public/certificates/post-reinstate.json" />
