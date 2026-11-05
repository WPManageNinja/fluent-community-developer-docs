---
title: "Delete Template"
description: "Deletes a template, or archives it when certificates were issued from it."
outline: false
aside: false
---

Deletes a template, or archives it when certificates were issued from it.

A template that has issued nothing is deleted along with its version rows. One that has issued certificates is archived instead, keeping the row so those certificates still render. Runs under the global issuing lock, so it cannot race an issue in progress.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/admin/certificates/templates/{id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateTemplateController@deleteTemplate`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:21`

- The response is a message only, and that message is the one thing that says whether the template was deleted or archived. Re-read the list if the difference matters.
- Refused with 422 while any course has certificates enabled with this template; the message names those courses.
- The in-use check looks only at courses with certificates switched on, so a disabled course can keep a dangling template ID and will not block deletion.
- Archiving does not touch certificates already issued.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="deleteTemplate" specUrl="/openapi/public/certificates/delete-template.json" />
