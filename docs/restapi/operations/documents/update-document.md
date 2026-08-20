---
title: Update Document
description: "Renames a document, updating both the media record and the entry in the parent post or lesson document list."
outline: false
aside: false
---

Renames a document, updating both the media record and the entry in the parent post or lesson document list.

Only the display title changes; the stored file and its real extension are untouched, so a rename cannot change the served file type.

## Endpoint

- **Method:** `POST`
- **Path:** `/documents/update`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `DocumentController@updateDocument`
- **Route source:** `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:43`

- Lesson documents require course-admin access; space documents require the `can_upload_documents` permission in that space, or ownership of the upload where it is not yet attached to a post.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateDocument" specUrl="/openapi/public/documents/update-document.json" />
