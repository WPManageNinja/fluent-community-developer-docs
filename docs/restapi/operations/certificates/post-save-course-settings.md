---
title: "Post Save Course Settings"
description: "Saves a course's certificate settings and returns the values as stored."
outline: false
aside: false
---

Saves a course's certificate settings and returns the values as stored.

Switching it on requires a published template. Expiry is a number of months, clamped to 600, and applies only at issue time. Runs under the global issuing lock, so it cannot race an issue in progress.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/certificate-settings`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateAdminController@saveCourseSettings`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:42`

- Turning the certificate on issues nothing for members who already completed the course — that is what the backfill is for.
- Changing the expiry never re-dates certificates already issued.
- With the certificate switched off the template ID is saved without validation, so a disabled course can keep a dangling ID — and such a course does not block deleting that template.
- A course creator can save this for their own course.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postSaveCourseSettings" specUrl="/openapi/public/certificates/post-save-course-settings.json" />
