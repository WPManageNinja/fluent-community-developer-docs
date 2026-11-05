---
title: "Get Course Settings"
description: "Returns a course's certificate settings: whether it awards one, from which template, and after how long it expires."
outline: false
aside: false
---

Returns a course's certificate settings: whether it awards one, from which template, and after how long it expires.

Stored as course metadata rather than columns, and defaulted to off with no template. This is one of the few certificate routes a course creator can call, for their own course.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/certificate-settings`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateAdminController@getCourseSettings`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:41`

- Authorisation here runs through the course admin policy, so a community admin without course-creator access is refused — the opposite of the other certificate admin routes.
- An ID that is not a course answers 404.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getCourseSettings" specUrl="/openapi/public/certificates/get-course-settings.json" />
