---
title: "Post Issue Manual"
description: "Issues certificates by hand to up to 25 people at once, with or without a course."
outline: false
aside: false
---

Issues certificates by hand to up to 25 people at once, with or without a course.

Each row carries a name, an email and the merge values the template prints. The shared options decide the template, the optional course, privacy, the dates, whether to notify, and whether to leave the holder without an account, link an existing one by email, or create one.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/certificates/manual`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ManualCertificateController@issueManual`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:33`

- Partial success is a 200: per-row outcomes live in `results`. The exception is a single-row request, where the row's own failure becomes the 422.
- Options are global to the request, so one bad expiry date fails every row.
- Nothing deduplicates, so the same person can be issued any number of certificates.
- Holders without an account are first class: they get a tokenised verification link, and the notification goes to the address typed in.
- Creating an account issues a real WordPress user and, with `account_email=yes`, sends the standard password email.
- Course rules do not apply here — no `fluent_community/certificate/can_issue`, and no one-per-course check. `fluent_community/certificate/before_manual_issue` can still rewrite or block a row.
- Serial numbers share one sequence with course certificates.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postIssueManual" specUrl="/openapi/public/certificates/post-issue-manual.json" />
