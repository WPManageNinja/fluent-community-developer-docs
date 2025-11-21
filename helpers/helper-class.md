<DocStatusBanner />

# Helper Class Reference ​

## Introduction ​

The `Helper` class (located at `FluentCommunity\App\Functions\Utility`) provides a comprehensive set of utility functions for working with Fluent Community. This reference documents all available methods with their parameters, return types, and usage examples.

## Portal Configuration Methods ​

### getPortalSlug() ​

Retrieves the portal slug used in URLs.

**Signature:**
```php
public static function getPortalSlug(): string
```

**Returns:** `string` - The portal slug (default: 'community')

**Example:**
```php
use FluentCommunity\App\Functions\Utility;

$slug = Utility::getPortalSlug();
// Returns: 'community' (or custom slug if configured)
```

**Filter Hook:**
```php
// Customize the portal slug
add_filter('fluent_community/portal_slug', function($slug) {
    return 'my-portal';
});
```

---

### getPortalRouteType() ​

Gets the portal route type for Vue Router configuration.

**Signature:**
```php
public static function getPortalRouteType(): string
```

**Returns:** `string` - The portal route type (default: 'WebHistory')

**Example:**
```php
$routeType = Utility::getPortalRouteType();
// Returns: 'WebHistory' or 'Hash'
```

**Filter Hook:**
```php
// Change route type to Hash mode
add_filter('fluent_community/portal_route_type', function($type) {
    return 'Hash';
});
```

---

### isHeadless() ​

Checks if the portal is running in headless mode (without WordPress theme).

**Signature:**
```php
public static function isHeadless(): bool
```

**Returns:** `bool` - True if headless mode is enabled, false otherwise

**Example:**
```php
if (Utility::isHeadless()) {
    // Portal is running in headless mode
    // No WordPress theme elements will be loaded
}
```

**Filter Hook:**
```php
// Enable headless mode
add_filter('fluent_community/portal_page_headless', function($isHeadless) {
    return true;
});
```

---

### hasColorScheme() ​

Checks if the portal has color scheme support enabled.

**Signature:**
```php
public static function hasColorScheme(): bool
```

**Returns:** `bool` - True if color scheme is supported, false otherwise

**Example:**
```php
if (Utility::hasColorScheme()) {
    // Color scheme switching is available
}
```

**Filter Hook:**
```php
// Enable color scheme support
add_filter('fluent_community/has_color_scheme', function($hasScheme) {
    return true;
});
```

---

### baseUrl() ​

Generates the base URL for the portal with optional path.

**Signature:**
```php
public static function baseUrl(string $path = ''): string
```

**Parameters:**
- `$path` (string, optional) - Path to append to the base URL

**Returns:** `string` - The full base URL

**Example:**
```php
// Get base portal URL
$baseUrl = Utility::baseUrl();
// Returns: 'https://example.com/community'

// Get URL with path
$feedUrl = Utility::baseUrl('feeds/123');
// Returns: 'https://example.com/community/feeds/123'
```

---

## User & Profile Methods ​

### getCurrentProfile() ​

Retrieves the current logged-in user's profile.

**Signature:**
```php
public static function getCurrentProfile(bool $cached = true): ?\FluentCommunity\App\Models\XProfile
```

**Parameters:**
- `$cached` (bool, optional) - Whether to use cached profile data (default: true)

**Returns:** `XProfile|null` - The user's profile object or null if not found

**Example:**
```php
$profile = Utility::getCurrentProfile();

if ($profile) {
    echo $profile->display_name;
    echo $profile->total_points;
    echo $profile->status;
}
```

---

### getCurrentUser() ​

Gets the current logged-in user model.

**Signature:**
```php
public static function getCurrentUser(bool $cached = true): \FluentCommunity\App\Models\User|false
```

**Parameters:**
- `$cached` (bool, optional) - Whether to use cached user data (default: true)

**Returns:** `User|false` - The User model or false if not found

**Example:**
```php
$user = Utility::getCurrentUser();

if ($user) {
    echo $user->display_name;
    echo $user->user_email;
    
    // Access relationships
    $spaces = $user->spaces;
    $feeds = $user->feeds;
}
```

---

### isSiteAdmin() ​

Checks if a user has site admin capabilities.

**Signature:**
```php
public static function isSiteAdmin(?int $userId = null): bool
```

**Parameters:**
- `$userId` (int|null, optional) - The user ID to check. If null, checks the current user

**Returns:** `bool` - True if the user is a site admin, false otherwise

**Example:**
```php
// Check current user
if (Utility::isSiteAdmin()) {
    // Current user is site admin
}

// Check specific user
if (Utility::isSiteAdmin(123)) {
    // User ID 123 is site admin
}
```

---

## Space Management Methods ​

### addToSpace() ​

Adds a user to a space with a specified role.

