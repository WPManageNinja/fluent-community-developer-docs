---
title: Post Resolve CRM Tag Course
description: "Resolves a FluentCRM tag into a page of contacts to enrol in the course, optionally creating WordPress users for contacts that do not have one."
outline: false
aside: false
---

Resolves a FluentCRM tag into a page of contacts to enrol in the course, optionally creating WordPress users for contacts that do not have one.

Requires a valid `tag_id`. Paging is driven by `offset` and `per_page` (clamped between 50 and 500, default 200); `create_missing` controls user creation and `notify_new_users` controls whether new accounts are emailed.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/students/resolve-crm-tag`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `BulkMembersController@resolveCrmTagCourse`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:117`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/BulkMembersController.php`

- Requires a course admin for this course.
- Requires FluentCommunity Pro and an active FluentCRM installation.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postResolveCrmTagCourse" specUrl="/openapi/public/courses/post-resolve-crm-tag-course.json" />
