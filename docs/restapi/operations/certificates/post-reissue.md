---
title: "Post Reissue"
description: "Rebuilds a course certificate from today's course and member details, onto the template's current version."
outline: false
aside: false
---

Rebuilds a course certificate from today's course and member details, onto the template's current version.

Merge values are resolved again and the certificate is moved to the newest published version of its template, keeping the original completion date. The credential ID, serial, issue date and expiry all stay, so links, QR codes and LinkedIn entries keep working. The cached preview image is dropped so it regenerates.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/certificates/issued/{id}/reissue`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateAdminController@reissue`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:28`

- This is the only way to pull an existing certificate onto a newer template version.
- It does not extend expiry — a certificate that has expired stays expired.
- Manual certificates are refused with 422; edit them instead. Revoked ones are refused too, while a suspended one can be reissued.
- Refused with 422 when the template is no longer published.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postReissue" specUrl="/openapi/public/certificates/post-reissue.json" />
