---
title: "Get List Manual"
description: "Lists manually issued certificates for administrators."
outline: false
aside: false
---

Lists manually issued certificates for administrators.

The counterpart of the issued list, covering certificates an admin created for a person rather than ones a course awarded. Filter by stored status or template, and search by credential ID, title or holder details.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/certificates/manual`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ManualCertificateController@listManual`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:31`

- Admins only, by design: without a course there is nothing to scope a course creator to.
- The holder search runs over the stored metadata as a text match, so an unusual search term can match more than intended.
- `per_page` defaults to 20 and is clamped to 1-100.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getListManual" specUrl="/openapi/public/certificates/get-list-manual.json" />
