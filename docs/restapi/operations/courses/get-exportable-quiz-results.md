---
title: Get Exportable Quiz Results
description: "Returns a flattened, spreadsheet-shaped list of quiz attempts for a course — student, email, quiz, score, grade, attempt count and submission time."
outline: false
aside: false
---

Returns a flattened, spreadsheet-shaped list of quiz attempts for a course — student, email, quiz, score, grade, attempt count and submission time.

Capped at 5000 rows and filterable with the same `search` and `filter_by` values as the paginated listing.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/export/quiz-results`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@getExportableQuizResults`
- **Route source:** `fluent-community-pro/app/Modules/Quiz/Http/quiz_api.php:15`

- Requires a course admin for this course, or a WordPress user with `manage_options`.
- Requires FluentCommunity Pro with the Quiz module; the response includes member email addresses.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getExportableQuizResults" specUrl="/openapi/public/courses/get-exportable-quiz-results.json" />
