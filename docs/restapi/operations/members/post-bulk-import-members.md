---
title: Post Bulk Import Members
description: "Imports members into a space from submitted rows, creating WordPress users for addresses that do not yet exist."
outline: false
aside: false
---

Imports members into a space from submitted rows, creating WordPress users for addresses that do not yet exist.

The response reports per-batch counts so a large import can be driven in chunks from the client.

## Endpoint

- **Method:** `POST`
- **Path:** `/spaces/{spaceSlug}/members/bulk-import`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `BulkMembersController@bulkImportMembers`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:122`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/BulkMembersController.php`

- Requires the `can_add_member` permission in this space.
- Requires FluentCommunity Pro.
- Can create new WordPress user accounts and, depending on the payload, send them welcome email.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postBulkImportMembers" specUrl="/openapi/public/members/post-bulk-import-members.json" />
