---
title: "Post Allow Extra Attempt"
description: "Gives one student one more attempt at a quiz."
outline: false
aside: false
---

Gives one student one more attempt at a quiz.

Adds a single attempt to that student's own result row, on top of the quiz's limit. Takes no parameters: the result row identifies both the student and the quiz.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/quiz-results/{quiz_id}/extra-attempt`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@allowExtraAttempt`
- **Route source:** `fluent-community-pro/app/Modules/Quiz/Http/quiz_api.php:17`

- Each call adds another attempt, so calling it twice grants two.
- The student's result row has to exist, so an extra attempt cannot be granted before their first submission.
- The student is not told: no notification and no email.
- On a quiz with no attempt limit the allowance is recorded but changes nothing.
- There is one result row per student per quiz, so when the extra attempt is used it overwrites the previous answers — no attempt history is kept.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postAllowExtraAttempt" specUrl="/openapi/public/courses/post-allow-extra-attempt.json" />
