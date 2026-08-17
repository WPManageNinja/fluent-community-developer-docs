---
title: Documents API
description: Document library upload, listing, update, delete, and download-related portal endpoints.
---

# Documents API

Document library upload, listing, update, delete, and download-related portal endpoints.

<span class="pro-badge">PRO</span>

## Authentication

Document routes are portal routes and rely on `PortalPolicy` plus per-document access checks in the Pro module.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/documents` | <span class="pro-badge">PRO</span> | [List Documents](/restapi/operations/documents/list-documents) | Returns the paginated document posts of one space, newest first, each with its author and topics attached. |
| `POST` | `/documents/upload` | <span class="pro-badge">PRO</span> | [Upload Document](/restapi/operations/documents/upload-document) | Uploads a document file into a space document library, or — when \`lesson_id\` is given — attaches it directly to a course lesson. |
| `POST` | `/documents/update` | <span class="pro-badge">PRO</span> | [Update Document](/restapi/operations/documents/update-document) | Renames a document, updating both the media record and the entry in the parent post or lesson document list. |
| `POST` | `/documents/delete` | <span class="pro-badge">PRO</span> | [Delete Document](/restapi/operations/documents/delete-document) | Detaches a document from its post or lesson and hands the media record to the media cleanup hook. |