**Signature:**
```php
public static function addToSpace(int $spaceId, int $userId, string $role = 'member', string $by = 'self'): bool
```

**Parameters:**
- `$spaceId` (int) - The ID of the space
- `$userId` (int) - The ID of the user to add
- `$role` (string, optional) - The role of the user in the space (default: 'member')
- `$by` (string, optional) - The method of adding ('self' or 'by_admin', default: 'self')

**Returns:** `bool` - True if added successfully, false if user is already in space or space/user not found

**Example:**
```php
// Add user as member
$added = Utility::addToSpace(10, 123);

// Add user as moderator
$added = Utility::addToSpace(10, 123, 'moderator', 'by_admin');

if ($added) {
    // User successfully added to space
}
```

**Available Roles:**
- `member` - Regular space member
- `moderator` - Space moderator
- `admin` - Space administrator

---

### removeFromSpace() ​

Removes a user from a space.

**Signature:**
```php
public static function removeFromSpace(int $spaceId, int $userId, string $by = 'self'): bool
```

**Parameters:**
- `$spaceId` (int) - The ID of the space
- `$userId` (int) - The ID of the user to remove
- `$by` (string, optional) - The method of removal ('self' or 'by_admin', default: 'self')

**Returns:** `bool` - True if removed successfully, false if user is not in space or space/user not found

**Example:**
```php
// User leaves space
$removed = Utility::removeFromSpace(10, 123, 'self');

// Admin removes user from space
$removed = Utility::removeFromSpace(10, 123, 'by_admin');

if ($removed) {
    // User successfully removed from space
}
```

---

## Menu & Navigation Methods ​

### getMenuItemsGroup() ​

Retrieves the menu items group based on context.

**Signature:**
```php
public static function getMenuItemsGroup(string $context = 'view'): array
```

**Parameters:**
- `$context` (string, optional) - The context for getting menu items ('view' or 'edit', default: 'view')

**Returns:** `array` - The menu items group

**Example:**
```php
// Get menu items for viewing
$menuItems = Utility::getMenuItemsGroup('view');

// Get menu items for editing
$editMenuItems = Utility::getMenuItemsGroup('edit');

foreach ($menuItems as $group => $items) {
    // Process menu items
}
```

---

## Media Handling Methods ​

### getMediaFromUrl() ​

Retrieves a Media object from a URL.

**Signature:**
```php
public static function getMediaFromUrl(string|array $url): ?\FluentCommunity\App\Models\Media
```

**Parameters:**
- `$url` (string|array) - The URL or an array containing URL information

**Returns:** `Media|null` - The Media object if found, null otherwise

**Example:**
```php
$media = Utility::getMediaFromUrl('https://example.com/uploads/image.jpg');

if ($media) {
    echo $media->title;
    echo $media->media_type;
    echo $media->file_size;
}
```

---

## Security & Utility Methods ​

### encryptDecrypt() ​

Encrypts or decrypts a value using AES-256-CTR encryption.

**Signature:**
```php
public static function encryptDecrypt(string $value, string $type = 'e'): string|false
```

**Parameters:**
- `$value` (string) - The value to encrypt or decrypt
- `$type` (string, optional) - The operation type ('e' for encrypt, 'd' for decrypt, default: 'e')

**Returns:** `string|false` - The encrypted/decrypted value, or false on error

**Example:**
```php
// Encrypt a value
$encrypted = Utility::encryptDecrypt('sensitive-data', 'e');

// Decrypt a value
$decrypted = Utility::encryptDecrypt($encrypted, 'd');

if ($decrypted !== false) {
    // Successfully decrypted
}
```

::: warning Security Note
This method uses OpenSSL with AES-256-CTR encryption. Make sure your WordPress installation has proper security keys configured in wp-config.php.
:::

---

### getIp() ​

Gets the user's IP address with optional anonymization.

**Signature:**
```php
public static function getIp(bool $anonymize = false): string
```

**Parameters:**
- `$anonymize` (bool, optional) - Whether to anonymize the IP address (default: false)

**Returns:** `string` - The IP address

**Example:**
```php
// Get full IP address
$ip = Utility::getIp();
// Returns: '192.168.1.100'

// Get anonymized IP address
$anonymizedIp = Utility::getIp(true);
// Returns: '192.168.1.0' (last octet removed for IPv4)
```

::: tip
This method handles various server configurations and proxies (HTTP_CLIENT_IP, HTTP_X_FORWARDED_FOR, etc.) to accurately determine the user's IP address.
:::

---

## Related Documentation ​

- [Database Models](/database/models.md) - Learn about User, XProfile, Space, and Media models
- [Code Snippets](/guides/code-snippets.md) - Practical examples using Helper functions
- [Filter Hooks](/hooks/filters/) - Customize Helper function behavior

