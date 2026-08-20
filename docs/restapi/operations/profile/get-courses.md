---
title: Get Courses
description: "Returns the published courses a member is enrolled in, each with their progress, cover image and section, lesson and student counts."
outline: false
aside: false
---

Returns the published courses a member is enrolled in, each with their progress, cover image and section, lesson and student counts.

Secret courses are only included when the caller is the profile owner or a community moderator. Courses without a cover image fall back to the bundled placeholder.

## Endpoint

- **Method:** `GET`
- **Path:** `/profile/{username}/courses`
- **Edition:** Core
- **Controller:** `ProfileController@getCourses`
- **Route source:** `fluent-community/app/Http/Routes/api.php:91`
- **Controller source:** `fluent-community/app/Http/Controllers/ProfileController.php`

- Requires the `course_module` feature to be enabled.
- Gated by the `user_space_visibility` privacy setting.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getCourses" specUrl="/openapi/public/profile/get-courses.json" />
