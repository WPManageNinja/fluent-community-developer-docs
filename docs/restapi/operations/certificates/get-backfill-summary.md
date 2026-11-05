---
title: "Get Backfill Summary"
description: "Counts the completions of a course and how many of them have no certificate yet."
outline: false
aside: false
---

Counts the completions of a course and how many of them have no certificate yet.

Two counts, read straight from the completion activity records, so the admin can see what a backfill would do before running it.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/courses/{course_id}/certificate-backfill`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateAdminController@backfillSummary`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:43`

- It counts completion records rather than members, so a member who completed a course twice counts twice.
- Pending counts members with no certificate for the course at all, revoked ones included.
- It answers even when the course does not award certificates, unlike running the backfill.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getBackfillSummary" specUrl="/openapi/public/certificates/get-backfill-summary.json" />
