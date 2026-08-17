---
title: Courses API
description: Portal course consumption endpoints and the full course administration surface.
---

# Courses API

Portal course consumption endpoints and the full course administration surface.

## Authentication

Course routes are split between `PortalPolicy` and `CourseAdminPolicy` depending on whether the endpoint is a learner or admin flow.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/courses` | Core | [List Courses](/restapi/operations/courses/list-courses) | Returns the paginated course catalogue visible to the current user, each entry carrying its enrolment state, progress, section and lesson counts. |
| `GET` | `/courses/{course_id}` | Core | [Get Course](/restapi/operations/courses/get-course) | Returns one course by numeric id with its sections, the lessons the caller may see, per-lesson lock state and the current progress track. |
| `GET` | `/courses/{course_slug}/by-slug` | Core | [Get Course By Slug](/restapi/operations/courses/get-course-by-slug) | Returns one course by slug with everything \`get-course\` returns, plus the instructor block — the creator profile, their total course count and optionally their total student count. |
| `GET` | `/courses/{course_slug}/lessons/{lesson_slug}/by-slug` | Core | [Get Lesson By Slug](/restapi/operations/courses/get-lesson-by-slug) | Returns a single lesson by course and lesson slug, with its access decision resolved and its body parsed only when the caller may read it. |
| `POST` | `/courses/{course_id}/enroll` | Core | [Enroll Course](/restapi/operations/courses/enroll-course) | Enrols the current user in a course and returns their freshly initialised progress track. |
| `PUT` | `/courses/{course_id}/lessons/{lesson_id}/completion` | Core | [Update Lesson Completion](/restapi/operations/courses/update-lesson-completion) | Marks a lesson complete or incomplete for the current user and returns the recalculated course progress track. |
| `POST` | `/courses/{course_id}/lessons/{lesson_id}/video-watched` | Core | [Post Mark Lesson Video Watched](/restapi/operations/courses/post-mark-lesson-video-watched) | Records that the current user has watched enough of a gated lesson video to be allowed to mark the lesson complete. |
| `DELETE` | `/courses/{course_id}/progress` | Core | [Delete Reset My Progress](/restapi/operations/courses/delete-reset-my-progress) | Clears the current user own completion records for a course and returns an empty progress track, leaving the enrolment in place. |
| `GET` | `/courses/all-courses` | Core | [List All Courses](/restapi/operations/courses/list-all-courses) | Returns the paginated course catalogue with each course fully expanded — sections, per-lesson lock state and the current user progress track — in a single call. |
| `GET` | `/admin/courses` | Core | [List Admin Courses](/restapi/operations/courses/list-admin-courses) | Returns the paginated list of courses the current user may manage, each with its student count and its section and lesson totals. |
| `POST` | `/admin/courses` | Core | [Create Course](/restapi/operations/courses/create-course) | Creates a course in draft state, with its type, privacy, layout and lock screen behaviour set from the submitted settings. |
| `GET` | `/admin/courses/{course_id}` | Core | [Get Admin Course](/restapi/operations/courses/get-admin-course) | Returns one course in its editable form, with the lock screen configuration, the attached category ids and — when it has students — the completion count and average progress. |
| `PUT` | `/admin/courses/{course_id}` | Core | [Update Course](/restapi/operations/courses/update-course) | Updates a course record and its settings block, firing the course-published hook the first time its status crosses into \`published\`. |
| `POST` | `/admin/courses/{course_id}/duplicate` | Core | [Duplicate Course](/restapi/operations/courses/duplicate-course) | Copies a course, its sections, its lessons and their attached documents into a new draft owned by the current user. |
| `DELETE` | `/admin/courses/{course_id}` | Core | [Delete Course](/restapi/operations/courses/delete-course) | Deletes a course together with all of its content and every trace of student participation in it. |
| `GET` | `/admin/courses/{course_id}/students` | Core | [List Course Students](/restapi/operations/courses/list-course-students) | Returns the paginated roster of a course, each student carrying their enrolment pivot and their completion percentage. |
| `POST` | `/admin/courses/{course_id}/students` | Core | [Add Course Student](/restapi/operations/courses/add-course-student) | Enrols one existing WordPress user in the course on behalf of an administrator. |
| `DELETE` | `/admin/courses/{course_id}/students/{student_id}` | Core | [Remove Course Student](/restapi/operations/courses/remove-course-student) | Unenrols a student from the course. |
| `DELETE` | `/admin/courses/{course_id}/students/{student_id}/progress` | Core | [Delete Reset Student Progress](/restapi/operations/courses/delete-reset-student-progress) | Clears one student completion records for the course while leaving them enrolled. |
| `GET` | `/admin/courses/{course_id}/users/search` | Core | [Search Course Users](/restapi/operations/courses/search-course-users) | Searches for WordPress users who are not yet enrolled in the course, for the add-student picker. |
| `POST` | `/admin/courses/{course_id}/links` | Core | [Update Course Links](/restapi/operations/courses/update-course-links) | Replaces the sidebar link list shown on a course with the submitted set. |
| `GET` | `/admin/courses/{course_id}/meta-settings` | Core | [Get Course Meta Settings](/restapi/operations/courses/get-course-meta-settings) | Returns the extra course settings panels contributed by integrations, or \`null\` when nothing has registered any. |
| `GET` | `/admin/courses/{course_id}/instructors/search` | Core | [Search Course Instructors](/restapi/operations/courses/search-course-instructors) | Searches all WordPress users so one can be assigned as the course instructor. |
| `GET` | `/admin/courses/{course_id}/sections` | Core | [List Course Sections](/restapi/operations/courses/list-course-sections) | Returns the sections of a course in display order, with their lessons attached. |
| `POST` | `/admin/courses/{course_id}/sections` | Core | [Create Course Section](/restapi/operations/courses/create-course-section) | Adds a published section to the end of a course outline. |
| `PATCH` | `/admin/courses/{course_id}/sections/indexes` | Core | [Reindex Course Sections](/restapi/operations/courses/reindex-course-sections) | Applies a new display order to a course outline by writing the submitted priority for each section. |
| `GET` | `/admin/courses/{course_id}/sections/{section_id}` | Core | [Get Course Section](/restapi/operations/courses/get-course-section) | Returns one section of a course with its lessons. |
| `PUT` | `/admin/courses/{course_id}/sections/{section_id}` | Core | [Update Course Section](/restapi/operations/courses/update-course-section) | Replaces the title and status of a section. |
| `PATCH` | `/admin/courses/{course_id}/sections/{section_id}` | Core | [Patch Course Section](/restapi/operations/courses/patch-course-section) | Applies a partial update to a section, accepting the drip fields that match the course type. |
| `DELETE` | `/admin/courses/{course_id}/sections/{section_id}` | Core | [Delete Course Section](/restapi/operations/courses/delete-course-section) | Deletes a section and every lesson inside it. |
| `PATCH` | `/admin/courses/{course_id}/sections/{section_id}/indexes` | Core | [Reindex Course Lessons](/restapi/operations/courses/reindex-course-lessons) | Applies a new display order to the lessons inside one section. |
| `GET` | `/admin/courses/{course_id}/lessons` | Core | [List Course Lessons](/restapi/operations/courses/list-course-lessons) | Returns the lessons of a course in display order, optionally narrowed to one section. |
| `POST` | `/admin/courses/{course_id}/lessons` | Core | [Create Course Lesson](/restapi/operations/courses/create-course-lesson) | Creates an empty draft lesson at the end of a section. |
| `PUT` | `/admin/courses/{course_id}/copy-section` | Core | [Copy Course Section](/restapi/operations/courses/copy-course-section) | Copies a section, its lessons and their attached documents from one course into another, appended to the end of the destination outline. |
| `PUT` | `/admin/courses/{course_id}/move-lesson` | Core | [Move Course Lesson](/restapi/operations/courses/move-course-lesson) | Moves a lesson into a different section of the same course. |
| `GET` | `/admin/courses/{course_id}/lessons/{lesson_id}` | Core | [Get Course Lesson](/restapi/operations/courses/get-course-lesson) | Returns one lesson in its editable form with its section and course attached. |
| `PUT` | `/admin/courses/{course_id}/lessons/{lesson_id}` | Core | [Update Course Lesson](/restapi/operations/courses/update-course-lesson) | Saves the full lesson record — title, status, body and metadata — and reconciles the featured image media. |
| `PATCH` | `/admin/courses/{course_id}/lessons/{lesson_id}` | Core | [Patch Course Lesson](/restapi/operations/courses/patch-course-lesson) | Applies a partial update to a lesson, accepting only \`title\`, \`status\`, \`slug\` and \`message\`. |
| `DELETE` | `/admin/courses/{course_id}/lessons/{lesson_id}` | Core | [Delete Course Lesson](/restapi/operations/courses/delete-course-lesson) | Deletes a single lesson from a course. |
| `POST` | `/admin/courses/{course_id}/lessons/{lesson_id}/duplicate` | Core | [Post Duplicate Lesson](/restapi/operations/courses/post-duplicate-lesson) | Copies a lesson, inserts the copy directly after the original and renumbers the rest of the section. |
| `PUT` | `/admin/courses/{course_id}/lockscreens` | <span class="pro-badge">PRO</span> | [Update Course Lockscreen Settings](/restapi/operations/courses/update-course-lockscreen-settings) | Stores the lock screen a private course shows to visitors who are not enrolled — its copy, imagery and call to action. |
| `GET` | `/admin/courses/{course_id}/welcome-banner` | <span class="pro-badge">PRO</span> | [Get Course Welcome Banner Settings](/restapi/operations/courses/get-course-welcome-banner-settings) | Returns the two course welcome banner variants, one for enrolled students and one for visitors who have not enrolled. |
| `POST` | `/admin/courses/{course_id}/welcome-banner` | <span class="pro-badge">PRO</span> | [Post Update Course Welcome Banner Settings](/restapi/operations/courses/post-update-course-welcome-banner-settings) | Stores both course welcome banner variants and pre-renders their Markdown descriptions to HTML. |
| `POST` | `/admin/courses/{course_id}/students/bulk-add` | <span class="pro-badge">PRO</span> | [Post Bulk Add Students](/restapi/operations/courses/post-bulk-add-students) | Enrols many users in a course in one call, either from an explicit id list or by copying the membership of another space or course in batches. |
| `POST` | `/admin/courses/{course_id}/students/bulk-import` | <span class="pro-badge">PRO</span> | [Post Bulk Import Students](/restapi/operations/courses/post-bulk-import-students) | Imports students into a course from submitted rows, creating WordPress users for addresses that do not yet exist. |
| `POST` | `/admin/courses/{course_id}/students/resolve-crm-tag` | <span class="pro-badge">PRO</span> | [Post Resolve CRM Tag Course](/restapi/operations/courses/post-resolve-crm-tag-course) | Resolves a FluentCRM tag into a page of contacts to enrol in the course, optionally creating WordPress users for contacts that do not have one. |
| `POST` | `/courses/{course_id}/lessons/{lesson_id}/quiz/submit` | <span class="pro-badge">PRO</span> | [Submit Lesson Quiz](/restapi/operations/courses/submit-lesson-quiz) | Grades a quiz lesson submission, stores the attempt and returns the per-question result with the score. |
| `GET` | `/courses/{course_id}/lessons/{lesson_id}/quiz/result` | <span class="pro-badge">PRO</span> | [Get Lesson Quiz Result](/restapi/operations/courses/get-lesson-quiz-result) | Returns the current user stored result for one quiz lesson, or null if they have not attempted it. |
| `GET` | `/admin/courses/{course_id}/quiz-results` | <span class="pro-badge">PRO</span> | [List Course Quiz Results](/restapi/operations/courses/list-course-quiz-results) | Returns the paginated quiz attempts across a whole course, each with the student profile and the lesson attached. |
| `POST` | `/admin/courses/{course_id}/quiz-results/{quiz_id}` | <span class="pro-badge">PRO</span> | [Update Course Quiz Result](/restapi/operations/courses/update-course-quiz-result) | Overrides the pass or fail grade recorded against one quiz attempt. |
| `GET` | `/admin/courses/{course_id}/export/quiz-results` | <span class="pro-badge">PRO</span> | [Get Exportable Quiz Results](/restapi/operations/courses/get-exportable-quiz-results) | Returns a flattened, spreadsheet-shaped list of quiz attempts for a course — student, email, quiz, score, grade, attempt count and submission time. |
