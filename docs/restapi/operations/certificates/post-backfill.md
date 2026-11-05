---
title: "Post Backfill"
description: "Issues certificates for past completions of a course, 25 completions at a time."
outline: false
aside: false
---

Issues certificates for past completions of a course, 25 completions at a time.

Walks completion records in order from the `cursor` the caller passes back each time, skipping anybody who already holds a certificate for the course. Each certificate is dated from the real completion, not from today. The response carries the counts, the next cursor and whether the walk is done.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/courses/{course_id}/certificate-backfill`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateAdminController@backfill`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:44`

- The caller drives the loop: post the returned cursor to continue. Re-posting cursor 0 simply re-walks and skips everything.
- The batch size is fixed at 25 and cannot be set from the request, and the work runs inside the request rather than as a background job.
- Backfilled certificates never send the notification email.
- Because expiry counts from the completion date, a backfilled certificate can be born already expired.
- Per-row failures are counted rather than fatal, and only the first five appear in `errors` — so `done` can be true while some remain pending.
- Refused with 422 until the course has certificates switched on and saved.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postBackfill" specUrl="/openapi/public/certificates/post-backfill.json" />
