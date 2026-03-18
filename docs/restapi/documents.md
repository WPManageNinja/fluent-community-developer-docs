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

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/documents` | <span class="pro-badge">PRO</span> | [List Documents](/restapi/operations/documents/list-documents) | `DocumentController@index` |
| `POST` | `/documents/upload` | <span class="pro-badge">PRO</span> | [Upload Document](/restapi/operations/documents/upload-document) | `DocumentController@upload` |
| `POST` | `/documents/update` | <span class="pro-badge">PRO</span> | [Update Document](/restapi/operations/documents/update-document) | `DocumentController@updateDocument` |
| `POST` | `/documents/delete` | <span class="pro-badge">PRO</span> | [Delete Document](/restapi/operations/documents/delete-document) | `DocumentController@deleteDocument` |
