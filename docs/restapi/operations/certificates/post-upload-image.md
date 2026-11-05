---
title: "Post Upload Image"
description: "Uploads a logo, signature or background image for use in a template design."
outline: false
aside: false
---

Uploads a logo, signature or background image for use in a template design.

A multipart upload under the field name `file`, stored as a normal WordPress media attachment; designs then reference the attachment ID rather than a URL, so offloading plugins keep working. Returns the new ID and its URL.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/certificates/images`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateTemplateController@uploadImage`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:22`

- JPG, PNG and WebP only. SVG is deliberately not accepted, and the type is checked against the real file rather than its name.
- The limit is 5 MB, adjustable with `fluent_community/certificate/max_image_bytes` — but PHP's own upload limits apply first, and hitting those produces the "no upload file was received" error instead.
- Uploads are never cleaned up automatically: deleting a template leaves its images in the media library.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postUploadImage" specUrl="/openapi/public/certificates/post-upload-image.json" />
