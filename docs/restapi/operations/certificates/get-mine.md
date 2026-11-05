---
title: "Get Mine"
description: "Lists the certificates the calling member holds, newest first."
outline: false
aside: false
---

Lists the certificates the calling member holds, newest first.

A summary per certificate — credential ID, course, status, privacy, verification URL and dates — with no design or merge data, so the list stays cheap. Revoked certificates are left out; suspended and expired ones are returned, carrying that as their status.

## Endpoint

- **Method:** `GET`
- **Path:** `/certificates/mine`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateController@mine`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:48`

- `per_page` defaults to 20 and is clamped to 1-50, so a value of 0 or a non-number becomes 1 rather than the default.
- `status` here is the computed verification status (`valid`, `expired`, `suspended`), not the stored column — expiry is worked out from the expiry date each time.
- Nothing in the payload separates a manual certificate from a course one, and a manual certificate can carry a course id of 0 with its own title in place of a course title.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getMine" specUrl="/openapi/public/certificates/get-mine.json" />
