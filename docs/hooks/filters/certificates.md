---
title: "Certificates Filters"
description: "Certificates filter hooks for FluentCommunity."
---

# Certificates Filters

9 unique filter hooks currently map to this category, across 9 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/certificate/before_manual_issue`](#fluent-community-certificate-before-manual-issue) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/ManualCertificates.php:109` |
| [`fluent_community/certificate/can_issue`](#fluent-community-certificate-can-issue) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:87` |
| [`fluent_community/certificate/can_see_profile_certificates`](#fluent-community-certificate-can-see-profile-certificates) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/CertificateOptions.php:88` |
| [`fluent_community/certificate/issued_email`](#fluent-community-certificate-issued-email) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/CertificateMailer.php:123` |
| [`fluent_community/certificate/linkedin_params`](#fluent-community-certificate-linkedin-params) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/CertificatePresenter.php:193` |
| [`fluent_community/certificate/max_image_bytes`](#fluent-community-certificate-max-image-bytes) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Http/Controllers/CertificateTemplateController.php:206` |
| [`fluent_community/certificate/merge_values`](#fluent-community-certificate-merge-values) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/MergeValues.php:68` |
| [`fluent_community/certificate/open_badge_credential`](#fluent-community-certificate-open-badge-credential) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/OpenBadgeCredential.php:83` |
| [`fluent_community/certificate/open_badges_enabled`](#fluent-community-certificate-open-badges-enabled) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Certificates/Services/OpenBadgeCredential.php:44` |

<a id="fluent-community-certificate-before-manual-issue"></a>

## `fluent_community/certificate/before_manual_issue`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters one row of a manual issue before any account is created or anything is written.

Return a `WP_Error` to reject the row — the rest of the batch continues, and the error surfaces as that row's result. The array's keys are read directly afterwards rather than merged over the defaults, so dropping a key causes an error instead of a fallback. Values returned here are not re-sanitised before they are stored, so a filter can write any merge tag onto the certificate. It fires once per row, up to 25 times in a request, and only for manual issuing: the course rules (`can_issue`, one certificate per course) deliberately do not apply.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | `name`, `email`, `user_id`, `template`, `course`, `values`, `privacy`, `issued_at`, `expires_at` and `notify`. |
| 2 | `$input` | `array` | The raw request row merged with the per-request options. |

**Return:** `array` — the row to issue, or a `WP_Error` to reject just this row.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/ManualCertificates.php:109` | `$data` (mixed)<br>`$input` (mixed) |

### Example

```php
add_filter('fluent_community/certificate/before_manual_issue', function ($data, $input) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/certificate/manual_updated`](/hooks/actions/certificates#fluent-community-certificate-manual-updated) · [`fluent_community/certificate/can_issue`](#fluent-community-certificate-can-issue)

<a id="fluent-community-certificate-can-issue"></a>

## `fluent_community/certificate/can_issue`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Decides whether a course certificate may be issued to a member.

Return anything falsy to block it; the result is tested for truthiness rather than cast, so `0`, `''` and `null` all block. It runs after the template and member checks but before the issuing lock and before the "already holds one" check, so it fires on every completion of a certificate-enabled course — including completions where a certificate already exists or was revoked, and core re-fires course completion when a later-published lesson is finished. Blocking here does not withdraw a certificate already issued, and it has no effect on manual certificates. Backfills go through the same path, so it applies to them too.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$canIssue` | `bool` | Whether to issue. True by default. |
| 2 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The completed course. |
| 3 | `$userId` | `int` | The member who completed it. |
| 4 | `$args` | `array` | `source` (`auto`, `backfill` or a caller's own), and the issuing dates when supplied. |

**Return:** `bool` — falsy blocks the issue and the caller receives an error.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificateIssuer.php:87` | `true` (bool)<br>`$course` (Course)<br>`$userId` (int)<br>`$args` (mixed) |

### Example

```php
add_filter('fluent_community/certificate/can_issue', function ($canIssue, $course, $userId, $args) {
    return $canIssue;
}, 10, 4);
```

**Related:** [`fluent_community/certificate/issue_failed`](/hooks/actions/certificates#fluent-community-certificate-issue-failed) · [`fluent_community/certificate/issued`](/hooks/actions/certificates#fluent-community-certificate-issued)

<a id="fluent-community-certificate-can-see-profile-certificates"></a>

## `fluent_community/certificate/can_see_profile_certificates`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Decides whether one member may see another member's certificates on their profile.

The default follows the site's profile visibility setting for certificates, whose own default is owner-only. The result is cast to bool. It is not called at all when the viewer is the owner, so it cannot hide a member's own tab. It is also only one gate among several: core profile visibility, the profile's status, and the public-and-issued-only query still apply, so returning true never exposes a private, suspended or expired certificate.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$allowed` | `bool` | Whether the viewer may see them, from the site setting. |
| 2 | `$ownerId` | `int` | The profile's owner. |
| 3 | `$currentUserId` | `int` | The viewer, or 0 for a guest. |

**Return:** `bool` — cast from whatever is returned.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificateOptions.php:88` | `$allowed` (mixed)<br>`(int) $ownerId` (int)<br>`$currentUserId` (int) |

### Example

```php
add_filter('fluent_community/certificate/can_see_profile_certificates', function ($allowed, $ownerId, $currentUserId) {
    return $allowed;
}, 10, 3);
```

**Related:** [`fluent_community/certificate/linkedin_params`](#fluent-community-certificate-linkedin-params)

<a id="fluent-community-certificate-issued-email"></a>

## `fluent_community/certificate/issued_email`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the subject and body of the certificate notification email.

Return an array with a `subject` and a `body`; emptying either one cancels the send. The body is used as complete HTML and is not wrapped or escaped afterwards. It runs inside a background job rather than the request that issued the certificate, so a filter must not depend on the current user, a nonce or the request payload, and the job re-reads the certificate and stops if it is no longer in force. The recipient is decided before the filter and cannot be changed through it. The whole path is skipped when the certificate was issued without notification — a backfill, an import, or a manual issue with notification off — or when the site setting disables the email.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$email` | `array` | `subject` and `body`. |
| 2 | `$certificate` | `\FluentCommunityPro\App\Modules\Certificates\Models\Certificate` | The certificate being announced. |
| 3 | `$user` | `\FluentCommunity\App\Models\User&#124;null` | The holder, or null for a manual certificate with no account. |

**Return:** `array` — an empty subject or body cancels the email.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificateMailer.php:123` | `[ 'subject' => $subject, 'body' => $composer->getHtml(), ]` (array)<br>`$certificate` (mixed)<br>`$user` (User) |

### Example

```php
add_filter('fluent_community/certificate/issued_email', function ($email, $certificate, $user) {
    return $email;
}, 10, 3);
```

**Related:** [`fluent_community/certificate/issued`](/hooks/actions/certificates#fluent-community-certificate-issued)

<a id="fluent-community-certificate-linkedin-params"></a>

## `fluent_community/certificate/linkedin_params`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the query parameters of the "Add to LinkedIn" link.

Every value is URL-encoded after the filter, so pre-encoding double-encodes and a nested array breaks the encoding. The documented use is swapping the organisation name for an organisation ID: LinkedIn accepts one or the other, never both. The link is built only for the holder, and only for a certificate that is valid and not private, and it is built once per certificate card shown.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$params` | `array` | The LinkedIn parameters, including the certificate name, issuer, dates, URL and ID. |
| 2 | `$certificate` | `\FluentCommunityPro\App\Modules\Certificates\Models\Certificate` | The certificate the link is for. |

**Return:** `array` — parameters, each URL-encoded afterwards.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/CertificatePresenter.php:193` | `$params` (mixed)<br>`$certificate` (mixed) |

### Example

```php
add_filter('fluent_community/certificate/linkedin_params', function ($params, $certificate) {
    return $params;
}, 10, 2);
```

**Related:** [`fluent_community/certificate/can_see_profile_certificates`](#fluent-community-certificate-can-see-profile-certificates)

<a id="fluent-community-certificate-max-image-bytes"></a>

## `fluent_community/certificate/max_image_bytes`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the size limit for a template image upload.

Defaults to 5 MB and is cast to int. Raising it does not raise PHP's or WordPress's own upload limits, which are applied first and produce the "no upload file was received" error instead. The accepted types — JPG, PNG and WebP, with SVG deliberately excluded — are not filterable.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxBytes` | `int` | Maximum upload size in bytes. 5 MB by default. |

**Return:** `int` — the limit in bytes.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Http/Controllers/CertificateTemplateController.php:206` | `5 * MB_IN_BYTES` (mixed) |

### Example

```php
add_filter('fluent_community/certificate/max_image_bytes', function ($maxBytes) {
    return $maxBytes;
}, 10, 1);
```

<a id="fluent-community-certificate-merge-values"></a>

## `fluent_community/certificate/merge_values`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the values printed onto a course certificate, at the moment they are frozen.

Covers the student, course, certificate and site tags. The return value is cast to an array and every value to a string, so a nested array raises an array-to-string conversion. These values are a snapshot: a later change to a member's name or a course title reaches an existing certificate only through a deliberate reissue. On reissue the original completion date is restored after the filter, so changing that one tag there has no effect. The filter runs while the global issuing lock is held, so a slow filter serialises certificate issuing across the whole site. It does not run for manual certificates, which build their values from the admin's own form — a filter that adds a custom tag will be missing from every manual certificate.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$values` | `array` | Merge tag => printed string. |
| 2 | `$course` | `\FluentCommunity\Modules\Course\Model\Course` | The course being certified. |
| 3 | `$userId` | `int` | The holder. |
| 4 | `$context` | `array` | The issue and expiry dates, the completion date, the credential ID and the serial. |

**Return:** `array` — coerced to an array of strings.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/MergeValues.php:68` | `$values` (mixed)<br>`$course` (Course)<br>`$userId` (int)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/certificate/merge_values', function ($values, $course, $userId, $context) {
    return $values;
}, 10, 4);
```

**Related:** [`fluent_community/certificate/issued`](/hooks/actions/certificates#fluent-community-certificate-issued)

<a id="fluent-community-certificate-open-badge-credential"></a>

## `fluent_community/certificate/open_badge_credential`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the Open Badges 3.0 credential for a certificate, immediately before it is signed.

The JWT claims are derived from the filtered document afterwards, so changing the credential's ID also changes the token ID, and the validity dates must stay strings a date parser understands. Removing or renaming the issuer, the ID, the subject ID or the start date raises a PHP error rather than failing gracefully. It runs once per download and nothing is stored, so there is no cache to clear. It does not affect the issuer profile or the status list, which are separate documents.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$credential` | `array` | The unsigned credential document. |
| 2 | `$certificate` | `\FluentCommunityPro\App\Modules\Certificates\Models\Certificate` | The certificate it describes. |

**Return:** `array` — the document that gets signed.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/OpenBadgeCredential.php:83` | `$credential` (mixed)<br>`$certificate` (mixed) |

### Example

```php
add_filter('fluent_community/certificate/open_badge_credential', function ($credential, $certificate) {
    return $credential;
}, 10, 2);
```

**Related:** [`fluent_community/certificate/open_badges_enabled`](#fluent-community-certificate-open-badges-enabled)

<a id="fluent-community-certificate-open-badges-enabled"></a>

## `fluent_community/certificate/open_badges_enabled`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Switches Open Badge downloads off for the site.

Returning false hides the download button and makes the badge endpoints answer 422, while the issuer, public key and status list keep serving — so badges downloaded earlier still verify. The filter is only consulted when the server can sign at all: without the required OpenSSL functions it is never called, so returning true cannot turn badges on. The result is coerced to bool, and it is consulted several times in a page, once per certificate card.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$enabled` | `bool` | Whether badge downloads are offered. True by default. |

**Return:** `bool` — false disables the downloads.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Certificates/Services/OpenBadgeCredential.php:44` | `true` (bool) |

### Example

```php
add_filter('fluent_community/certificate/open_badges_enabled', function ($enabled) {
    return $enabled;
}, 10, 1);
```

**Related:** [`fluent_community/certificate/open_badge_credential`](#fluent-community-certificate-open-badge-credential)

