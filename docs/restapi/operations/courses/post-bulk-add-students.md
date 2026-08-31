---
title: Post Bulk Add Students
description: "Enrols many users in a course in one call, either from an explicit id list or by copying the membership of another space or course in batches."
outline: false
aside: false
---

Enrols many users in a course in one call, either from an explicit id list or by copying the membership of another space or course in batches.

Send up to 500 ids in `user_ids`; larger payloads are rejected with a 413 so the client must chunk them. With no ids the request is treated as a source-copy batch and the response reports how many were added, skipped and failed so the client can resume from the returned offset.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/students/bulk-add`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `BulkMembersController@bulkAddStudents`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:118`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/BulkMembersController.php`

- Requires a course admin for this course.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postBulkAddStudents" specUrl="/openapi/public/courses/post-bulk-add-students.json" />
