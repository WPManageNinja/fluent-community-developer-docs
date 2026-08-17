---
title: Get Lesson Quiz Result
description: "Returns the current user stored result for one quiz lesson, or null if they have not attempted it."
outline: false
aside: false
---

Returns the current user stored result for one quiz lesson, or null if they have not attempted it.

When the quiz has `hide_result` set, the correct answers are stripped from the stored result before it is returned.

## Endpoint

- **Method:** `GET`
- **Path:** `/courses/{course_id}/lessons/{lesson_id}/quiz/result`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@getQuizResult`
- **Route source:** `fluent-community-pro/app/Modules/Quiz/Http/quiz_api.php:9`

- Requires the caller to be enrolled in the course.
- Requires FluentCommunity Pro with the Quiz module.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getLessonQuizResult" specUrl="/openapi/public/courses/get-lesson-quiz-result.json" />
