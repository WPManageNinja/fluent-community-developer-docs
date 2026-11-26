---
title: "List Course Reviews"
description: "Returns a course's reviews, its rating summary, and what the caller may do with them."
outline: false
aside: false
---

Returns a course's reviews, its rating summary, and what the caller may do with them.

What comes back depends on how much the caller may see. A member of the course, a course admin, or anyone on a public course gets the full list; someone outside a private course gets the summary alone, with an empty list and `can_view_list` false, which is what the lock screen draws. Only approved reviews are listed.

## Endpoint

- **Method:** `GET`
- **Path:** `/courses/{course_id}/reviews`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\CourseReview\Http\Controllers\CourseReviewController@getReviews`
- **Route source:** `fluent-community-pro/app/Modules/CourseReview/Http/course_review_api.php:8`

- `my_review` is returned without a status filter, so the author sees their own review even while it is held for moderation and even when the list itself is hidden. Read its `status` rather than assuming it is live.
- A course with reviews switched off answers 404, exactly like a course the caller may not see — the two are deliberately indistinguishable.
- The `rating` filter is ignored on a course that hides its breakdown, and `sort` only understands `highest` and `lowest`; anything else keeps newest first.
- Reading is open to a guest when the community's access level is public.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="listCourseReviews" specUrl="/openapi/public/course-reviews/list-course-reviews.json" />
