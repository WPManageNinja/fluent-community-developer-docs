---
title: "Get Review Settings"
description: "Returns the site-wide review defaults applied to new courses, with the field definitions the settings form draws."
outline: false
aside: false
---

Returns the site-wide review defaults applied to new courses, with the field definitions the settings form draws.

Community administrators only — a course creator who can moderate reviews cannot read these. A site that has never saved them gets the shipped defaults: reviews off, enrolment-based eligibility, 25% minimum progress, breakdown shown.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/course-reviews/settings`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\CourseReview\Http\Controllers\CourseReviewAdminController@getSettings`
- **Route source:** `fluent-community-pro/app/Modules/CourseReview/Http/course_review_api.php:21`

- `fields` is there to render the form and is not a schema contract; `settings` only ever carries the four known keys.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getReviewSettings" specUrl="/openapi/public/course-reviews/get-review-settings.json" />
