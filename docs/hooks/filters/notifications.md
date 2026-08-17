---
title: Notifications Filters
description: Notifications filter hooks for FluentCommunity.
---

# Notifications Filters

8 unique filter hooks currently map to this category, across 10 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/digest_email_body`](#fluent-community-digest-email-body) | Core | 1 | `fluent-community/app/Services/Libs/DailyDigest.php:119` |
| [`fluent_community/digest_email_subject`](#fluent-community-digest-email-subject) | Core | 1 | `fluent-community/app/Services/Libs/DailyDigest.php:149` |
| [`fluent_community/notifications_api_response`](#fluent-community-notifications-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/NotificationsController.php:38` |
| [`fluent_community/profile_notification_pref_api_response`](#fluent-community-profile-notification-pref-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:874` |
| [`fluent_community/smartcode_fallback`](#fluent-community-smartcode-fallback) | Core | 3 | `fluent-community/app/Services/SmartCodeParser.php:89` |
| [`fluent_community/smartcode_group_callback_{dataKey}`](#fluent-community-smartcode-group-callback-dataKey) | Core | 1 | `fluent-community/app/Services/SmartCodeParser.php:141` |
| [`fluent_community/unread_notifications_api_response`](#fluent-community-unread-notifications-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/NotificationsController.php:59` |
| [`fluent_community/verified_email_senders`](#fluent-community-verified-email-senders) | Core | 1 | `fluent-community/app/Functions/Utility.php:1267` |

<a id="fluent-community-digest-email-body"></a>

## `fluent_community/digest_email_body`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the fully composed HTML body of a daily digest email.

The last hook before the digest is handed to the mailer. Logo, footer, the signed notification-preferences URL and the `fluent_community/digest_notification/email_sections` insertions are all already in place, so the placeholder comments those sections replace are gone by now. Per-recipient: it runs once for every member in the digest batch.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$emailBody` | `string` | The complete HTML body. |
| 2 | `$user` | `\FluentCommunity\App\Models\User` | The recipient. |

**Return:** `string` — the HTML body, sent as-is.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/DailyDigest.php:119` | `$emailBody` (mixed)<br>`$this->user` (User) |

### Example

```php
add_filter('fluent_community/digest_email_body', function ($emailBody, $user) {
    return $emailBody;
}, 10, 2);
```

**Related:** [`fluent_community/digest_email_subject`](#fluent-community-digest-email-subject) · [`fluent_community/digest_notification/email_sections`](#fluent-community-digest-notification-email-sections)

<a id="fluent-community-digest-email-subject"></a>

## `fluent_community/digest_email_subject`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the subject line of a daily digest email.

The default greets the member by name, names the site, and appends a bell glyph with the unread count when there is one. That count is passed as the third argument, so you can rebuild the subject without recounting. Runs once per recipient.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$emailSubject` | `string` | The composed subject line. |
| 2 | `$user` | `\FluentCommunity\App\Models\User` | The recipient. |
| 3 | `$notificationCount` | `int` | Number of unread notifications included in the digest. |

**Return:** `string` — the subject line.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/DailyDigest.php:149` | `$emailSubject` (mixed)<br>`$this->user` (User)<br>`$notificationCount` (mixed) |

### Example

```php
add_filter('fluent_community/digest_email_subject', function ($emailSubject, $user, $notificationCount) {
    return $emailSubject;
}, 10, 3);
```

**Related:** [`fluent_community/digest_email_body`](#fluent-community-digest-email-body)

<a id="fluent-community-notifications-api-response"></a>

## `fluent_community/notifications_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the paginated notification listing response.

Serves the full notification centre, ordered by `updated_at` descending — notifications are coalesced and bumped rather than duplicated, so the order reflects last activity, not creation. `unread_count` is a separate query over all unread notifications and is unaffected by the status or type filter applied to the list itself.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload: `notifications` paginator and `unread_count`. |
| 2 | `$requestData` | `array` | The full request parameters, including `status` and `notification_type`. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/NotificationsController.php:38` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/notifications_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/unread_notifications_api_response`](#fluent-community-unread-notifications-api-response)

<a id="fluent-community-profile-notification-pref-api-response"></a>

## `fluent_community/profile_notification_pref_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the notification preferences payload for a member.

Backs the notification settings screen. The payload holds `user_globals` cast to an object, the member's space groups, per-space preferences, the digest day already translated to a full weekday name, and the default messaging email frequency, which is forced to `no` when messaging email is switched off globally. The screen is also reachable through a signed URL from an email, so callbacks may run for a visitor who is not otherwise logged in.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload: `user_globals`, `spaceGroups`, `space_prefs`, `digestEmailDay`, `default_messaging_email_frequency`. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:874` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_notification_pref_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-smartcode-fallback"></a>

## `fluent_community/smartcode_fallback`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Filters what an unresolvable smart code is replaced with.

Applied at three points, all of them structural failures rather than missing data: an empty placeholder, one with no dot separator, and one whose value key is empty. A placeholder with a valid group but an unknown group name goes to `fluent_community/smartcode_group_callback_{group}` instead. The default is the matched text itself, which is why an unrecognised code appears verbatim in the output; return an empty string to strip them instead. The user may be `null`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$match` | `string` | The full matched placeholder, including its delimiters. |
| 2 | `$user` | `\FluentCommunity\App\Models\User` | The user the codes are being parsed for, or `null`. |

**Return:** `string` — the replacement text, inserted into the output as-is.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/SmartCodeParser.php:89` | `$matches[0]` (array)<br>`$this->store['user']` (array) |
| Core | `fluent-community/app/Services/SmartCodeParser.php:97` | `$matches[0]` (array)<br>`$this->store['user']` (array) |
| Core | `fluent-community/app/Services/SmartCodeParser.php:105` | `$matches[0]` (array)<br>`$this->store['user']` (array) |

### Example

```php
add_filter('fluent_community/smartcode_fallback', function ($match, $user) {
    return $match;
}, 10, 2);
```

**Related:** [`fluent_community/smartcode_group_callback_{dataKey}`](#fluent-community-smartcode-group-callback-dataKey)

<a id="fluent-community-smartcode-group-callback-dataKey"></a>

## `fluent_community/smartcode_group_callback_{dataKey}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Resolves smart codes belonging to a group core does not handle.

The suffix is the part before the first dot, so `{{crm.company}}` reaches `fluent_community/smartcode_group_callback_crm`. It is the default branch of the parser, so the built-in groups `site`, `user`, `community`, `section` and `course` never reach it. Note the first argument is the raw matched placeholder, not the default value — returning it unchanged leaves the code visible, and the supplied default arrives separately as the third argument. Any trailing transformer such as `ucfirst` is applied to whatever you return.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$match` | `string` | The full matched placeholder, including delimiters. |
| 2 | `$valueKey` | `string` | The part after the group name and before any default or transformer. |
| 3 | `$defaultValue` | `string` | The fallback supplied in the placeholder after the first pipe. Empty when none was given. |
| 4 | `$user` | `\FluentCommunity\App\Models\User` | The user the codes are being parsed for, or `null`. |

**Return:** `string` — the resolved value. A falsy return skips the transformer step.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/SmartCodeParser.php:141` | `$matches[0]` (array)<br>`$valueKey` (mixed)<br>`$defaultValue` (mixed)<br>`static::$store['user']` (array) |

### Example

```php
add_filter('fluent_community/smartcode_group_callback_{dataKey}', function ($match, $valueKey, $defaultValue, $user) {
    return $match;
}, 10, 4);
```

**Related:** [`fluent_community/smartcode_fallback`](#fluent-community-smartcode-fallback)

<a id="fluent-community-unread-notifications-api-response"></a>

## `fluent_community/unread_notifications_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the unread-notification response used by the header dropdown.

Distinct from the paginated listing: it returns at most 50 unread notifications with no paging, and its `unread_count` is a separate query that can therefore exceed the number of items returned. The type filter from the request applies to the list but not to the count.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload: `notifications` list and `unread_count`. |
| 2 | `$requestData` | `array` | The full request parameters, including `notification_type`. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/NotificationsController.php:59` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/unread_notifications_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/notifications_api_response`](#fluent-community-notifications-api-response)

<a id="fluent-community-verified-email-senders"></a>

## `fluent_community/verified_email_senders`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the sender addresses offered when configuring community emails.

Populated from FluentSMTP's configured sender mappings, and empty when FluentSMTP is not installed. It is a flat list of email addresses surfaced to the admin screen as `verified_email_senders`; it drives the selectable options only and enforces nothing at send time.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$verifiedSenders` | `array` | Email address strings. |

**Return:** `array` — a flat list of email addresses.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1267` | `$verifiedSenders` (mixed) |

### Example

```php
add_filter('fluent_community/verified_email_senders', function ($verifiedSenders) {
    return $verifiedSenders;
}, 10, 1);
```

