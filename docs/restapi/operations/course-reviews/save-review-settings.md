---
title: "Save Review Settings"
description: "Saves the site-wide review defaults for new courses."
outline: false
aside: false
---

Saves the site-wide review defaults for new courses.

Everything is sanitised rather than validated, so an unknown value falls back to its default instead of failing: the two switches accept only the exact strings `yes` and `no`, eligibility accepts only `enrolled` or `progress`, and the minimum progress is capped at 100 and falls back to 25.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/course-reviews/settings`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\CourseReview\Http\Controllers\CourseReviewAdminController@saveSettings`
- **Route source:** `fluent-community-pro/app/Modules/CourseReview/Http/course_review_api.php:22`

- These defaults apply only to courses created afterwards. No existing course changes, and a course that already carries its own configuration is never touched.
- Duplicating a course does not copy its review configuration, so the duplicate picks up whatever the defaults say at that moment.
- A missing or malformed body is not an error: it stores the sanitised defaults.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="saveReviewSettings" specUrl="/openapi/public/course-reviews/save-review-settings.json" />
