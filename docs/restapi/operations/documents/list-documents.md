---
title: List Documents
description: "Returns the paginated document posts of one space, newest first, each with its author and topics attached."
outline: false
aside: false
---

Returns the paginated document posts of one space, newest first, each with its author and topics attached.

`space_id` is required. Filter with `search` and an optional `search_in` list of columns. Only posts whose content type is `document` and whose status is `published` or `unlisted` are listed.

## Endpoint

- **Method:** `GET`
- **Path:** `/documents`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `DocumentController@index`
- **Route source:** `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:41`

- Requires the `can_view_documents` permission in the space; failure comes back as an error carrying `permission_failed`.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listDocuments" specUrl="/openapi/public/documents/list-documents.json" />
