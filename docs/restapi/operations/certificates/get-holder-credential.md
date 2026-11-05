---
title: "Get Holder Credential"
description: "Returns the Open Badge for a manual certificate whose holder has no account, using the token from their holder link."
outline: false
aside: false
---

Returns the Open Badge for a manual certificate whose holder has no account, using the token from their holder link.

Same response as the member badge endpoint. The route itself is open, and the token in the query string is what authorises the download; it is compared in constant time against a hash of the certificate and the holder email.

## Endpoint

- **Method:** `GET`
- **Path:** `/certificates/open-badges/holder/{credential}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `OpenBadgeController@holderCredential`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:59`

- It only ever works for a manual certificate with no linked account. For a course certificate, or one linked to a member, it always answers 404 — the holder uses the member endpoint instead.
- A wrong token answers 404 exactly like an unknown certificate, so the endpoint leaks nothing.
- The token does not expire, but it is derived from the holder email and the row, so changing that email or linking an account invalidates every link already sent.
- Anyone holding the token can download the badge, so treat the holder link as a secret.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getHolderCredential" specUrl="/openapi/public/certificates/get-holder-credential.json" />
