---
title: "Get List Templates"
description: "Lists every certificate template with its publishing state and how many certificates it has issued."
outline: false
aside: false
---

Lists every certificate template with its publishing state and how many certificates it has issued.

Not paginated and not filtered: drafts and archived templates come back alongside active ones, so the caller filters on `status` itself. Pass `with_design=yes` to include each full design with image IDs resolved to URLs.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/certificates/templates`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateTemplateController@listTemplates`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:16`

- This is the one template route a course creator can call, so they can choose a template for their own course. Every other template route is admin-only.
- `has_draft_changes` means the working copy differs from the published version.
- The issued count includes manual certificates, not only course ones.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getListTemplates" specUrl="/openapi/public/certificates/get-list-templates.json" />
