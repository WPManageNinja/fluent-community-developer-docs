---
title: Upload Document
description: "Uploads a document file into a space document library, or — when `lesson_id` is given — attaches it directly to a course lesson."
outline: false
aside: false
---

Uploads a document file into a space document library, or — when `lesson_id` is given — attaches it directly to a course lesson.

Files are stored privately and served through a download route rather than a public URL. A space upload is created as draft media that the cleanup cron removes within two hours unless a post adopts it, while a lesson upload is activated immediately and appended to the lesson document list.

## Endpoint

- **Method:** `POST`
- **Path:** `/documents/upload`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `DocumentController@upload`
- **Route source:** `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:42`

- The space route requires the `can_upload_documents` permission in that space; the lesson route requires course-admin access to the course that owns the lesson.
- Requires FluentCommunity Pro.

::: tip Reconstructed sample
This endpoint belongs to a module that is not active on the reference install (or needs a file upload), so the payload below was reconstructed by reading the controller rather than recorded. Field names and types follow the source; values are illustrative.
:::

<OAOperation operationId="uploadDocument" specUrl="/openapi/public/documents/upload-document.json" />
