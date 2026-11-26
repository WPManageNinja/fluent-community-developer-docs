---
title: "List Reviewed Courses"
description: "Lists the courses that have reviews, worst-rated first."
outline: false
aside: false
---

Lists the courses that have reviews, worst-rated first.

Built from the stored rating summaries rather than from the reviews themselves, so a course with no approved review never appears. The order is deliberate: the lowest average comes first, so the courses that need attention are on the first page.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/course-reviews/courses`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\CourseReview\Http\Controllers\CourseReviewAdminController@getCourses`
- **Route source:** `fluent-community-pro/app/Modules/CourseReview/Http/course_review_api.php:16`

- The breakdown is returned whatever the course's own display setting says, because this is an admin view.
- Paging happens in PHP over the whole in-scope set, so this is not a cheap endpoint on a site with many courses.
- The payload has no `last_page`, unlike the review list beside it.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="listReviewedCourses" specUrl="/openapi/public/course-reviews/list-reviewed-courses.json" />
