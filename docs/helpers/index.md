---
title: Helpers
description: Overview of the FluentCommunity helper APIs and the static Helper service.
---

# Helpers

FluentCommunity exposes a large static helper surface through `FluentCommunity\App\Services\Helper`. These methods are used throughout the plugin for portal URLs, membership operations, media lookup, menu building, encryption, and formatting.

This section restores the old `helpers/` area from the previous docs site, but aligned to the current source tree and method signatures.

## Class Location

```php
use FluentCommunity\App\Services\Helper;
```

Do not confuse this with `FluentCommunity\App\Functions\Utility`. `Utility` is a separate option and settings helper. The older helper docs mixed those classes together.

## Most Useful Helper Groups

### Portal and Routing

- `getPortalSlug()`
- `getPortalRouteType()`
- `isHeadless()`
- `baseUrl()`
- `getPortalRequestPath()`

### User and Access

- `getCurrentProfile()`
- `getCurrentUser()`
- `isSuperAdmin()`
- `isSiteAdmin()`
- `isModerator()`
- `canAccessPortal()`

### Spaces and Membership

- `getUserSpaceIds()`
- `getUserSpaces()`
- `isUserInSpace()`
- `addToSpace()`
- `removeFromSpace()`
- `getSpaceMeta()`
- `updateSpaceMeta()`

### Media and Content

- `getMediaFromUrl()`
- `getMediaItemsFromUrl()`
- `removeMediaByUrl()`
- `getHumanExcerpt()`
- `htmlToMd()`

### UI and Navigation

- `getMenuItemsGroup()`
- `getMobileMenuItems()`
- `getFeedLinks()`
- `updateFeedLinks()`

### Formatting and Security

- `encryptDecrypt()`
- `getIp()`
- `getDateFormatter()`
- `getTimeFormatter()`
- `convertPhpDateToDayJSFormay()`

## Next Page

- [Helper Class Reference](/helpers/helper-class)
