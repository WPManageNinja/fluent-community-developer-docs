---
title: Post Duplicate Lesson
description: "Copies a lesson, inserts the copy directly after the original and renumbers the rest of the section."
outline: false
aside: false
---

Copies a lesson, inserts the copy directly after the original and renumbers the rest of the section.

The copy takes a "(Copy)" suffix, incremented if that title is already used in the section, and gets a fresh slug. Attached documents are copied too. Every sibling lesson is renumbered so the new ordering is contiguous.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/lessons/{lesson_id}/duplicate`
- **Edition:** Core
- **Controller:** `CourseAdminController@duplicateLesson`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:60`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- Requires a course admin for this course, or a WordPress user with `manage_options`.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postDuplicateLesson" specUrl="/openapi/public/courses/post-duplicate-lesson.json" />
