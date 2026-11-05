---
title: "Post Publish Template"
description: "Publishes the current draft as a new, immutable template version."
outline: false
aside: false
---

Publishes the current draft as a new, immutable template version.

Publishing copies the working design into a version row and points the template at it, so a later edit never changes a certificate that was already issued from that template. The template becomes active at the same time.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/certificates/templates/{id}/publish`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateTemplateController@publishTemplate`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:20`

- Not idempotent: every call writes a new version even when nothing changed.
- Version numbers are derived from the versions already stored, so an interrupted publish never reuses one.
- An archived template is refused — restore it first.
- Versions are never edited or deleted, and there is no endpoint that rolls a template back to an earlier one.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postPublishTemplate" specUrl="/openapi/public/certificates/post-publish-template.json" />
