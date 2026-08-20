---
title: Post Bulk Add Members
description: "Adds many users to a space in one call, either from an explicit id list or by copying the membership of another space or course in batches."
outline: false
aside: false
---

Adds many users to a space in one call, either from an explicit id list or by copying the membership of another space or course in batches.

Send up to 500 ids in `user_ids`; larger payloads are rejected with a 413 so the client must chunk them. With no ids the request is treated as a source-copy batch and the response reports added, skipped and failed counts so the client can resume from the returned offset. `role` accepts `member`, `moderator` or `admin`.

## Endpoint

- **Method:** `POST`
- **Path:** `/spaces/{spaceSlug}/members/bulk-add`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `BulkMembersController@bulkAddMembers`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:121`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/BulkMembersController.php`

- Requires the `can_add_member` permission in this space.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postBulkAddMembers" specUrl="/openapi/public/members/post-bulk-add-members.json" />
