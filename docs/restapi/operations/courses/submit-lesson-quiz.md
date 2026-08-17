---
title: Submit Lesson Quiz
description: "Submit Lesson Quiz for the FluentCommunity Courses API."
outline: false
aside: false
---
## Endpoint

- **Method:** `POST`
- **Path:** `/courses/{course_id}/lessons/{lesson_id}/quiz/submit`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@submitQuiz`
- **Route source:** `fluent-community-pro/app/Modules/Quiz/Http/quiz_api.php:8`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="submitLessonQuiz" specUrl="/openapi/public/courses/submit-lesson-quiz.json" />
