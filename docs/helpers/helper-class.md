---
title: Helper Class
description: Source-backed reference for the FluentCommunity App Services Helper class.
---

# Helper Class Reference

The current helper service lives in `FluentCommunity\App\Services\Helper` and is entirely static.

## Portal Helpers

### `getPortalSlug($forRoute = false)`

Returns the configured portal slug, optionally normalized for route matching.

```php
use FluentCommunity\App\Services\Helper;

$slug = Helper::getPortalSlug();
$routeSlug = Helper::getPortalSlug(true);
```

The value can be overridden by the `FLUENT_COMMUNITY_PORTAL_SLUG` constant and filtered through `fluent_community/portal_slug`.

### `getPortalRouteType()`

Returns the route mode used by the frontend. The default in the current code is `WebHistory`.

```php
$routeType = Helper::getPortalRouteType();
```

### `isHeadless()`

Returns whether the portal is being rendered in headless mode.

```php
if (Helper::isHeadless()) {
    // Headless portal flow is active.
}
```

This is controlled through the `fluent_community/portal_page_headless` filter.

### `baseUrl($path = '')`

Builds a portal URL that respects the configured slug and route type.

```php
$home = Helper::baseUrl('/');
$members = Helper::baseUrl('members');
```

### `getPortalRequestPath($requestUri)`

Normalizes an incoming request path and returns the internal portal route when the request belongs to FluentCommunity.

This is the helper `PortalHandler` uses when the portal is mounted at the site root.

## User and Access Helpers

### `getCurrentProfile($cached = true)`

Returns the current `XProfile` model or `null`.

```php
$profile = Helper::getCurrentProfile();
```

### `getCurrentUser($cached = true)`

Returns the current `User` model or `false`.

```php
$user = Helper::getCurrentUser();
```

### `isSuperAdmin($userId = null)`

Checks the filtered capability from `fluent_community/super_admin_capability`, which defaults to `manage_options`.

### `isSiteAdmin($userId = null, $user = null)`

Returns `true` for a super admin or for a user whose FluentCommunity permissions contain `community_admin`.

### `isModerator($user = null)`

Checks whether the current or provided user has moderator-level access.

### `canAccessPortal($userId = null)`

Used internally to determine whether the current visitor can enter the portal.

## Space and Membership Helpers

### `getUserSpaceIds($userId = null)`

Returns the active `space_id` values from `SpaceUserPivot`.

```php
$spaceIds = Helper::getUserSpaceIds($userId);
```

### `getUserSpaces($userId = null)`

Returns the user's spaces as loaded `Space` models.

### `isUserInSpace($userId, $spaceId)`

Returns `true` only for active space memberships.

### `addToSpace($space, $userId, $role = 'member', $by = 'self')`

Adds or reactivates a membership for a space or course.

```php
Helper::addToSpace(12, 34, 'member', 'by_admin');
```

Important behavior from the current implementation:

- accepts either a space ID or a `BaseSpace` model
- converts `member` to `student` when the target space is a course
- fires `fluent_community/space/joined` or `fluent_community/course/enrolled`

### `removeFromSpace($space, $userId, $by = 'self')`

Deletes the membership record for the given user and space or course.

```php
Helper::removeFromSpace(12, 34, 'by_admin');
```

### `getSpaceMeta($spaceId, $key, $default = null)` and `updateSpaceMeta($spaceId, $key, $value)`

Low-level helpers for `space` meta records in `fcom_meta`.

Use model-level methods such as `BaseSpace::getCustomMeta()` when you already have the model instance.

## Media and Content Helpers

### `getMediaFromUrl($url)`

Parses the `media_key` query argument from a FluentCommunity media URL and resolves the related `Media` model.

If the provider is `giphy`, the helper returns `null`.

### `getMediaItemsFromUrl($urls)`

Bulk helper for multiple media URLs.

### `removeMediaByUrl($url, $subObjectId = null)`

Delegates removal through the `fluent_community/remove_medias_by_url` action.

### `getHumanExcerpt($content, $length = 100)`

Generates a shortened plain-text excerpt from content.

### `htmlToMd($html)`

Performs a lightweight HTML-to-Markdown link conversion.

## Menu and UI Helpers

### `getMenuItemsGroup($context = 'view')`

Builds the configured main community menu groups, mixing stored options with system links such as feed, spaces, courses, members, and leaderboard.

### `getMobileMenuItems($context = 'headless')`

Builds the mobile nav item payload and filters it through `fluent_community/mobile_menu`.

### `getFeedLinks()` and `updateFeedLinks($links)`

Read and write the stored feed link configuration.

## Security and Formatting Helpers

### `encryptDecrypt($value, $type = 'e')`

Encrypts or decrypts values using `aes-256-ctr` when OpenSSL is available.

The helper uses:

- `FLUENT_COM_ENCRYPT_SALT` or `LOGGED_IN_SALT`
- `FLUENT_COM__ENCRYPT_KEY` or `LOGGED_IN_KEY`

This is the same mechanism the Pro cloud storage config uses for stored credentials.

### `getIp($anonymize = false)`

Returns the current client IP and can anonymize it for privacy-sensitive contexts.

### `getDateFormatter($isDayJs = false)` and `getTimeFormatter($isDayJs = false)`

Return the WordPress date and time format, or convert it to Day.js format when `$isDayJs` is `true`.

### `convertPhpDateToDayJSFormay($phpFormat)`

Maps WordPress/PHP date format tokens to the Day.js equivalents used by the frontend.
