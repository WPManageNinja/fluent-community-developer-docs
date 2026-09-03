---
title: Get Exportable Students
description: "Returns a flattened, spreadsheet-shaped list of a course roster — name, email, username, progress percentage, enrolment date and last activity."
outline: false
aside: false
---

Returns a flattened, spreadsheet-shaped list of a course roster — name, email, username, progress percentage, enrolment date and last activity.

Capped at 5000 students in a single call and filterable with `search`. Progress is calculated in bulk for the whole page rather than per student.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/export/students`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@getExportableStudents`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:25`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.
- Requires FluentCommunity Pro.
- The response includes member email addresses.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getExportableStudents" specUrl="/openapi/public/admin/get-exportable-students.json" />
