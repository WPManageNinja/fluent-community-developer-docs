---
title: Post Bulk Import Students
description: "Imports students into a course from submitted rows, creating WordPress users for addresses that do not yet exist."
outline: false
aside: false
---

Imports students into a course from submitted rows, creating WordPress users for addresses that do not yet exist.

The response reports per-batch counts so a large import can be driven in chunks from the client.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/students/bulk-import`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `BulkMembersController@bulkImportStudents`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:116`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/BulkMembersController.php`

- Requires a course admin for this course.
- Requires FluentCommunity Pro.
- Can create new WordPress user accounts and, depending on the payload, send them welcome email.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postBulkImportStudents" specUrl="/openapi/public/courses/post-bulk-import-students.json" />
