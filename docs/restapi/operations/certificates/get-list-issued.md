---
title: "Get List Issued"
description: "Lists issued course certificates for administrators, with search and filters."
outline: false
aside: false
---

Lists issued course certificates for administrators, with search and filters.

Each row carries the credential ID, serial, stored and computed status, the holder, the course, the template and version, the source, and who changed the status when. Filter by course or stored status, and search by exact credential ID or by holder name or email.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/certificates/issued`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateAdminController@listIssued`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:24`

- Manual certificates never appear here — they have their own list.
- `status` is the stored state (`issued`, `suspended`, `revoked`) while `verification` is the computed one and can also be `expired`.
- Searching by email only matches certificates that have an account linked.
- `per_page` defaults to 20 and is clamped to 1-100.
- Course creators cannot call this, even for their own course; it is admins only.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getListIssued" specUrl="/openapi/public/certificates/get-list-issued.json" />
