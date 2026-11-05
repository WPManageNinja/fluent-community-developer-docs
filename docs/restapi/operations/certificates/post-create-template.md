---
title: "Post Create Template"
description: "Creates a certificate template, either blank or from a supplied design."
outline: false
aside: false
---

Creates a certificate template, either blank or from a supplied design.

A new template is a draft, so it cannot issue anything until it is published. Omit the design and it starts as a blank A4 landscape page. A supplied design is sanitised hard: element types and keys come from a whitelist, numbers are clamped, text is stripped of markup and cut to 500 characters, and images are stored as attachment IDs.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/certificates/templates`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateTemplateController@createTemplate`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:17`

- At most 100 elements, each with an ID of up to 32 characters from `A-Za-z0-9_-`, and no two elements may share an ID.
- A missing or empty title is rejected.
- Each call creates another template; there is no deduplication by title.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postCreateTemplate" specUrl="/openapi/public/certificates/post-create-template.json" />
