---
title: Delete Document
description: "Detaches a document from its post or lesson and hands the media record to the media cleanup hook."
outline: false
aside: false
---

Detaches a document from its post or lesson and hands the media record to the media cleanup hook.

The controller removes the entry from the parent document list and fires `fluent_community/feed/media_deleted`; the listeners on that hook are what actually delete the row and the underlying file, including from cloud storage. Removing the last document from a post also switches that post content type back from `document` to `text`.

## Endpoint

- **Method:** `POST`
- **Path:** `/documents/delete`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `DocumentController@deleteDocument`
- **Route source:** `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:44`

- Lesson documents require course-admin access; space documents require the `can_upload_documents` permission in that space, or ownership of an unattached upload.
- Requires FluentCommunity Pro.
- The space check is on upload rights rather than authorship, so any member who can upload to a space can delete documents uploaded by others.
- Destructive: the file is removed from storage, and the parent post can silently change type as a result.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteDocument" specUrl="/openapi/public/documents/delete-document.json" />
