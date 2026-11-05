---
title: "Get Credential"
description: "Returns the caller's certificate as a signed Open Badges 3.0 credential for a wallet."
outline: false
aside: false
---

Returns the caller's certificate as a signed Open Badges 3.0 credential for a wallet.

The response is JSON carrying one `credential_jwt` string — a compact JWS, not a bare token and not a `vc+jwt` body. Its payload is an `OpenBadgeCredential` naming the issuer inline, with the achievement, the validity dates and a status entry pointing at this site's status list. It is built on demand and never stored.

## Endpoint

- **Method:** `GET`
- **Path:** `/certificates/mine/{credential}/open-badge`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `OpenBadgeController@credential`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:50`

- The holder's email is not in the badge in clear text: the subject identifier is a salted SHA-256 of it.
- Returns 422 when the certificate is expired, suspended or revoked — only a valid certificate can be downloaded as a badge.
- Returns 422 when the site cannot sign (no OpenSSL, or badges switched off through `fluent_community/certificate/open_badges_enabled`).
- The first badge request on a site generates a 2048-bit RSA key and stores it, so that one request is noticeably slower.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getCredential" specUrl="/openapi/public/certificates/get-credential.json" />
