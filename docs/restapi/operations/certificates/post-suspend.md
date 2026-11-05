---
title: "Post Suspend"
description: "Suspends a certificate, so verification reports it as not currently in force."
outline: false
aside: false
---

Suspends a certificate, so verification reports it as not currently in force.

Reversible, unlike revoking. The optional `reason` is stored with who changed it and when. Runs under a per-certificate lock on a freshly read row, and fires `fluent_community/certificate/suspended`, which clears the badge status-list cache.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/certificates/issued/{id}/suspend`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateAdminController@suspend`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:25`

- Only a certificate in the `issued` state can be suspended; a repeat call answers 422.
- A suspended certificate also blocks automatic re-issuing for that course until it is reinstated.
- No email is sent on a status change.
- Manual certificates use this same endpoint.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postSuspend" specUrl="/openapi/public/certificates/post-suspend.json" />
