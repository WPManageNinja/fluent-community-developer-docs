---
title: "Post Revoke"
description: "Revokes a certificate permanently."
outline: false
aside: false
---

Revokes a certificate permanently.

Terminal: no endpoint undoes it. The optional `reason` is stored alongside who revoked it and when, and `fluent_community/certificate/revoked` clears the badge status-list cache.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/certificates/issued/{id}/revoke`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateAdminController@revoke`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:27`

- Revoking also stops the course issuing that holder a new certificate, even if they complete the course again.
- A revoked certificate drops out of the holder's own lists and answers 404 on their detail endpoint, while remaining visible to admins.
- The public status list reports revoked and suspended the same way; only verification tells them apart.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postRevoke" specUrl="/openapi/public/certificates/post-revoke.json" />
