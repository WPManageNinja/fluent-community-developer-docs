---
title: List Course Quiz Results
description: "Returns the paginated quiz attempts across a whole course, each with the student profile and the lesson attached."
outline: false
aside: false
---

Returns the paginated quiz attempts across a whole course, each with the student profile and the lesson attached.

`search` matches student name, username or quiz title. `filter_by` accepts `passed`, `failed` or `published`; the client value `n/a` is mapped to `published`, which is the ungraded state.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/quiz-results`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@getCourseQuizResults`
- **Route source:** `fluent-community-pro/app/Modules/Quiz/Http/quiz_api.php:13`

- Requires a course admin for this course, or a WordPress user with `manage_options`.
- Requires FluentCommunity Pro with the Quiz module.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listCourseQuizResults" specUrl="/openapi/public/courses/list-course-quiz-results.json" />
