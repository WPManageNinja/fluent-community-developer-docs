---
title: "Post Start Quiz"
description: "Starts a quiz attempt and returns its questions, with the attempt's timer when the quiz is timed."
outline: false
aside: false
---

Starts a quiz attempt and returns its questions, with the attempt's timer when the quiz is timed.

The questions come back without their answer key: the blanks, the matching pairs and the correct options are stripped, and ordering options are shuffled. A timed quiz also returns when the attempt started, when it is due and the server time, so the client can show a countdown against the server rather than the device clock.

## Endpoint

- **Method:** `POST`
- **Path:** `/courses/{course_id}/lessons/{lesson_id}/quiz/start`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@startQuiz`
- **Route source:** `fluent-community-pro/app/Modules/Quiz/Http/quiz_api.php:9`

- The caller must be enrolled in the course, the lesson must be published, and the student must have an attempt left.
- Starting does not consume an attempt — only a submit does.
- Calling it again returns the attempt already in progress, including one whose deadline has passed, so that reloading the page cannot buy more time. The client is expected to submit it, and the submission is marked as over time.
- A quiz with no time limit returns a null timer.
- The time limit is clamped to 1-600 minutes, and a submission gets a 60-second grace period.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postStartQuiz" specUrl="/openapi/public/courses/post-start-quiz.json" />
