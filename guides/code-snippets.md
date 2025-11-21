<DocStatusBanner />

# Code Snippets & Recipes ​

## Introduction ​

This guide provides a collection of practical code snippets for developers working with Fluent Community. These snippets help you customize and extend the plugin's functionality to meet your specific needs.

::: tip Snippet Management
We recommend using [FluentSnippet plugin](https://wordpress.org/plugins/easy-code-manager/) to manage these code snippets safely.
:::

## Portal Configuration ​

### Modify Portal URL Slug ​

By default, the portal URL is `/portal`. You can change it from the admin settings or programmatically.

**Change Portal Slug:**
```php
// Add to wp-config.php
define('FLUENT_COMMUNITY_PORTAL_SLUG', 'community');
```

**Make Portal Your Homepage:**
```php
// Add to wp-config.php
define('FLUENT_COMMUNITY_PORTAL_SLUG', '');
```

::: warning Important
- This code must be placed in your `wp-config.php` file
- After adding, resave the permalink settings to flush rewrite rules
- Homepage setup only works if WordPress is in the root directory (not a subdirectory)
:::

---

### Add Custom CSS to Portal ​

**Inline CSS:**
```php
add_action('fluent_community/portal_head', function() {
    ?>
    <style>
        /* Add your custom CSS here */
        .fcom-header {
            background-color: #1a1a1a;
        }
    </style>
    <?php
});
```

**External CSS File:**
```php
add_action('fluent_community/portal_head', function() {
    ?>
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/custom-portal.css" media="all">
    <?php
});
```

**Add Custom JavaScript:**
```php
add_action('fluent_community/portal_footer', function() {
    ?>
    <script>
        // Add your custom JavaScript here
    </script>
    <?php
});
```

---

### Check if Feature Module is Enabled ​

```php
use FluentCommunity\App\Services\Helper;

$featureModule = 'course_module'; // Available modules below

if (Helper::isFeatureEnabled($featureModule)) {
    // Feature is enabled
} else {
    // Feature is disabled
}
```

**Available Feature Modules:**
- `leader_board_module` - Leaderboard feature
- `course_module` - Course/learning feature
- `giphy_module` - Giphy integration
- `emoji_module` - Emoji reactions
- `cloud_storage` - Cloud storage (S3, R2, etc.)
- `user_badge` - User badges

---

## Space Management ​

### Add User to Space ​

```php
use FluentCommunity\App\Services\Helper;

$spaceId = 1;  // Space ID
$userId = 1;   // User ID
$role = 'member';  // member, moderator, admin
$by = 'by_admin';  // 'by_admin' or 'self'

$added = Helper::addToSpace($spaceId, $userId, $role, $by);

if ($added) {
    // User successfully added to space
}
```

**Available Roles:**
- `member` - Regular space member
- `moderator` - Space moderator with moderation permissions
- `admin` - Space administrator with full permissions

---

### Remove User from Space ​

```php
use FluentCommunity\App\Services\Helper;

$spaceId = 1;  // Space ID
$userId = 1;   // User ID
$by = 'by_admin';  // 'by_admin' or 'self'

$removed = Helper::removeFromSpace($spaceId, $userId, $by);

if ($removed) {
    // User successfully removed from space
}
```

---

### Get User's Space IDs ​

```php
use FluentCommunity\App\Services\Helper;

$userId = 1;
$spaceIds = Helper::getUserSpaceIds($userId);

// Returns: [1, 5, 10, 15]
```

---

### Get User's Spaces ​

```php
use FluentCommunity\App\Services\Helper;

$userId = 1;
$spaces = Helper::getUserSpaces($userId);

// Returns: Collection of Space objects
foreach ($spaces as $space) {
    echo $space->title;
    echo $space->slug;
}
```

---

### Get All Spaces ​

```php
use FluentCommunity\App\Functions\Utility;

// Get all spaces (including published and draft)
$byGroup = false;  // true to get spaces grouped by space groups
$spaces = Utility::getSpaces($byGroup);

// Returns: Collection of Space objects
foreach ($spaces as $space) {
    echo $space->title;
    echo $space->status;  // published, draft
}
```

---

## Course Management ​

### Add User to Course ​

```php
use FluentCommunity\Modules\Course\Services\CourseHelper;

$courseId = 1;  // Course ID
$userId = 1;    // User ID

CourseHelper::enrollCourse($courseId, $userId);
```

---

### Remove User from Course ​

```php
use FluentCommunity\Modules\Course\Services\CourseHelper;

$courseId = 1;  // Course ID
$userId = 1;    // User ID

CourseHelper::leaveCourse($courseId, $userId);
```

---

### Add User to Multiple Courses ​

```php
use FluentCommunity\Modules\Course\Services\CourseHelper;

$courseIds = [1, 2, 3];  // Course IDs
$userId = 1;             // User ID

CourseHelper::enrollCourses($courseIds, $userId);
```

---

### Remove User from Multiple Courses ​

```php
use FluentCommunity\Modules\Course\Services\CourseHelper;

$courseIds = [1, 2, 3];  // Course IDs
$userId = 1;             // User ID

CourseHelper::leaveCourses($courseIds, $userId);
```

---

### Get User's Courses ​

```php
use FluentCommunity\Modules\Course\Services\CourseHelper;

$userId = 1;
$courses = CourseHelper::getUserCourses($userId);

// Returns: Collection of Course objects
foreach ($courses as $course) {
    echo $course->title;
    echo $course->slug;
}
```

---

### Get All Courses ​

```php
use FluentCommunity\App\Functions\Utility;

// Get all courses (including published and draft)
$byGroup = false;  // true to get courses grouped by course groups
$courses = Utility::getCourses($byGroup);

// Returns: Collection of Space objects (courses are spaces with type='course')
foreach ($courses as $course) {
    echo $course->title;
    echo $course->status;
}
```

---

## Feed Management ​

### Create New Post Programmatically ​

```php
use FluentCommunity\App\Services\FeedsHelper;

$feedData = [
    'title' => 'Post Title',
    'message' => 'Post Content',  // Markdown format
    'space_id' => 1,  // Space ID
    'user_id' => 1,   // User ID
];

// Optional: Add embedded video (YouTube, Vimeo, etc.)
$feedData['media']['url'] = 'https://www.youtube.com/watch?v=video_id';
$feedData['media']['type'] = 'oembed';

$feed = FeedsHelper::createFeed($feedData);

if (is_wp_error($feed)) {
    // Handle error
    $errorMessage = $feed->get_error_message();
} else {
    // Success
    $createdFeedId = $feed->id;
    $permalink = $feed->getPermalink();
}
```

---

## User Profile Management ​

### Get User Profile ​

```php
use FluentCommunity\App\Services\ProfileHelper;

$userId = 1;
$profile = ProfileHelper::getProfile($userId);

if ($profile) {
    // Access profile properties
    echo $profile->display_name;
    echo $profile->username;
    echo $profile->total_points;
    echo $profile->is_verified;
    
    // Access relationships
    $profileSpaces = $profile->spaces;
    $profileCourses = $profile->courses;
    $profilePosts = $profile->posts;
}
```

**Profile Model Properties:**
- `id` - Profile ID
- `user_id` - WordPress user ID
- `total_points` - User's total points
- `username` - Unique username
- `status` - Profile status (active, suspended, etc.)
- `is_verified` - Verification status (0 or 1)
- `display_name` - Display name
- `avatar` - Avatar URL
- `short_description` - Bio/description
- `last_activity` - Last activity timestamp
- `meta` - Additional metadata (array)
- `created_at` - Profile creation date
- `updated_at` - Last update date

**Profile Model Relationships:**
- `user` - WordPress User model
- `spaces` - Collection of Space models
- `courses` - Collection of Course models
- `posts` - Collection of Feed models

**Profile Model Methods:**
- `getCrmContact()` - Get FluentCRM contact (if FluentCRM is installed)
- `getCompletionScore()` - Get profile completion percentage

---

## Media & Performance ​

### Disable Image Processing ​

By default, Fluent Community resizes images and converts them to WebP format for optimization.

```php
// Disable image resizing
add_filter('fluent_community/media_upload_resize', '__return_false', 10);

// Disable WebP conversion
add_filter('fluent_community/convert_image_to_webp', '__return_false', 10);
```

::: danger Warning
We highly recommend keeping these features enabled for better performance and user experience. Only disable if you have a specific reason.
:::

---

## Related Documentation ​

- [Helper Functions](/helpers/) - Complete helper function reference
- [Database Models](/database/models.md) - Learn about available models
- [Filter Hooks](/hooks/filters/) - Customize plugin behavior
- [Action Hooks](/hooks/actions/) - Hook into plugin events

