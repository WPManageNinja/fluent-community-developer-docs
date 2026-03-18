---
title: Courses API
description: Portal course consumption endpoints and the full course administration surface.
---

# Courses API

Portal course consumption endpoints and the full course administration surface.

## Authentication

Course routes are split between `PortalPolicy` and `CourseAdminPolicy` depending on whether the endpoint is a learner or admin flow.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/courses` | Core | [List Courses](/restapi/operations/courses/list-courses) | `CourseController@getCourses` |
| `GET` | `/courses/{course_id}` | Core | [Get Course](/restapi/operations/courses/get-course) | `CourseController@getCourse` |
| `GET` | `/courses/{course_slug}/by-slug` | Core | [Get Course By Slug](/restapi/operations/courses/get-course-by-slug) | `CourseController@getCourseBySlug` |
| `GET` | `/courses/{course_slug}/lessons/{lesson_slug}/by-slug` | Core | [Get Lesson By Slug](/restapi/operations/courses/get-lesson-by-slug) | `CourseController@getLessonBySlug` |
| `POST` | `/courses/{course_id}/enroll` | Core | [Enroll Course](/restapi/operations/courses/enroll-course) | `CourseController@enrollCourse` |
| `PUT` | `/courses/{course_id}/lessons/{lesson_id}/completion` | Core | [Update Lesson Completion](/restapi/operations/courses/update-lesson-completion) | `CourseController@updateCompletionLesson` |
| `GET` | `/courses/all-courses` | Core | [List All Courses](/restapi/operations/courses/list-all-courses) | `CourseController@getAllCourses` |
| `GET` | `/admin/courses` | Core | [List Admin Courses](/restapi/operations/courses/list-admin-courses) | `CourseAdminController@getCourses` |
| `POST` | `/admin/courses` | Core | [Create Course](/restapi/operations/courses/create-course) | `CourseAdminController@createCourse` |
| `GET` | `/admin/courses/{course_id}` | Core | [Get Admin Course](/restapi/operations/courses/get-admin-course) | `CourseAdminController@findCourse` |
| `PUT` | `/admin/courses/{course_id}` | Core | [Update Course](/restapi/operations/courses/update-course) | `CourseAdminController@updateCourse` |
| `POST` | `/admin/courses/{course_id}/duplicate` | Core | [Duplicate Course](/restapi/operations/courses/duplicate-course) | `CourseAdminController@duplicateCourse` |
| `DELETE` | `/admin/courses/{course_id}` | Core | [Delete Course](/restapi/operations/courses/delete-course) | `CourseAdminController@deleteCourse` |
| `GET` | `/admin/courses/{course_id}/students` | Core | [List Course Students](/restapi/operations/courses/list-course-students) | `CourseAdminController@getCourseStudents` |
| `POST` | `/admin/courses/{course_id}/students` | Core | [Add Course Student](/restapi/operations/courses/add-course-student) | `CourseAdminController@addStudent` |
| `DELETE` | `/admin/courses/{course_id}/students/{student_id}` | Core | [Remove Course Student](/restapi/operations/courses/remove-course-student) | `CourseAdminController@removeStudent` |
| `GET` | `/admin/courses/{course_id}/users/search` | Core | [Search Course Users](/restapi/operations/courses/search-course-users) | `CourseAdminController@getOtherUsers` |
| `POST` | `/admin/courses/{course_id}/links` | Core | [Update Course Links](/restapi/operations/courses/update-course-links) | `CourseAdminController@updateLinks` |
| `GET` | `/admin/courses/{course_id}/meta-settings` | Core | [Get Course Meta Settings](/restapi/operations/courses/get-course-meta-settings) | `CourseAdminController@getMetaSettings` |
| `GET` | `/admin/courses/{course_id}/instructors/search` | Core | [Search Course Instructors](/restapi/operations/courses/search-course-instructors) | `CourseAdminController@getOtherInstructors` |
| `GET` | `/admin/courses/{course_id}/sections` | Core | [List Course Sections](/restapi/operations/courses/list-course-sections) | `CourseAdminController@getSections` |
| `POST` | `/admin/courses/{course_id}/sections` | Core | [Create Course Section](/restapi/operations/courses/create-course-section) | `CourseAdminController@createSection` |
| `PATCH` | `/admin/courses/{course_id}/sections/indexes` | Core | [Reindex Course Sections](/restapi/operations/courses/reindex-course-sections) | `CourseAdminController@resetSectionIndexes` |
| `GET` | `/admin/courses/{course_id}/sections/{section_id}` | Core | [Get Course Section](/restapi/operations/courses/get-course-section) | `CourseAdminController@getSection` |
| `PUT` | `/admin/courses/{course_id}/sections/{section_id}` | Core | [Update Course Section](/restapi/operations/courses/update-course-section) | `CourseAdminController@updateSection` |
| `PATCH` | `/admin/courses/{course_id}/sections/{section_id}` | Core | [Patch Course Section](/restapi/operations/courses/patch-course-section) | `CourseAdminController@patchSection` |
| `DELETE` | `/admin/courses/{course_id}/sections/{section_id}` | Core | [Delete Course Section](/restapi/operations/courses/delete-course-section) | `CourseAdminController@deleteSection` |
| `PATCH` | `/admin/courses/{course_id}/sections/{section_id}/indexes` | Core | [Reindex Course Lessons](/restapi/operations/courses/reindex-course-lessons) | `CourseAdminController@resetLessonIndexes` |
| `GET` | `/admin/courses/{course_id}/lessons` | Core | [List Course Lessons](/restapi/operations/courses/list-course-lessons) | `CourseAdminController@getLessons` |
| `POST` | `/admin/courses/{course_id}/lessons` | Core | [Create Course Lesson](/restapi/operations/courses/create-course-lesson) | `CourseAdminController@createLesson` |
| `PUT` | `/admin/courses/{course_id}/copy-section` | Core | [Copy Course Section](/restapi/operations/courses/copy-course-section) | `CourseAdminController@copySection` |
| `PUT` | `/admin/courses/{course_id}/move-lesson` | Core | [Move Course Lesson](/restapi/operations/courses/move-course-lesson) | `CourseAdminController@moveLesson` |
| `GET` | `/admin/courses/{course_id}/lessons/{lesson_id}` | Core | [Get Course Lesson](/restapi/operations/courses/get-course-lesson) | `CourseAdminController@getLesson` |
| `PUT` | `/admin/courses/{course_id}/lessons/{lesson_id}` | Core | [Update Course Lesson](/restapi/operations/courses/update-course-lesson) | `CourseAdminController@updateLesson` |
| `PATCH` | `/admin/courses/{course_id}/lessons/{lesson_id}` | Core | [Patch Course Lesson](/restapi/operations/courses/patch-course-lesson) | `CourseAdminController@patchLesson` |
| `DELETE` | `/admin/courses/{course_id}/lessons/{lesson_id}` | Core | [Delete Course Lesson](/restapi/operations/courses/delete-course-lesson) | `CourseAdminController@deleteLesson` |
| `PUT` | `/admin/courses/{course_id}/lockscreens` | <span class="pro-badge">PRO</span> | [Update Course Lockscreen Settings](/restapi/operations/courses/update-course-lockscreen-settings) | `ProAdminController@updateCourseLockscreenSettings` |
| `POST` | `/courses/{course_id}/lessons/{lesson_id}/quiz/submit` | <span class="pro-badge">PRO</span> | [Submit Lesson Quiz](/restapi/operations/courses/submit-lesson-quiz) | `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@submitQuiz` |
| `GET` | `/courses/{course_id}/lessons/{lesson_id}/quiz/result` | <span class="pro-badge">PRO</span> | [Get Lesson Quiz Result](/restapi/operations/courses/get-lesson-quiz-result) | `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@getQuizResult` |
| `GET` | `/admin/courses/{course_id}/quiz-results` | <span class="pro-badge">PRO</span> | [List Course Quiz Results](/restapi/operations/courses/list-course-quiz-results) | `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@getCourseQuizResults` |
| `POST` | `/admin/courses/{course_id}/quiz-results/{quiz_id}` | <span class="pro-badge">PRO</span> | [Update Course Quiz Result](/restapi/operations/courses/update-course-quiz-result) | `FluentCommunityPro\App\Modules\Quiz\Http\Controllers\QuizController@updateQuizResult` |
