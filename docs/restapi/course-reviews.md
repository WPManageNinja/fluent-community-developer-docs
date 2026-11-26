---
title: "Course Reviews API"
description: "Student reviews on a course, the moderation queue across the courses an admin manages, and the site-wide defaults for new courses."
---

# Course Reviews API

Student reviews on a course, the moderation queue across the courses an admin manages, and the site-wide defaults for new courses.

<span class="pro-badge">PRO</span>

## Authentication

The student routes use `PortalPolicy` and are checked again inside the controller against enrolment and the course's own review settings. The moderation routes use `CourseAdminPolicy`, so a course creator sees their own courses, while the site-wide defaults are community-admin only.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/courses/{course_id}/reviews` | <span class="pro-badge">PRO</span> | [List Course Reviews](/restapi/operations/course-reviews/list-course-reviews) | Returns a course's reviews, its rating summary, and what the caller may do with them. |
| `POST` | `/courses/{course_id}/reviews` | <span class="pro-badge">PRO</span> | [Save Course Review](/restapi/operations/course-reviews/save-course-review) | Creates or updates the caller's review of a course. |
| `DELETE` | `/courses/{course_id}/reviews/{review_id}` | <span class="pro-badge">PRO</span> | [Delete Course Review](/restapi/operations/course-reviews/delete-course-review) | Deletes one review, as its author or as a course admin. |
| `GET` | `/admin/course-reviews` | <span class="pro-badge">PRO</span> | [List All Reviews](/restapi/operations/course-reviews/list-all-reviews) | Lists reviews across the courses the calling admin manages, for the moderation screen. |
| `GET` | `/admin/course-reviews/courses` | <span class="pro-badge">PRO</span> | [List Reviewed Courses](/restapi/operations/course-reviews/list-reviewed-courses) | Lists the courses that have reviews, worst-rated first. |
| `GET` | `/admin/course-reviews/settings` | <span class="pro-badge">PRO</span> | [Get Review Settings](/restapi/operations/course-reviews/get-review-settings) | Returns the site-wide review defaults applied to new courses, with the field definitions the settings form draws. |
| `POST` | `/admin/course-reviews/settings` | <span class="pro-badge">PRO</span> | [Save Review Settings](/restapi/operations/course-reviews/save-review-settings) | Saves the site-wide review defaults for new courses. |
