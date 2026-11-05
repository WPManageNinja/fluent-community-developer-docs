---
title: "Post Grade Quiz Result"
description: "Grades the written answers of one submitted quiz result and recomputes its score and pass state."
outline: false
aside: false
---

Grades the written answers of one submitted quiz result and recomputes its score and pass state.

Send points and optional feedback per question slug. Points are clamped to that question's maximum, feedback is sanitised, and the grader and time are recorded on each answer. Everything else in the quiz was graded automatically at submit time, so only written answers set to manual grading can be graded here.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/quiz-results/{quiz_id}/grade`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@gradeQuizResult`
- **Route source:** `fluent-community-pro/app/Modules/Quiz/Http/quiz_api.php:16`

- The `{quiz_id}` segment is the ID of the result row, not of the quiz lesson.
- Unknown slugs, automatically graded questions and entries with no numeric `points` are skipped in silence; when nothing could be graded the answer is 422.
- The score and pass state are recomputed against the quiz's current questions and current pass mark, not the ones in force when the student submitted, so changing either between submit and grading can change the outcome.
- An answer given partial credit counts toward the score but still reads as incorrect.
- `fluent_community/quiz/graded` fires, and the student is notified by email, only on the transition out of `pending` — so a regrade of an already-graded result changes the data silently.
- Grading never gives back an attempt, and it never withdraws a lesson completion that an earlier pass already recorded.
- A quiz with no pass mark ends up neither passed nor failed; its result simply stays published.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postGradeQuizResult" specUrl="/openapi/public/courses/post-grade-quiz-result.json" />
