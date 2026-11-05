---
title: "Certificates API"
description: "Course and manual certificates: what a member holds, public verification, Open Badges 3.0 documents for wallets, and the admin endpoints for templates, issuing and revoking."
---

# Certificates API

Course and manual certificates: what a member holds, public verification, Open Badges 3.0 documents for wallets, and the admin endpoints for templates, issuing and revoking.

<span class="pro-badge">PRO</span>

## Authentication

Member and admin routes use `CertificatePolicy`; the course certificate settings use `CourseAdminPolicy`, so a course creator can configure their own course. The verification, issuer, public-key, status-list and holder-badge routes are reachable without an account by design — a certificate is verifiable by whoever is shown it.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/admin/certificates/templates` | <span class="pro-badge">PRO</span> | [Get List Templates](/restapi/operations/certificates/get-list-templates) | Lists every certificate template with its publishing state and how many certificates it has issued. |
| `POST` | `/admin/certificates/templates` | <span class="pro-badge">PRO</span> | [Post Create Template](/restapi/operations/certificates/post-create-template) | Creates a certificate template, either blank or from a supplied design. |
| `GET` | `/admin/certificates/templates/{id}` | <span class="pro-badge">PRO</span> | [Get Template](/restapi/operations/certificates/get-template) | Returns one template with its working design. |
| `PUT` | `/admin/certificates/templates/{id}` | <span class="pro-badge">PRO</span> | [Put Update Template](/restapi/operations/certificates/put-update-template) | Renames a template, saves its design, or restores it from archived. |
| `POST` | `/admin/certificates/templates/{id}/publish` | <span class="pro-badge">PRO</span> | [Post Publish Template](/restapi/operations/certificates/post-publish-template) | Publishes the current draft as a new, immutable template version. |
| `DELETE` | `/admin/certificates/templates/{id}` | <span class="pro-badge">PRO</span> | [Delete Template](/restapi/operations/certificates/delete-template) | Deletes a template, or archives it when certificates were issued from it. |
| `POST` | `/admin/certificates/images` | <span class="pro-badge">PRO</span> | [Post Upload Image](/restapi/operations/certificates/post-upload-image) | Uploads a logo, signature or background image for use in a template design. |
| `GET` | `/admin/certificates/issued` | <span class="pro-badge">PRO</span> | [Get List Issued](/restapi/operations/certificates/get-list-issued) | Lists issued course certificates for administrators, with search and filters. |
| `POST` | `/admin/certificates/issued/{id}/suspend` | <span class="pro-badge">PRO</span> | [Post Suspend](/restapi/operations/certificates/post-suspend) | Suspends a certificate, so verification reports it as not currently in force. |
| `POST` | `/admin/certificates/issued/{id}/reinstate` | <span class="pro-badge">PRO</span> | [Post Reinstate](/restapi/operations/certificates/post-reinstate) | Returns a suspended certificate to force. |
| `POST` | `/admin/certificates/issued/{id}/revoke` | <span class="pro-badge">PRO</span> | [Post Revoke](/restapi/operations/certificates/post-revoke) | Revokes a certificate permanently. |
| `POST` | `/admin/certificates/issued/{id}/reissue` | <span class="pro-badge">PRO</span> | [Post Reissue](/restapi/operations/certificates/post-reissue) | Rebuilds a course certificate from today's course and member details, onto the template's current version. |
| `GET` | `/admin/certificates/manual` | <span class="pro-badge">PRO</span> | [Get List Manual](/restapi/operations/certificates/get-list-manual) | Lists manually issued certificates for administrators. |
| `GET` | `/admin/certificates/manual/fields` | <span class="pro-badge">PRO</span> | [Get Manual Fields](/restapi/operations/certificates/get-manual-fields) | Returns the fields an admin has to fill in to issue from a given template, with sensible defaults. |
| `POST` | `/admin/certificates/manual` | <span class="pro-badge">PRO</span> | [Post Issue Manual](/restapi/operations/certificates/post-issue-manual) | Issues certificates by hand to up to 25 people at once, with or without a course. |
| `GET` | `/admin/certificates/issued/{id}/manual` | <span class="pro-badge">PRO</span> | [Get Manual](/restapi/operations/certificates/get-manual) | Returns one manual certificate with its fields, design, values and edit history. |
| `PUT` | `/admin/certificates/issued/{id}/manual` | <span class="pro-badge">PRO</span> | [Put Update Manual](/restapi/operations/certificates/put-update-manual) | Edits a manual certificate's holder, values, privacy, expiry or template version. |
| `GET` | `/admin/certificates/users/lookup` | <span class="pro-badge">PRO</span> | [Get Lookup User](/restapi/operations/certificates/get-lookup-user) | Looks up a member by exact email, so the manual issue form can offer to link an account. |
| `GET` | `/admin/courses/{course_id}/certificate-settings` | <span class="pro-badge">PRO</span> | [Get Course Settings](/restapi/operations/certificates/get-course-settings) | Returns a course's certificate settings: whether it awards one, from which template, and after how long it expires. |
| `POST` | `/admin/courses/{course_id}/certificate-settings` | <span class="pro-badge">PRO</span> | [Post Save Course Settings](/restapi/operations/certificates/post-save-course-settings) | Saves a course's certificate settings and returns the values as stored. |
| `GET` | `/admin/courses/{course_id}/certificate-backfill` | <span class="pro-badge">PRO</span> | [Get Backfill Summary](/restapi/operations/certificates/get-backfill-summary) | Counts the completions of a course and how many of them have no certificate yet. |
| `POST` | `/admin/courses/{course_id}/certificate-backfill` | <span class="pro-badge">PRO</span> | [Post Backfill](/restapi/operations/certificates/post-backfill) | Issues certificates for past completions of a course, 25 completions at a time. |
| `GET` | `/certificates/mine` | <span class="pro-badge">PRO</span> | [Get Mine](/restapi/operations/certificates/get-mine) | Lists the certificates the calling member holds, newest first. |
| `GET` | `/certificates/mine/{credential}` | <span class="pro-badge">PRO</span> | [Get Mine Detail](/restapi/operations/certificates/get-mine-detail) | Returns one of the caller's own certificates, including everything needed to render it. |
| `GET` | `/certificates/mine/{credential}/open-badge` | <span class="pro-badge">PRO</span> | [Get Credential](/restapi/operations/certificates/get-credential) | Returns the caller's certificate as a signed Open Badges 3.0 credential for a wallet. |
| `PUT` | `/certificates/{credential}/visibility` | <span class="pro-badge">PRO</span> | [Put Update Visibility](/restapi/operations/certificates/put-update-visibility) | Switches one of the caller's own certificates between public and private. |
| `GET` | `/certificates/verify/{credential}` | <span class="pro-badge">PRO</span> | [Get Verify](/restapi/operations/certificates/get-verify) | Verifies a credential ID and returns what the certificate is allowed to show publicly. |
| `GET` | `/certificates/open-badges/issuer` | <span class="pro-badge">PRO</span> | [Get Issuer](/restapi/operations/certificates/get-issuer) | Returns this site as an Open Badges 3.0 issuer profile, for wallets and verifiers. |
| `GET` | `/certificates/open-badges/keys/{kid}` | <span class="pro-badge">PRO</span> | [Get Public Key](/restapi/operations/certificates/get-public-key) | Returns the public half of the site's badge signing key as a JWK. |
| `GET` | `/certificates/open-badges/status/{listNumber}` | <span class="pro-badge">PRO</span> | [Get Status List](/restapi/operations/certificates/get-status-list) | Returns the signed bitstring status list a verifier checks to see whether a badge is still in force. |
| `GET` | `/certificates/open-badges/holder/{credential}` | <span class="pro-badge">PRO</span> | [Get Holder Credential](/restapi/operations/certificates/get-holder-credential) | Returns the Open Badge for a manual certificate whose holder has no account, using the token from their holder link. |
| `GET` | `/profile/{username}/certificates` | <span class="pro-badge">PRO</span> | [Get Profile Certificates](/restapi/operations/certificates/get-profile-certificates) | Lists the certificates shown on a member's profile, shaped for the viewer. |
