---
title: "Get Verify"
description: "Verifies a credential ID and returns what the certificate is allowed to show publicly."
outline: false
aside: false
---

Verifies a credential ID and returns what the certificate is allowed to show publicly.

Reachable without an account on purpose, including on a private community, because a certificate has to be verifiable by whoever is shown it. A public certificate returns the holder name, course title, issuer, dates and the printable part of the design; a private one returns only the ID, a private flag and whether it is valid.

## Endpoint

- **Method:** `GET`
- **Path:** `/certificates/verify/{credential}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CertificateController@verify`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:52`

- For a private certificate the status collapses to `valid` or `not_valid`, so suspended, expired and revoked are deliberately indistinguishable.
- Rate limited to 60 lookups per 5 minutes per anonymised caller IP, which groups everyone behind the same /24 subnet. Over the limit the answer is 429.
- A malformed ID answers 404 exactly like an unknown one, and the payload never carries an email, user ID or internal row ID.
- The design is trimmed to what actually prints: hidden elements are dropped, and only merge values a visible element references are kept.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getVerify" specUrl="/openapi/public/certificates/get-verify.json" />
