---
title: "Put Update Template"
description: "Renames a template, saves its design, or restores it from archived."
outline: false
aside: false
---

Renames a template, saves its design, or restores it from archived.

Every field is optional and only the ones sent are touched. Saving a design updates the draft and flags the template as having unpublished changes; certificates already issued are unaffected, because each points at a frozen version. Runs under a per-template lock on a freshly read row.

## Endpoint

- **Method:** `PUT`
- **Path:** `/admin/certificates/templates/{id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateTemplateController@updateTemplate`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:19`

- This only edits the draft. Nothing changes for new certificates until the template is published.
- `restore=yes` is the only way out of the archived state: the template becomes active again if it has a published version, and a draft otherwise.
- A title sent as an empty string is rejected, while omitting it leaves the title alone.
- Returns 422 when another request holds the template lock.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="putUpdateTemplate" specUrl="/openapi/public/certificates/put-update-template.json" />
