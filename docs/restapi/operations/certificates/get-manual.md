---
title: "Get Manual"
description: "Returns one manual certificate with its fields, design, values and edit history."
outline: false
aside: false
---

Returns one manual certificate with its fields, design, values and edit history.

What the edit form loads. The fields and design reflect the version the certificate was issued from; pass `latest=yes` to see them as the template's current version would render them instead. Includes the linked account when there is one.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/certificates/issued/{id}/manual`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ManualCertificateController@getManual`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:34`

- `latest_version` is 0 when nothing newer exists, so read it as a "newer version available" flag rather than the current version.
- The history is newest first and always ends with the original issue entry. Authors appear as display names, and an author whose account is gone shows as empty.
- A course certificate's ID answers 404 here.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getManual" specUrl="/openapi/public/certificates/get-manual.json" />
