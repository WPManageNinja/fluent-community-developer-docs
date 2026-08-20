---
title: Update Course Quiz Result
description: "Overrides the pass or fail grade recorded against one quiz attempt."
outline: false
aside: false
---

Overrides the pass or fail grade recorded against one quiz attempt.

`status` must be `passed` or `failed`; nothing else is accepted, and the score itself is left unchanged.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/quiz-results/{quiz_id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@updateQuizResult`
- **Route source:** `fluent-community-pro/app/Modules/Quiz/Http/quiz_api.php:14`

- Requires a course admin for this course, or a WordPress user with `manage_options`.
- Requires FluentCommunity Pro with the Quiz module.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateCourseQuizResult" specUrl="/openapi/public/courses/update-course-quiz-result.json" />
