---
title: "Post Schedule Students"
description: "Enrolls students in a course with a start date, so their access opens later."
outline: false
aside: false
---

Enrolls students in a course with a start date, so their access opens later.

Takes a list of user IDs and a `starts_at` timestamp in site time, formatted exactly as `Y-m-d H:i:s`. A future date creates a scheduled enrollment and fires `fluent_community/course/enrollment_scheduled`. A date that has already passed enrolls the member immediately and keeps that date as the anchor the lesson drip counts from.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/students/schedule`
- **Edition:** Core
- **Controller:** `CourseAdminController@scheduleStudents`
- **Route source:** `fluent-community/Modules/Course/Http/course_api.php:31`
- **Controller source:** `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php`

- The response is always the bulk shape — added, skipped, failed and processed — with no per-member detail. Per-member problems are counted rather than raised.
- An existing active enrollment is never touched: no new date, no re-enrollment, counted as skipped. That is deliberate, so a renewal cannot restart the drip.
- Re-scheduling a member who is already scheduled moves the date and fires the scheduled hook again.
- Scheduled members are not students yet. They are left out of the student count, the course cards and Insights, and appear only in the admin list, marked as not open yet.
- Access opens on an hourly sweep or on the member's own next visit, so the enrolled hook can fire up to an hour after the start time.
- Bulk scheduling needs Pro; without it only a single ID is accepted. At most 500 IDs per request, and that check runs after the Pro check — so a free site sending 600 IDs is told about Pro, not about the limit.
- When nothing was added, the `message` carries the reason inside a 200 response, for the single-member form.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postScheduleStudents" specUrl="/openapi/public/courses/post-schedule-students.json" />
