---
title: "List All Reviews"
description: "Lists reviews across the courses the calling admin manages, for the moderation screen."
outline: false
aside: false
---

Lists reviews across the courses the calling admin manages, for the moderation screen.

Scoped to the caller's own courses unless they manage every space. Unlike the student-facing list this one includes held and hidden reviews, and it includes reviews on courses whose reviews are switched off, so that they can still be cleared out. Filter by course or rating, and search the review text or the author's display name.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/course-reviews`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\CourseReview\Http\Controllers\CourseReviewAdminController@getReviews`
- **Route source:** `fluent-community-pro/app/Modules/CourseReview/Http/course_review_api.php:15`

- The rows are a reduced shape — id, rating, message, status, created date, author and a small course object — not the review model, so deleting from this screen needs the course ID from the row.
- An unknown or out-of-scope `course_id` returns an empty list rather than an error.
- `per_page` is clamped to 150, and the course list for the filter is only included when `with_courses` is sent.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="listAllReviews" specUrl="/openapi/public/course-reviews/list-all-reviews.json" />
