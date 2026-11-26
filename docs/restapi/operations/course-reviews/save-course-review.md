---
title: "Save Course Review"
description: "Creates or updates the caller's review of a course."
outline: false
aside: false
---

Creates or updates the caller's review of a course.

One review per member per course: a second call overwrites the first rather than failing, and the message in the response is the only signal of which happened. The rating is required and clamped to 1-5, the message is optional and capped at 5000 characters, and both are stored with a rendered copy. The whole write runs under a per-course lock, so a rating and its summary can never race.

## Endpoint

- **Method:** `POST`
- **Path:** `/courses/{course_id}/reviews`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\CourseReview\Http\Controllers\CourseReviewController@saveReview`
- **Route source:** `fluent-community-pro/app/Modules/CourseReview/Http/course_review_api.php:9`

- Eligibility is checked again on an edit, so a member who has since left the course gets 403 when saving — though they can still delete.
- When the course requires progress, the author keeps the right to edit once they have reviewed, even if their progress later falls short.
- Content moderation can hold a review: it is saved as pending, left out of the list and out of the average, and reported to the moderation queue. An edit can hold a review but never release one.
- A held save fires no hook. `fluent_community/course_review/created` arrives later, when a moderator approves it.
- A busy course lock answers 409, which is a different problem from the 403 an ineligible member gets.
- A text-only edit does not recompute the course average, by design.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="saveCourseReview" specUrl="/openapi/public/course-reviews/save-course-review.json" />
