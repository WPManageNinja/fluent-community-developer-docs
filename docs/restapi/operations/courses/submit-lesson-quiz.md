---
title: Submit Lesson Quiz
description: "Grades a quiz lesson submission, stores the attempt and returns the per-question result with the score."
outline: false
aside: false
---

Grades a quiz lesson submission, stores the attempt and returns the per-question result with the score.

Answers are keyed by question slug in `answers`; unanswered questions are skipped rather than marked wrong. Written answers are length-capped at 500 characters for exact-match grading and 10 000 otherwise. The caller must be enrolled and the quiz lesson must be published.

## Endpoint

- **Method:** `POST`
- **Path:** `/courses/{course_id}/lessons/{lesson_id}/quiz/submit`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@submitQuiz`
- **Route source:** `fluent-community-pro/app/Modules/Quiz/Http/quiz_api.php:8`

- Requires FluentCommunity Pro with the Quiz module.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="submitLessonQuiz" specUrl="/openapi/public/courses/submit-lesson-quiz.json" />
