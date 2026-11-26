---
title: "Delete Course Review"
description: "Deletes one review, as its author or as a course admin."
outline: false
aside: false
---

Deletes one review, as its author or as a course admin.

The author may always delete their own review, including one that is held or hidden. A course admin may delete only an approved review — a held one belongs to the moderation queue instead. Deleting also removes the review's moderation reports and recomputes the course's rating summary.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/courses/{course_id}/reviews/{review_id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\CourseReview\Http\Controllers\CourseReviewController@deleteReview`
- **Route source:** `fluent-community-pro/app/Modules/CourseReview/Http/course_review_api.php:10`

- A review ID that belongs to another course answers 404.
- `can_review` and `review_prompt` come back as null when an admin deletes somebody else's review, and carry fresh values when an author deletes their own.
- A review that was never live fires no deletion hook.
- Sent as POST with `X-HTTP-Method-Override: DELETE` by the plugin's own client.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="deleteCourseReview" specUrl="/openapi/public/course-reviews/delete-course-review.json" />
