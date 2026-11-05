---
title: "Get Profile Certificates"
description: "Lists the certificates shown on a member's profile, shaped for the viewer."
outline: false
aside: false
---

Lists the certificates shown on a member's profile, shaped for the viewer.

The owner sees everything except revoked certificates, each with the full design, a prefilled LinkedIn link and whether a badge can be downloaded. Anyone else sees only issued, public ones, with the privacy field removed and the design trimmed to what prints.

## Endpoint

- **Method:** `GET`
- **Path:** `/profile/{username}/certificates`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateController@profileCertificates`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:64`

- Whether other people see anything at all is a site setting, and its default is owner-only — so this list is empty for other viewers until an admin opens it up. The last word belongs to `fluent_community/certificate/can_see_profile_certificates`.
- Every refusal — unknown username, hidden profile, closed setting — answers the same 403, so profiles cannot be enumerated.
- `per_page` defaults to 12 and is clamped to at most 12, so a caller cannot ask for more.
- The viewer changes the query rather than only the shaping, so the total differs between the owner and everyone else.
- `is_owner` is false for a logged-out caller even on their own profile.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getProfileCertificates" specUrl="/openapi/public/certificates/get-profile-certificates.json" />
