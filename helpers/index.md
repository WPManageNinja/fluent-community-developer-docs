<DocStatusBanner />

# Helper Functions ​

## Introduction ​

Fluent Community provides a comprehensive `Helper` class with utility functions that make it easier to work with the plugin. These helper functions cover common tasks like portal configuration, user management, space operations, media handling, and more.

::: tip
The Helper class is located at `FluentCommunity\App\Functions\Utility::class` and provides static methods that can be called from anywhere in your code.
:::

## Accessing the Helper Class ​

You can access the Helper class methods using the following syntax:

```php
use FluentCommunity\App\Functions\Utility;

// Example: Get the portal slug
$portalSlug = Utility::getPortalSlug();

// Example: Check if user is site admin
$isAdmin = Utility::isSiteAdmin($userId);
```

## Available Helper Methods ​

The Helper class provides the following categories of utility functions:

### Portal Configuration ​
- [getPortalSlug()](#getportalslug) - Get the portal URL slug
- [getPortalRouteType()](#getportalroutetype) - Get the portal route type
- [isHeadless()](#isheadless) - Check if portal is in headless mode
- [hasColorScheme()](#hascolorscheme) - Check for color scheme support
- [baseUrl()](#baseurl) - Generate portal base URL

### User & Profile Management ​
- [getCurrentProfile()](#getcurrentprofile) - Get current user's profile
- [getCurrentUser()](#getcurrentuser) - Get current user model
- [isSiteAdmin()](#issiteadmin) - Check if user is site admin

### Space Management ​
- [addToSpace()](#addtospace) - Add user to a space
- [removeFromSpace()](#removefromspace) - Remove user from a space

### Menu & Navigation ​
- [getMenuItemsGroup()](#getmenuitemsgroup) - Get menu items group

### Media Handling ​
- [getMediaFromUrl()](#getmediafromurl) - Get media object from URL

### Security & Utilities ​
- [encryptDecrypt()](#encryptdecrypt) - Encrypt or decrypt values
- [getIp()](#getip) - Get user's IP address

## Next Steps ​

- Explore the [Helper Class Reference](./helper-class.md) for detailed documentation of each method
- Check out [Code Snippets](/guides/code-snippets.md) for practical examples
- Learn about [Database Models](/database/models.md) for working with data

