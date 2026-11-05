---
title: "Get Issuer"
description: "Returns this site as an Open Badges 3.0 issuer profile, for wallets and verifiers."
outline: false
aside: false
---

Returns this site as an Open Badges 3.0 issuer profile, for wallets and verifiers.

A spec document rather than a FluentCommunity payload: the issuer `Profile` with its ID, name, URL and the community logo when one is set. Public by design, since a verifier must be able to fetch it.

## Endpoint

- **Method:** `GET`
- **Path:** `/certificates/open-badges/issuer`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `OpenBadgeController@issuer`
- **Route source:** `fluent-community-pro/app/Modules/Certificates/Http/certificates_api.php:55`

- The issuer ID is this endpoint's own URL, and that URL is baked into every badge already issued — changing the site URL or the REST prefix breaks verification of those badges.
- The name is the community title from FluentCommunity's settings, which is not necessarily the WordPress site title.
- It keeps answering even when badge downloads are switched off, so badges downloaded earlier still verify.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getIssuer" specUrl="/openapi/public/certificates/get-issuer.json" />
