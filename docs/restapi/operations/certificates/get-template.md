---
title: "Get Template"
description: "Returns one template with its working design."
outline: false
aside: false
---

Returns one template with its working design.

The design here is the draft copy, which is what the editor loads — not necessarily what new certificates currently use. Admins only, so a course creator who can list templates cannot open one.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/certificates/templates/{id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateTemplateController@getTemplate`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:18`

- The issued count is always 0 on this route by construction, so do not read it as "never issued" — the list endpoint is where that number is real.
- An ID belonging to some other kind of row answers 404 just like an unknown one.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getTemplate" specUrl="/openapi/public/certificates/get-template.json" />
