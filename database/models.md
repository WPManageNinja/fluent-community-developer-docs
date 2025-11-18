# Database Models

Fluent Community uses Eloquent-style models to interact with the database. This guide covers the available models and how to use them in your development.

## What are Models?

Models are PHP classes that represent database tables and provide an object-oriented way to interact with data. They handle:

- **Data retrieval** - Query and fetch records
- **Data manipulation** - Create, update, delete records
- **Relationships** - Access related data
- **Validation** - Ensure data integrity
- **Events** - Hook into model lifecycle

---

## Core Models

### Feed Model

Represents community feed posts and content.

**Namespace:** `FluentCommunity\App\Models\Feed`

**Table:** `fcom_posts`

**Fillable Attributes:**

```php
[
    'user_id',           // Author user ID
    'title',             // Post title
    'slug',              // URL-friendly identifier (auto-generated)
    'message',           // Raw message content
    'message_rendered',  // Rendered HTML content
    'type',              // Post type (feed, course_lesson, etc.)
    'content_type',      // Content type (text, document, survey, etc.)
    'space_id',          // Associated space ID
    'privacy',           // Privacy setting
    'status',            // Status (published, pending, draft)
    'priority',          // Display priority
    'featured_image',    // Featured image URL
    'is_sticky',         // Sticky post flag
    'expired_at',        // Expiration timestamp
    'scheduled_at',      // Scheduled publish timestamp
    'comments_count',    // Number of comments (cached)
    'reactions_count',   // Number of reactions (cached)
    'meta',              // Additional metadata (serialized)
    'created_at',        // Creation timestamp
    'updated_at'         // Last update timestamp
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\Feed;

// Get all published feeds
$feeds = Feed::where('status', 'published')->get();

// Get a single feed
$feed = Feed::find(1);

// Create a new feed (slug auto-generated)
$feed = Feed::create([
    'user_id' => 1,
    'space_id' => 5,
    'title' => 'My Feed Post',
    'message' => 'This is the content',
    'type' => 'feed',
    'content_type' => 'text',
    'status' => 'published'
]);

// Update a feed
$feed->update(['title' => 'Updated Title']);

// Delete a feed (also deactivates media and deletes reactions)
$feed->delete();
```

**Relationships:**

```php
// Get feed author (WordPress user)
$author = $feed->user;

// Get feed author's extended profile
$xprofile = $feed->xprofile;

// Get feed space
$space = $feed->space;

// Get feed comments
$comments = $feed->comments;

// Get feed reactions (likes, bookmarks, etc.)
$reactions = $feed->reactions;

// Get survey votes (for survey content type)
$surveyVotes = $feed->surveyVotes();

// Get associated terms/topics
$topics = $feed->terms;

// Get follow records (Pro feature)
$follows = $feed->follows;

// Get activities
$activities = $feed->activities;

// Get notifications
$notifications = $feed->notifications;

// Get media attachments
$media = $feed->media;
```

**Query Scopes:**

```php
// Search in post content and/or comments
$feeds = Feed::searchBy('keyword', ['post_content', 'post_comments'])->get();

// Filter by user access (respects space privacy)
$feeds = Feed::byUserAccess($userId)->get();

// Filter by content moderation status
$feeds = Feed::byContentModerationAccessStatus($user, $space)->get();

// Get bookmarked posts
$feeds = Feed::byBookMarked($userId)->get();

// Filter by topic slug
$feeds = Feed::byTopicSlug('announcements')->get();

// Filter by space slug
$feeds = Feed::filterBySpaceSlug('general')->get();

// Filter by post type
$feeds = Feed::byType('feed')->get();

// Custom ordering
$feeds = Feed::customOrderBy('latest')->get();
// Options: latest, new_activity, oldest, likes, unanswered, alphabetical, popular

// Filter by status
$feeds = Feed::byStatus('published')->get();

// Get posts from followed users (Pro feature)
$feeds = Feed::byFollowing($userId)->get();

// Filter by user ID
$feeds = Feed::filterByUserId($userId)->get();
```

**Helper Methods:**

```php
// Check if user has reacted
$hasLiked = $feed->hasUserReact($userId, 'like');
$hasBookmarked = $feed->hasUserReact($userId, 'bookmark');

// Check edit access
$canEdit = $feed->hasEditAccess($userId);

// Get human-readable excerpt
$excerpt = $feed->getHumanExcerpt(40);

// Get permalink
$url = $feed->getPermalink();
// Or use the appended attribute
$url = $feed->permalink;

// Get JavaScript route object
$route = $feed->getJsRoute();

// Recount statistics
$feed->recountStats();

// Custom meta operations
$feed->updateCustomMeta('custom_key', 'custom_value');
$value = $feed->getCustomMeta('custom_key', 'default_value');

// Attach topics to feed
$feed->attachTopics([1, 2, 3], $sync = false);

// Get survey casts by user
$casts = $feed->getSurveyCastsByUserId($userId);

// Check if email announcement is enabled
$isEnabled = $feed->isEnabledForEveryoneTag();

// Get feed HTML for email
$html = $feed->getFeedHtml($withPlaceholder = false, $buttonText = null);
```

**Automatic Behaviors:**

```php
// On creating:
// - Auto-sets user_id to current user if empty
// - Auto-generates slug from title or message
// - Sets default meta if empty
// - Sets status to 'published' if empty

// On deleting:
// - Deactivates associated media (is_active = 0)
// - Deletes all reactions

// Global scope:
// - Automatically filters by type (default: 'text')
```

---

### Comment Model

Represents comments and replies on feed posts.

**Namespace:** `FluentCommunity\App\Models\Comment`

**Table:** `fcom_post_comments`

**Fillable Attributes:**

```php
[
    'user_id',           // Comment author user ID
    'post_id',           // Associated feed post ID
    'parent_id',         // Parent comment ID (for nested replies)
    'message',           // Raw comment message
    'message_rendered',  // Rendered HTML message
    'meta',              // Additional metadata (serialized)
    'type',              // Comment type (always 'comment')
    'content_type',      // Content type
    'status',            // Status (published, pending)
    'is_sticky',         // Sticky comment flag
    'reactions_count',   // Number of reactions (cached)
    'created_at',        // Creation timestamp
    'updated_at'         // Last update timestamp
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\Comment;

// Get comments for a feed
$comments = Comment::where('post_id', 123)->get();

// Create a comment (type auto-set to 'comment')
$comment = Comment::create([
    'post_id' => 123,
    'user_id' => 1,
    'message' => 'Great post!',
    'message_rendered' => '<p>Great post!</p>',
    'status' => 'published'
]);

// Create a reply (nested comment)
$reply = Comment::create([
    'post_id' => 123,
    'parent_id' => $comment->id,
    'user_id' => 2,
    'message' => 'I agree!',
    'message_rendered' => '<p>I agree!</p>'
]);

// Update a comment
$comment->update(['message' => 'Updated comment']);

// Delete a comment (also deletes child comments, media, activities, notifications)
$comment->delete();
```

**Relationships:**

```php
// Get comment author (WordPress user)
$author = $comment->user;

// Get comment author's extended profile
$xprofile = $comment->xprofile;

// Get related feed post
$feed = $comment->post;

// Get space through feed (hasOneThrough)
$space = $comment->space;

// Get comment reactions
$reactions = $comment->reactions;

// Get attached media
$media = $comment->media;
```

**Query Scopes:**

```php
// Search comments by message
$comments = Comment::searchBy('keyword')->get();

// Filter by content moderation status
$comments = Comment::byContentModerationAccessStatus($user, $space)->get();
```

**Helper Methods:**

```php
// Get all user IDs who commented on parent (including parent author)
$userIds = $comment->getCommentParentUserIds($lastUserId = 0);

// Get human-readable excerpt
$excerpt = $comment->getHumanExcerpt(30);

// Get email subject for notification
$subject = $comment->getEmailSubject($feed = null);

// Get comment HTML for email
$html = $comment->getCommentHtml($withPlaceholder = false, $buttonText = null);
```

**Automatic Behaviors:**

```php
// On creating:
// - Auto-sets user_id to current user if empty
// - Auto-sets type to 'comment'
// - Sets status to 'published' if empty

// On deleting:
// - Deactivates associated media (is_active = 0)
// - Deletes related activities
// - Deletes related notifications
// - Recursively deletes all child comments

// Global scope:
// - Automatically filters by type = 'comment'
```

---

### Space Model

Represents community spaces (groups/categories). Extends `BaseSpace` model.

**Namespace:** `FluentCommunity\App\Models\Space`

**Base Class:** `FluentCommunity\App\Models\BaseSpace`

**Table:** `fcom_spaces`

**Type:** `community` (filtered by global scope)

**Fillable Attributes:**

```php
[
    'created_by',    // Creator user ID
    'parent_id',     // Parent space/group ID
    'title',         // Space title
    'slug',          // URL-friendly identifier (auto-generated)
    'description',   // Space description
    'logo',          // Logo image URL
    'cover_photo',   // Cover photo URL
    'type',          // Space type (community, course, sidebar_link)
    'privacy',       // Privacy setting (public, private, secret)
    'status',        // Status (active, inactive)
    'serial',        // Display order
    'settings'       // Additional settings (serialized)
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\Space;

// Get all public community spaces
$spaces = Space::where('privacy', 'public')->get();

// Get a space with members
$space = Space::with('members')->find(1);

// Create a space (slug and type auto-generated)
$space = Space::create([
    'title' => 'Developers',
    'description' => 'Space for developers',
    'privacy' => 'public',
    'created_by' => 1
]);

// Update space with custom data
$space->updateCustomData([
    'title' => 'Updated Title',
    'description' => 'Updated description',
    'logo' => 'https://example.com/logo.png',
    'cover_photo' => 'https://example.com/cover.jpg',
    'privacy' => 'private',
    'settings' => [
        'restricted_post_only' => 'yes',
        'layout_style' => 'timeline'
    ]
], $removeSrc = false);
```

**Relationships:**

```php
// Get space owner/creator
$owner = $space->owner;

// Get space members (with pivot data: role, created_at, status)
$members = $space->members;

// Get space members with extended profiles
$xMembers = $space->x_members;

// Get space admins and moderators
$admins = $space->admins;

// Get space posts/feeds
$posts = $space->posts;

// Get space comments (through feeds)
$comments = $space->comments;

// Get parent group
$group = $space->group;

// Get space pivot data
$pivot = $space->space_pivot;
```

**Query Scopes:**

```php
// Search by title or description
$spaces = Space::searchBy('keyword')->get();

// Get only main spaces (community or course types)
$spaces = Space::onlyMain()->get();

// Filter by user access (public or user's spaces)
$spaces = Space::filterByUserId($userId)->get();

// Filter by user access with membership check
$spaces = Space::byUserAccess($userId)->get();
```

**Helper Methods:**

```php
// Get user membership in space
$membership = $space->getMembership($userId);

// Check if space is a course
$isCourse = $space->isCourseSpace();

// Check if user is admin (optionally check moderator too)
$isAdmin = $space->isAdmin($userId, $checkModerator = false);

// Check if space is content space (community or course)
$isContentSpace = $space->isContentSpace();

// Get public permissions
$permissions = $space->getPublicPermissions();

// Get user permissions
$permissions = $space->getUserPermissions($user);

// Check if user can view members
$canView = $space->canViewMembers($user);

// Verify user permission (throws exception if no permission)
$hasPermission = $space->verifyUserPermisson($user, 'can_create_post', $exception = true);

// Get permalink
$url = $space->getPermalink();

// Lockscreen operations
$space->setLockscreen($settingFields);
$lockscreen = $space->getLockscreen();

// Check paywall integration
$hasPaywall = $space->hasPaywallIntegration();

// Custom meta operations
$value = $space->getCustomMeta('custom_key', 'default_value');
$space->updateCustomMeta('custom_key', 'custom_value');

// Get icon markup (logo, emoji, or SVG)
$icon = $space->getIconMark($isHtml = true);

// Sync topics to space
$space->syncTopics([1, 2, 3]);

// Format space data for frontend
$formattedSpace = $space->formatSpaceData($user);
```

**Default Settings:**

```php
[
    'restricted_post_only'  => 'no',
    'emoji'                 => '',
    'shape_svg'             => '',
    'custom_lock_screen'    => 'no',
    'can_request_join'      => 'no',
    'layout_style'          => 'timeline',
    'show_sidebar'          => 'yes',
    'show_paywalls'         => 'no',
    'og_image'              => '',
    'links'                 => [],
    'document_library'      => 'no',
    'document_access'       => 'members_only',
    'disable_post_sort_by'  => 'no',
    'default_post_sort_by'  => '',
    'document_upload'       => 'admin_only',
    'topic_required'        => 'no',
    'hide_members_count'    => 'no',
    'onboard_redirect_url'  => '',
    'members_page_status'   => 'members_only', // members_only, everybody, logged_in, admin_only
]
```

**Automatic Behaviors:**

```php
// On creating:
// - Auto-sets created_by to current user if empty
// - Auto-generates slug from title
// - Auto-sets type to 'community'

// On deleting:
// - Deactivates associated media (logo, cover_photo)

// Global scope:
// - Automatically filters by type = 'community'
```

---

### User Model

Extends WordPress `wp_users` table with community features and permissions.

**Namespace:** `FluentCommunity\App\Models\User`

**Table:** `users` (WordPress core table)

**Primary Key:** `ID`

**Timestamps:** `false` (uses WordPress user_registered)

**Hidden Attributes:** `user_pass`, `user_activation_key`

**Appended Attributes:** `photo` (dynamic avatar/gravatar)

**Basic Usage:**

```php
use FluentCommunity\App\Models\User;

// Get a user
$user = User::find(1);

// Get user's display name
$displayName = $user->getDisplayName();

// Get user's general data
$data = $user->getGeneralData();

// Get user's photo (auto-generated from gravatar or custom)
$photo = $user->photo;

// Check if user is verified
$isVerified = $user->isVerified();
```

**Relationships:**

```php
// Get user's extended profile
$xprofile = $user->xprofile;

// Get user's spaces (with pivot: role, status, created_at)
$spaces = $user->spaces;

// Get user's courses
$courses = $user->courses;

// Get user's followers (Pro feature)
$followers = $user->followers;

// Get users this user follows (Pro feature)
$follows = $user->follows;

// Get user's WordPress meta
$usermeta = $user->usermeta;

// Get user's messages (if FluentMessaging is active)
$messages = $user->messages;

// Get user's notification subscriptions
$notificationSubscriptions = $user->notificationSubscriptions;

// Get user's notification records
$notificationRecords = $user->notification_records;

// Get user's CRM contact (if FluentCRM is active)
$crmContact = $user->crm_contact;

// Get user's community role meta
$communityRole = $user->community_role;

// Get space pivot data
$spacePivot = $user->space_pivot;
```

**Query Scopes:**

```php
// Search by display name or email
$users = User::searchBy('john')->get();

// Search for mentions (by display name or username)
$users = User::mentionBy('john')->get();
```

**Community Roles & Permissions:**

```php
// Get user's community roles
$roles = $user->getCommunityRoles(); // ['admin', 'moderator', etc.]

// Check if user is community admin
$isAdmin = $user->isCommunityAdmin();

// Check if user is community moderator
$isModerator = $user->isCommunityModerator();

// Check if user has moderator access
$hasModAccess = $user->hasCommunityModeratorAccess();

// Check if user has admin access
$hasAdminAccess = $user->hasCommunityAdminAccess();

// Check if user has course creator access
$hasCourseAccess = $user->hasCourseCreatorAccess();

// Check if user is space moderator
$isSpaceMod = $user->isSpaceModerator();

// Check if user has space manage access
$hasManageAccess = $user->hasSpaceManageAccess();

// Get user's role in specific space
$role = $user->getSpaceRole($space); // 'admin', 'moderator', 'member', 'student', 'pending', ''

// Get user's global permissions
$permissions = $user->getPermissions($cached = true);

// Get user's permissions in specific space
$spacePermissions = $user->getSpacePermissions($space);

// Check specific community permission
$canEdit = $user->hasCommunityPermission('edit_any_feed');

// Check specific space permission
$canPost = $user->hasSpacePermission('can_create_post', $space);

// Verify permission (throws exception if no permission)
$user->verifyCommunityPermission('delete_any_feed');
$user->verifySpacePermission('can_create_post', $space);

// Check permission (shorthand)
$canDo = $user->can('edit_any_feed', $space = null);

// Check permission in current space or globally
$hasPermission = $user->hasPermissionOrInCurrentSpace('edit_any_feed', $space);
```

**Feed Permissions:**

```php
// Check if user can edit feed
$canEdit = $user->canEditFeed($feed, $throwException = false);

// Check if user can delete feed
$canDelete = $user->canDeleteFeed($feed, $throwException = false);
```

**Space Management:**

```php
// Check if user is not member of any space
$isNotMember = $user->isNotMemberOfAnySpace();

// Get user's space IDs (cached)
$spaceIds = $user->getSpaceIds($cached = true);

// Cache user's accessible spaces
$spaces = $user->cacheAccessSpaces();
```

**Profile & Data Management:**

```php
// Get user's general data
$data = $user->getGeneralData();
// Returns: is_contact, first_name, last_name, full_name, display_name, bio, website, id, user_id, created_at, photo, username, is_verified

// Get display name
$name = $user->getDisplayName();

// Update custom data (syncs with WordPress and FluentCRM if enabled)
$user->updateCustomData([
    'first_name' => 'John',
    'last_name' => 'Doe',
    'short_description' => 'Developer',
    'website' => 'https://example.com'
], $removeSrc = false);

// Sync XProfile (creates or updates extended profile)
$xprofile = $user->syncXProfile($force = false, $useUserName = false);

// Get FluentCRM contact
$contact = $user->getContact();

// Get WordPress user object
$wpUser = $user->getWpUser();
```

**Custom Meta Operations:**

```php
// Get custom meta
$value = $user->getCustomMeta('custom_key', 'default_value');

// Update custom meta
$user->updateCustomMeta('custom_key', 'custom_value');

// Get WordPress user meta
$value = $user->getUserMeta('meta_key', 'default_value');
```

**Notifications:**

```php
// Get unread notification count
$count = $user->getUnreadNotificationCount();

// Get feed IDs with unread notifications
$feedIds = $user->getUnreadNotificationFeedIds();
```

**Verification:**

```php
// Check if user is verified
$isVerified = $user->isVerified();

// Get is_verified attribute (accessor)
$isVerified = $user->is_verified;
```

**Photo/Avatar:**

```php
// Get user photo (auto-generated)
// Priority: custom photo > FluentCRM contact photo > gravatar
$photo = $user->photo;
```

---

### XProfile Model

Stores extended user profile information beyond WordPress core user data.

**Namespace:** `FluentCommunity\App\Models\XProfile`

**Table:** `fcom_xprofile`

**Primary Key:** `user_id` (not `id`)

**Fillable Attributes:**

```php
[
    'user_id',           // WordPress user ID (primary key)
    'total_points',      // Gamification points
    'username',          // Unique username for profile URL
    'status',            // Profile status
    'is_verified',       // Verification status (0 or 1)
    'display_name',      // Display name
    'avatar',            // Avatar URL
    'short_description', // Bio/description
    'last_activity',     // Last activity timestamp
    'meta',              // Additional metadata (serialized)
    'created_at'         // Profile creation timestamp
]
```

**Casts:**

```php
[
    'user_id'      => 'integer',
    'total_points' => 'integer',
    'is_verified'  => 'integer'
]
```

**Appended Attributes:** `badge` (dynamic badge from filters)

**Basic Usage:**

```php
use FluentCommunity\App\Models\XProfile;

// Get user profile by user_id
$profile = XProfile::where('user_id', 1)->first();
// Or using find (since user_id is primary key)
$profile = XProfile::find(1);

// Update profile
$profile->update([
    'display_name' => 'John Doe',
    'short_description' => 'Developer and community enthusiast',
    'total_points' => 100,
    'is_verified' => 1
]);

// Get avatar (auto-generated from gravatar or custom)
$avatar = $profile->avatar;

// Get badge (from filters)
$badge = $profile->badge;
```

**Relationships:**

```php
// Get WordPress user
$user = $profile->user;

// Get FluentCommunity contact
$contact = $profile->contact;

// Get user's spaces (with pivot: role, status, created_at)
$spaces = $profile->spaces;

// Get user's posts/feeds
$posts = $profile->posts;

// Get scheduled posts
$scheduledPosts = $profile->scheduledPosts();

// Get user's comments
$comments = $profile->comments;

// Get user's courses
$courses = $profile->courses;

// Get users this profile follows (Pro feature)
$follows = $profile->follows;

// Get followers (Pro feature)
$followers = $profile->followers;

// Get space pivot data
$spacePivot = $profile->space_pivot;

// Get community role meta
$communityRole = $profile->community_role;
```

**Query Scopes:**

```php
// Search by display name or username
$profiles = XProfile::searchBy('john')->get();

// Search for mentions
$profiles = XProfile::mentionBy('john')->get();
```

**Helper Methods:**

```php
// Check if profile has custom avatar
$hasCustom = $profile->hasCustomAvatar();

// Get FluentCRM contact
$crmContact = $profile->getCrmContact();

// Get first name from display_name
$firstName = $profile->getFirstName();

// Get last name from display_name
$lastName = $profile->getLastName();

// Get profile completion score (0-100)
$score = $profile->getCompletionScore();
// Scoring: first_name(20), last_name(20), website(30), cover_photo(20),
//          avatar(20), short_description(30), social_links(20)

// Get profile permalink
$url = $profile->getPermalink(); // e.g., /u/username

// Get JavaScript route object
$route = $profile->getJsRoute();
// Returns: ['name' => 'user_profile', 'params' => ['username' => 'username']]
```

**Meta Attribute:**

```php
// Meta is automatically unserialized/serialized
$meta = $profile->meta;
// Default structure:
// [
//     'cover_photo' => '',
//     'website' => '',
//     'social_links' => [
//         'twitter' => '',
//         'facebook' => '',
//         'linkedin' => '',
//         'instagram' => '',
//         'youtube' => ''
//     ],
//     'badge_slug' => []
// ]

// Update meta
$profile->meta = [
    'cover_photo' => 'https://example.com/cover.jpg',
    'website' => 'https://example.com',
    'social_links' => [
        'twitter' => '@username'
    ]
];
$profile->save();
```

**Avatar Behavior:**

```php
// Avatar priority:
// 1. Custom avatar from database
// 2. Gravatar (if enabled in settings)
// 3. UI Avatars with initials
// 4. Default placeholder

// Get avatar URL
$avatarUrl = $profile->avatar;
```

---

### Reaction Model

Represents reactions (likes, bookmarks, survey votes, etc.) on feeds and comments using polymorphic relationships.

**Namespace:** `FluentCommunity\App\Models\Reaction`

**Table:** `fcom_post_reactions`

**Fillable Attributes:**

```php
[
    'user_id',      // User who reacted
    'object_id',    // ID of the object (feed or comment)
    'object_type',  // Type of object ('feed', 'comment', 'survey_vote')
    'type',         // Reaction type ('like', 'bookmark', 'survey_vote')
    'ip_address',   // User's IP address (hidden from output)
    'parent_id',    // Parent reaction ID (for nested reactions)
    'created_at',   // Creation timestamp
    'updated_at'    // Last update timestamp
]
```

**Hidden Attributes:** `ip_address`

**Basic Usage:**

```php
use FluentCommunity\App\Models\Reaction;

// Get reactions for a feed
$reactions = Reaction::where('object_type', 'feed')
    ->where('object_id', 123)
    ->get();

// Get likes for a feed
$likes = Reaction::where('object_type', 'feed')
    ->where('object_id', 123)
    ->where('type', 'like')
    ->get();

// Add a like reaction (user_id, object_type, type auto-set if empty)
$reaction = Reaction::create([
    'object_type' => 'feed',
    'object_id' => 123,
    'user_id' => 1,
    'type' => 'like'
]);

// Add a bookmark
$bookmark = Reaction::create([
    'object_type' => 'feed',
    'object_id' => 123,
    'user_id' => 1,
    'type' => 'bookmark'
]);

// Add a survey vote
$vote = Reaction::create([
    'object_type' => 'survey_vote',
    'object_id' => 456,
    'user_id' => 1,
    'type' => 'survey_vote'
]);

// Remove a reaction
$reaction->delete();
```

**Relationships:**

```php
// Get user who reacted (WordPress user)
$user = $reaction->user;

// Get user's extended profile
$xprofile = $reaction->xprofile;

// Get related feed (only if object_type is 'feed')
$feed = $reaction->feed;

// Get related comment (only if object_type is 'comment')
$comment = $reaction->comment;
```

**Query Scopes:**

```php
// Filter by reaction type
$likes = Reaction::typeBy('like')->get();
$bookmarks = Reaction::typeBy('bookmark')->get();

// Filter by object type
$feedReactions = Reaction::objectType('feed')->get();
$commentReactions = Reaction::objectType('comment')->get();

// Combine scopes
$feedLikes = Reaction::objectType('feed')
    ->typeBy('like')
    ->where('object_id', 123)
    ->get();
```

**Automatic Behaviors:**

```php
// On creating:
// - Auto-sets user_id to current user if empty
// - Auto-sets object_type to 'feed' if empty
// - Auto-sets type to 'like' if empty
```

**Common Reaction Types:**

- `like` - Standard like reaction
- `bookmark` - Bookmark/save for later
- `survey_vote` - Survey response vote

**Polymorphic Usage:**

```php
// Reactions can be attached to different object types:
// - 'feed' (posts)
// - 'comment' (comments)
// - 'survey_vote' (survey responses)

// Get all reactions for a specific feed
$feedReactions = Reaction::where('object_type', 'feed')
    ->where('object_id', $feedId)
    ->get();

// Get all reactions for a specific comment
$commentReactions = Reaction::where('object_type', 'comment')
    ->where('object_id', $commentId)
    ->get();
```

---

### Media Model

Manages media files (images, documents, videos) uploaded to the community.

**Namespace:** `FluentCommunity\App\Models\Media`

**Table:** `fcom_media_archive`

**Fillable Attributes:**

```php
[
    'object_source',  // Source type (feed_media, comment_media, space_logo, space_cover_photo, etc.)
    'user_id',        // Uploader user ID
    'media_key',      // Unique media key (auto-generated MD5 hash)
    'feed_id',        // Associated feed ID (if applicable)
    'is_active',      // Active status (0 or 1)
    'sub_object_id',  // Sub-object ID (comment_id, space_id, etc.)
    'media_type',     // MIME type (image/jpeg, application/pdf, etc.)
    'driver',         // Storage driver (local, s3, etc.)
    'media_path',     // File system path (for local driver)
    'media_url',      // Public URL
    'settings'        // Additional settings (serialized)
]
```

**Appended Attributes:** `public_url` (dynamic URL based on driver)

**Basic Usage:**

```php
use FluentCommunity\App\Models\Media;

// Get media by ID
$media = Media::find(1);

// Get active media for a feed
$feedMedia = Media::where('feed_id', 123)
    ->where('is_active', 1)
    ->get();

// Create media record (user_id and media_key auto-set)
$media = Media::create([
    'object_source' => 'feed_media',
    'feed_id' => 123,
    'media_type' => 'image/jpeg',
    'driver' => 'local',
    'media_path' => '/path/to/file.jpg',
    'media_url' => 'https://example.com/uploads/file.jpg',
    'is_active' => 1,
    'settings' => [
        'title' => 'My Image',
        'original_name' => 'photo.jpg',
        'size' => 102400
    ]
]);

// Deactivate media (soft delete)
$media->update(['is_active' => 0]);

// Delete media (also deletes physical file)
$media->delete();
```

**Relationships:**

```php
// Get associated feed
$feed = $media->feed;

// Get uploader (WordPress user)
$user = $media->user;

// Get uploader's extended profile
$xprofile = $media->xprofile;
```

**Query Scopes:**

```php
// Filter by source type(s)
$feedMedia = Media::bySource(['feed_media', 'comment_media'])->get();

// Filter by media key
$media = Media::byMediaKey('abc123def456')->first();

// Filter by user
$userMedia = Media::byUser($userId)->get();
```

**Helper Methods:**

```php
// Get public URL (filtered by driver)
$url = $media->public_url;

// Get signed public URL (for private/temporary access)
$signedUrl = $media->getSignedPublicUrl($time = 3600); // 1 hour

// Delete physical file
$media->deleteFile();

// Get file title
$title = $media->getFileTitle();

// Get private download URL (for protected documents)
$downloadUrl = $media->getPrivateDownloadUrl();

// Get private file metadata
$meta = $media->getPrivateFileMeta();
// Returns: ['id', 'url', 'media_key', 'title', 'type']
```

**Settings Attribute:**

```php
// Settings is automatically serialized/unserialized
$settings = $media->settings;
// Common structure:
// [
//     'title' => 'File Title',
//     'original_name' => 'original-filename.jpg',
//     'size' => 102400,
//     'width' => 1920,
//     'height' => 1080,
//     'thumbnail' => 'https://example.com/thumb.jpg'
// ]

// Update settings
$media->settings = [
    'title' => 'Updated Title',
    'size' => 204800
];
$media->save();
```

**Automatic Behaviors:**

```php
// On creating:
// - Auto-sets user_id to current user if not set
// - Auto-generates media_key (MD5 hash) if not set

// On deleting:
// - Automatically deletes physical file (local or remote)
```

**Common Object Sources:**

- `feed_media` - Media attached to feed posts
- `comment_media` - Media attached to comments
- `space_logo` - Space logo images
- `space_cover_photo` - Space cover photos
- `space_og_media` - Space Open Graph images
- `user_avatar` - User avatar images
- `user_cover_photo` - User cover photos
- `document` - Document library files (Pro)

**Storage Drivers:**

- `local` - Local file system storage
- `s3` - Amazon S3 storage (with filters)
- Custom drivers via filters

---

### Meta Model

Generic key-value metadata storage for various objects in the community.

**Namespace:** `FluentCommunity\App\Models\Meta`

**Table:** `fcom_meta`

**Fillable Attributes:**

```php
[
    'object_type',  // Type of object (user, space, feed, term_space_relation, etc.)
    'object_id',    // ID of the object
    'meta_key',     // Meta key/name
    'value'         // Meta value (automatically serialized/unserialized)
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\Meta;

// Create meta record
$meta = Meta::create([
    'object_type' => 'user',
    'object_id' => 123,
    'meta_key' => 'custom_setting',
    'value' => ['option1' => 'value1', 'option2' => 'value2']
]);

// Get meta by object
$userMeta = Meta::where('object_type', 'user')
    ->where('object_id', 123)
    ->where('meta_key', 'custom_setting')
    ->first();

// Access value (automatically unserialized)
$value = $userMeta->value;

// Update meta value
$userMeta->value = ['option1' => 'updated_value'];
$userMeta->save();

// Delete meta
$userMeta->delete();
```

**Query Scopes:**

```php
// Filter by object type
$userMetas = Meta::byType('user')->get();

// Filter by meta key
$settings = Meta::byMetaKey('custom_setting')->get();

// Filter by object ID
$objectMetas = Meta::byObjectId(123)->get();

// Combine scopes
$specificMeta = Meta::byType('user')
    ->byObjectId(123)
    ->byMetaKey('custom_setting')
    ->first();
```

**Common Object Types:**

- `user` - User metadata
- `space` - Space metadata
- `feed` - Feed/post metadata
- `term_space_relation` - Topic-space relationships
- `notification` - Notification metadata
- `course` - Course metadata (Pro)

**Value Serialization:**

```php
// Values are automatically serialized/unserialized
// You can store arrays, objects, or simple values

// Store array
$meta->value = ['key1' => 'value1', 'key2' => 'value2'];
$meta->save();

// Retrieve array (automatically unserialized)
$array = $meta->value; // ['key1' => 'value1', 'key2' => 'value2']

// Store simple value
$meta->value = 'simple string';
$meta->save();

// Retrieve simple value
$string = $meta->value; // 'simple string'
```

**Common Use Cases:**

```php
// User community roles
$roleMeta = Meta::byType('user')
    ->byObjectId($userId)
    ->byMetaKey('_user_community_roles')
    ->first();

// Space custom settings
$spaceMeta = Meta::byType('space')
    ->byObjectId($spaceId)
    ->byMetaKey('lockscreen_settings')
    ->first();

// Term-space relationships
$termSpaceRelations = Meta::byType('term_space_relation')
    ->byMetaKey($spaceId)
    ->get();
```

**Helper Pattern:**

```php
// Common pattern for get/set meta
function getObjectMeta($objectType, $objectId, $metaKey, $default = null) {
    $meta = Meta::byType($objectType)
        ->byObjectId($objectId)
        ->byMetaKey($metaKey)
        ->first();

    return $meta ? $meta->value : $default;
}

function updateObjectMeta($objectType, $objectId, $metaKey, $value) {
    $meta = Meta::byType($objectType)
        ->byObjectId($objectId)
        ->byMetaKey($metaKey)
        ->first();

    if ($meta) {
        $meta->value = $value;
        $meta->save();
        return $meta;
    }

    return Meta::create([
        'object_type' => $objectType,
        'object_id' => $objectId,
        'meta_key' => $metaKey,
        'value' => $value
    ]);
}
```

---

### Notification Model

Manages user notifications.

**Namespace:** `FluentCommunity\App\Models\Notification`

**Table:** `fcom_notifications`

**Fillable Attributes:**

```php
[
    'feed_id',         // Associated feed ID
    'object_id',       // Related object ID (comment_id, etc.)
    'src_user_id',     // Source user ID (who triggered the notification)
    'src_object_type', // Source object type (comment, feed, etc.)
    'action',          // Action type (comment_added, feed/mentioned, etc.)
    'route',           // Route data for navigation (serialized)
    'content'          // Notification content/template
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\Notification;

// Create notification template
$notification = Notification::create([
    'feed_id' => 123,
    'object_id' => 456,
    'src_user_id' => 1,
    'src_object_type' => 'comment',
    'action' => 'comment_added',
    'route' => [
        'name' => 'feed_single',
        'params' => ['id' => 123]
    ],
    'content' => 'commented on your post'
]);

// Subscribe users to notification
$notification->subscribe([2, 3, 4]);

// Get notification with subscribers
$notification = Notification::with('subscribers')->find(1);

// Get unread notifications for user
$unreadNotifications = Notification::byStatus('unread', $userId)
    ->orderBy('created_at', 'desc')
    ->get();

// Get read notifications for user
$readNotifications = Notification::byStatus('read', $userId)
    ->get();

// Get mentioned notifications
$mentions = Notification::byType('mentioned')
    ->whereHas('subscribers', function($q) use ($userId) {
        $q->where('user_id', $userId);
    })
    ->get();

// Delete notification (also deletes all subscriber records)
$notification->delete();
```

**Relationships:**

```php
// Get all subscribers (NotificationSubscriber records)
$subscribers = $notification->subscribers;

// Get single subscriber record
$subscriber = $notification->subscriber;

// Get associated feed
$feed = $notification->feed;

// Get source user (who triggered the notification)
$srcUser = $notification->src_user;

// Get source user's extended profile
$xprofile = $notification->xprofile;
```

**Query Scopes:**

```php
// Filter by read/unread status for specific user
$unread = Notification::byStatus('unread', $userId)->get();
$read = Notification::byStatus('read', $userId)->get();

// Filter by notification type
$mentions = Notification::byType('mentioned')->get();
$following = Notification::byType('following')->get();
```

**Helper Methods:**

```php
// Subscribe multiple users to notification
$notification->subscribe([1, 2, 3, 4, 5]);
// Creates NotificationSubscriber records for each user
// Inserts in chunks of 50 for performance
```

**Route Attribute:**

```php
// Route is automatically serialized/unserialized
$notification->route = [
    'name' => 'feed_single',
    'params' => ['id' => 123],
    'query' => ['comment_id' => 456]
];
$notification->save();

// Retrieve route (automatically unserialized)
$route = $notification->route;
// ['name' => 'feed_single', 'params' => [...], 'query' => [...]]
```

**Common Actions:**

- `comment_added` - New comment on post
- `feed/mentioned` - User mentioned in post
- `mention_added` - User mentioned in comment
- `reaction_added` - Reaction on post/comment
- `feed_published` - New post in followed space
- `reply_added` - Reply to comment

**Automatic Behaviors:**

```php
// On deleting:
// - Automatically deletes all NotificationSubscriber records
```

**Notification Flow:**

```php
// 1. Create notification template
$notification = Notification::create([
    'feed_id' => $feedId,
    'src_user_id' => $currentUserId,
    'action' => 'comment_added',
    'content' => 'commented on your post'
]);

// 2. Subscribe users who should receive it
$notification->subscribe($recipientUserIds);

// 3. Users see notifications in their feed
// 4. Mark as read via NotificationSubscriber model
```

---

### NotificationSubscriber Model

Represents individual user notification records (user's inbox items).

**Namespace:** `FluentCommunity\App\Models\NotificationSubscriber`

**Table:** `fcom_notification_users`

**Fillable Attributes:**

```php
[
    'object_id',         // Notification ID (references fcom_notifications)
    'user_id',           // User who receives the notification
    'is_read',           // Read status (0 = unread, 1 = read)
    'object_type',       // Always 'notification' (auto-set)
    'notification_type'  // Always 'web' (auto-set)
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\NotificationSubscriber;

// Get user's unread notifications
$unreadNotifications = NotificationSubscriber::where('user_id', 1)
    ->unread()
    ->with('notification')
    ->orderBy('created_at', 'desc')
    ->get();

// Get user's read notifications
$readNotifications = NotificationSubscriber::where('user_id', 1)
    ->read()
    ->with('notification')
    ->get();

// Mark notification as read
$subscriber = NotificationSubscriber::where('user_id', 1)
    ->where('object_id', 123)
    ->first();
$subscriber->update(['is_read' => 1]);

// Mark all as read for user
NotificationSubscriber::where('user_id', 1)
    ->where('is_read', 0)
    ->update(['is_read' => 1]);

// Delete notification for user
$subscriber->delete();
```

**Relationships:**

```php
// Get user who receives the notification
$user = $subscriber->user;

// Get user's extended profile
$xprofile = $subscriber->xprofile;

// Get notification template/content
$notification = $subscriber->notification;
```

**Query Scopes:**

```php
// Get unread notifications
$unread = NotificationSubscriber::unread()->get();

// Get read notifications
$read = NotificationSubscriber::read()->get();

// Combine with user filter
$userUnread = NotificationSubscriber::where('user_id', 1)
    ->unread()
    ->get();
```

**Automatic Behaviors:**

```php
// On creating:
// - Auto-sets object_type to 'notification'
// - Auto-sets notification_type to 'web'

// On updating:
// - Auto-sets object_type to 'notification'
// - Auto-sets notification_type to 'web'

// Global scope:
// - Automatically filters by object_type = 'notification'
```

**Common Patterns:**

```php
// Get notification count for user
$count = NotificationSubscriber::where('user_id', $userId)
    ->unread()
    ->count();

// Get latest notifications with details
$notifications = NotificationSubscriber::where('user_id', $userId)
    ->with(['notification.feed', 'notification.xprofile'])
    ->orderBy('created_at', 'desc')
    ->limit(20)
    ->get();

// Mark specific notification as read
NotificationSubscriber::where('user_id', $userId)
    ->where('object_id', $notificationId)
    ->update(['is_read' => 1]);

// Delete old read notifications
NotificationSubscriber::where('user_id', $userId)
    ->read()
    ->where('created_at', '<', now()->subDays(30))
    ->delete();
```

**Notification Display:**

```php
// Typical notification display logic
$notifications = NotificationSubscriber::where('user_id', $userId)
    ->unread()
    ->with(['notification' => function($q) {
        $q->with(['xprofile', 'feed']);
    }])
    ->orderBy('created_at', 'desc')
    ->paginate(20);

foreach ($notifications as $subscriber) {
    $notification = $subscriber->notification;
    echo $notification->xprofile->display_name; // Who triggered it
    echo $notification->content; // What happened
    echo $notification->route; // Where to go
}
```

---

### Activity Model

Tracks user activities and actions within the community (feed posts, comments, etc.).

**Namespace:** `FluentCommunity\App\Models\Activity`

**Table:** `fcom_user_activities`

**Fillable Attributes:**

```php
[
    'user_id',     // User who performed the action
    'feed_id',     // Associated feed ID
    'space_id',    // Associated space ID
    'related_id',  // Related object ID (comment_id, etc.)
    'message',     // Activity message/description
    'is_public',   // Public visibility flag
    'action_name'  // Action type (feed_published, comment_added, etc.)
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\Activity;

// Create activity record
$activity = Activity::create([
    'user_id' => 1,
    'feed_id' => 123,
    'space_id' => 5,
    'action_name' => 'feed_published',
    'is_public' => 1,
    'message' => 'Published a new post'
]);

// Get activities for a feed
$feedActivities = Activity::where('feed_id', 123)
    ->orderBy('created_at', 'desc')
    ->get();

// Get activities for a space
$spaceActivities = Activity::where('space_id', 5)
    ->orderBy('created_at', 'desc')
    ->get();

// Get user's activities
$userActivities = Activity::where('user_id', 1)
    ->with(['feed', 'space', 'xprofile'])
    ->orderBy('created_at', 'desc')
    ->get();
```

**Relationships:**

```php
// Get associated feed
$feed = $activity->feed;

// Get associated space
$space = $activity->space;

// Get user who performed the action
$user = $activity->user;

// Get user's extended profile
$xprofile = $activity->xprofile;
```

**Query Scopes:**

```php
// Filter by action types
$activities = Activity::byActions(['feed_published', 'comment_added'])->get();

// Filter by space
$spaceActivities = Activity::bySpace($spaceId)->get();

// Combine scopes
$specificActivities = Activity::bySpace($spaceId)
    ->byActions(['feed_published'])
    ->orderBy('created_at', 'desc')
    ->get();
```

**Helper Methods:**

```php
// Get formatted activity message
$message = $activity->getFormattedMessage();
// Returns localized message like:
// "John Doe published a new status 'Hello World'"
// "Jane Smith added a comment on 'My Post Title'"
```

**Common Action Names:**

- `feed_published` - New feed post published
- `comment_added` - Comment added to feed
- `reaction_added` - Reaction added to feed/comment
- `feed_updated` - Feed post updated
- `feed_deleted` - Feed post deleted

**Activity Feed Pattern:**

```php
// Get recent activities for a space
$recentActivities = Activity::where('space_id', $spaceId)
    ->where('is_public', 1)
    ->with(['user', 'xprofile', 'feed'])
    ->orderBy('created_at', 'desc')
    ->limit(50)
    ->get();

// Display activities
foreach ($recentActivities as $activity) {
    echo $activity->getFormattedMessage();
    echo $activity->created_at->diffForHumans();
}
```

**Tracking User Activity:**

```php
// Track when user publishes a post
Activity::create([
    'user_id' => $userId,
    'feed_id' => $feed->id,
    'space_id' => $feed->space_id,
    'action_name' => 'feed_published',
    'is_public' => 1
]);

// Track when user adds a comment
Activity::create([
    'user_id' => $userId,
    'feed_id' => $comment->post_id,
    'space_id' => $feed->space_id,
    'related_id' => $comment->id,
    'action_name' => 'comment_added',
    'is_public' => 1
]);
```

**Privacy Control:**

```php
// Public activities (visible to all)
$publicActivities = Activity::where('is_public', 1)->get();

// Private activities (visible to specific users)
$privateActivities = Activity::where('is_public', 0)->get();
```

---

### Term Model

Represents taxonomy terms (topics, tags, categories) for organizing content.

**Namespace:** `FluentCommunity\App\Models\Term`

**Table:** `fcom_terms`

**Fillable Attributes:**

```php
[
    'parent_id',      // Parent term ID (for hierarchical taxonomies)
    'taxonomy_name',  // Taxonomy type (post_topic, post_tag, etc.)
    'slug',           // URL-friendly identifier
    'title',          // Term title/name
    'description',    // Term description
    'settings'        // Additional settings (serialized)
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\Term;

// Create a topic
$topic = Term::create([
    'taxonomy_name' => 'post_topic',
    'slug' => 'announcements',
    'title' => 'Announcements',
    'description' => 'Important community announcements'
]);

// Get all topics
$topics = Term::where('taxonomy_name', 'post_topic')->get();

// Get topic with posts
$topic = Term::with('posts')->find(1);

// Search topics
$results = Term::searchBy('announcement')->get();

// Update topic
$topic->update([
    'title' => 'Updated Title',
    'description' => 'Updated description'
]);

// Delete topic (also detaches from all posts)
$topic->delete();
```

**Relationships:**

```php
// Get posts/feeds associated with this term
$posts = $term->posts;

// Get spaces associated with this term (via Meta table)
$spaces = $term->base_spaces;
```

**Query Scopes:**

```php
// Search by title, description, or slug
$terms = Term::searchBy('announcement')->get();

// Filter by taxonomy
$topics = Term::where('taxonomy_name', 'post_topic')->get();
$tags = Term::where('taxonomy_name', 'post_tag')->get();
```

**Settings Attribute:**

```php
// Settings is automatically serialized/unserialized
$term->settings = [
    'color' => '#FF5733',
    'icon' => 'icon-class',
    'featured' => true
];
$term->save();

// Retrieve settings
$settings = $term->settings;
// ['color' => '#FF5733', 'icon' => 'icon-class', 'featured' => true]
```

**Common Taxonomy Names:**

- `post_topic` - Post topics/categories
- `post_tag` - Post tags
- `space_category` - Space categories

**Automatic Behaviors:**

```php
// On deleting:
// - Automatically detaches term from all posts (removes pivot records)
```

**Working with Posts:**

```php
// Attach term to posts
$term->posts()->attach([1, 2, 3]);

// Detach term from posts
$term->posts()->detach([1, 2]);

// Sync posts (replaces all associations)
$term->posts()->sync([1, 2, 3, 4]);

// Get posts with this term
$posts = $term->posts()
    ->where('status', 'published')
    ->orderBy('created_at', 'desc')
    ->get();
```

**Working with Spaces:**

```php
// Get spaces associated with this term
$spaces = $term->base_spaces;

// This uses the Meta table with:
// - object_type: 'term_space_relation'
// - object_id: term_id
// - meta_key: space_id
```

**Hierarchical Terms:**

```php
// Create parent topic
$parent = Term::create([
    'taxonomy_name' => 'post_topic',
    'slug' => 'development',
    'title' => 'Development'
]);

// Create child topic
$child = Term::create([
    'taxonomy_name' => 'post_topic',
    'parent_id' => $parent->id,
    'slug' => 'frontend',
    'title' => 'Frontend Development'
]);

// Get child topics
$children = Term::where('parent_id', $parent->id)->get();
```

**Common Patterns:**

```php
// Get popular topics (with post count)
$popularTopics = Term::where('taxonomy_name', 'post_topic')
    ->withCount('posts')
    ->orderBy('posts_count', 'desc')
    ->limit(10)
    ->get();

// Get topics for a specific space
$spaceTopics = Term::where('taxonomy_name', 'post_topic')
    ->whereHas('base_spaces', function($q) use ($spaceId) {
        $q->where('id', $spaceId);
    })
    ->get();

// Get posts by topic slug
$posts = Feed::whereHas('terms', function($q) use ($topicSlug) {
    $q->where('slug', $topicSlug);
})->get();
```

---

### SpaceUserPivot Model

Represents the many-to-many relationship between spaces and users (space membership).

**Namespace:** `FluentCommunity\App\Models\SpaceUserPivot`

**Table:** `fcom_space_user`

**Fillable Attributes:**

```php
[
    'space_id',  // Space ID
    'user_id',   // User ID
    'status',    // Membership status (active, pending, blocked, etc.)
    'role'       // User role in space (member, moderator, admin)
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\SpaceUserPivot;

// Add user to space
$membership = SpaceUserPivot::create([
    'space_id' => 5,
    'user_id' => 1,
    'status' => 'active',
    'role' => 'member'
]);

// Get user's space memberships
$memberships = SpaceUserPivot::where('user_id', 1)
    ->where('status', 'active')
    ->with('space')
    ->get();

// Get space members
$members = SpaceUserPivot::where('space_id', 5)
    ->where('status', 'active')
    ->with(['user', 'xprofile'])
    ->get();

// Update user role in space
$membership->update(['role' => 'moderator']);

// Remove user from space
$membership->delete();
```

**Relationships:**

```php
// Get user
$user = $membership->user;

// Get user's extended profile
$xprofile = $membership->xprofile;

// Get space
$space = $membership->space;
```

**Query Scopes:**

```php
// Filter by space
$spaceMembers = SpaceUserPivot::bySpace($spaceId)->get();

// Filter by user
$userSpaces = SpaceUserPivot::byUser($userId)->get();

// Combine scopes
$membership = SpaceUserPivot::bySpace($spaceId)
    ->byUser($userId)
    ->first();
```

**Common Status Values:**

- `active` - Active member
- `pending` - Pending approval
- `blocked` - Blocked from space
- `suspended` - Temporarily suspended

**Common Role Values:**

- `member` - Regular member
- `moderator` - Space moderator
- `admin` - Space administrator

**Membership Management:**

```php
// Check if user is member of space
$isMember = SpaceUserPivot::bySpace($spaceId)
    ->byUser($userId)
    ->where('status', 'active')
    ->exists();

// Get user's role in space
$membership = SpaceUserPivot::bySpace($spaceId)
    ->byUser($userId)
    ->first();
$role = $membership ? $membership->role : null;

// Get all moderators of a space
$moderators = SpaceUserPivot::bySpace($spaceId)
    ->where('role', 'moderator')
    ->where('status', 'active')
    ->with('xprofile')
    ->get();

// Get pending membership requests
$pendingRequests = SpaceUserPivot::bySpace($spaceId)
    ->where('status', 'pending')
    ->with('xprofile')
    ->get();

// Approve membership request
$membership = SpaceUserPivot::bySpace($spaceId)
    ->byUser($userId)
    ->where('status', 'pending')
    ->first();
$membership->update(['status' => 'active']);

// Block user from space
$membership->update(['status' => 'blocked']);
```

**Space Access Control:**

```php
// Check if user has moderator access
function hasModeratorAccess($userId, $spaceId) {
    $membership = SpaceUserPivot::bySpace($spaceId)
        ->byUser($userId)
        ->where('status', 'active')
        ->first();

    return $membership && in_array($membership->role, ['moderator', 'admin']);
}

// Get user's accessible spaces
$accessibleSpaces = SpaceUserPivot::byUser($userId)
    ->where('status', 'active')
    ->with('space')
    ->get()
    ->pluck('space');
```

**Member Statistics:**

```php
// Count active members in space
$memberCount = SpaceUserPivot::bySpace($spaceId)
    ->where('status', 'active')
    ->count();

// Count pending requests
$pendingCount = SpaceUserPivot::bySpace($spaceId)
    ->where('status', 'pending')
    ->count();

// Get member count by role
$moderatorCount = SpaceUserPivot::bySpace($spaceId)
    ->where('status', 'active')
    ->where('role', 'moderator')
    ->count();
```

**Bulk Operations:**

```php
// Add multiple users to space
$userIds = [1, 2, 3, 4, 5];
foreach ($userIds as $userId) {
    SpaceUserPivot::create([
        'space_id' => $spaceId,
        'user_id' => $userId,
        'status' => 'active',
        'role' => 'member'
    ]);
}

// Remove all blocked users
SpaceUserPivot::bySpace($spaceId)
    ->where('status', 'blocked')
    ->delete();
```

---

### SpaceGroup Model

Represents space groups for organizing multiple spaces together.

**Namespace:** `FluentCommunity\App\Models\SpaceGroup`

**Table:** `fcom_spaces` (shares table with Space model, differentiated by type)

**Fillable Attributes:**

```php
[
    'created_by',   // User ID who created the group
    'parent_id',    // Parent group ID (for nested groups)
    'title',        // Group title
    'slug',         // URL-friendly identifier
    'description',  // Group description
    'logo',         // Group logo URL
    'cover_photo',  // Cover photo URL
    'type',         // Always 'space_group' (auto-set)
    'privacy',      // Privacy setting
    'status',       // Group status
    'serial',       // Display order
    'settings'      // Additional settings (serialized)
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\SpaceGroup;

// Create space group
$group = SpaceGroup::create([
    'title' => 'Development',
    'slug' => 'development',
    'description' => 'All development-related spaces',
    'privacy' => 'public',
    'status' => 'active'
]);

// Get all space groups
$groups = SpaceGroup::orderBy('serial')->get();

// Get group with spaces
$group = SpaceGroup::with('spaces')->find(1);

// Search groups
$results = SpaceGroup::searchBy('development')->get();

// Update group
$group->update([
    'title' => 'Updated Title',
    'description' => 'Updated description'
]);

// Delete group
$group->delete();
```

**Relationships:**

```php
// Get group owner/creator
$owner = $group->owner;

// Get spaces in this group
$spaces = $group->spaces;
```

**Query Scopes:**

```php
// Search by title or description
$groups = SpaceGroup::searchBy('development')->get();

// Get active groups
$activeGroups = SpaceGroup::where('status', 'active')->get();
```

**Settings Attribute:**

```php
// Settings is automatically serialized/unserialized
// Default settings are merged with saved settings

$group->settings = [
    'hide_members' => 'yes',
    'always_show_spaces' => 'no'
];
$group->save();

// Retrieve settings (includes defaults)
$settings = $group->settings;
// [
//     'hide_members' => 'yes',
//     'always_show_spaces' => 'no'
// ]
```

**Default Settings:**

```php
[
    'hide_members' => 'no',        // Hide member list
    'always_show_spaces' => 'yes'  // Always show spaces in group
]
```

**Automatic Behaviors:**

```php
// On creating:
// - Auto-sets created_by to current user ID if not provided
// - Auto-generates slug from title if not provided
// - Auto-sets type to 'space_group'

// Global scope:
// - Automatically filters by type = 'space_group'
```

**Update Custom Data:**

```php
// Update group with custom data handling
$group->updateCustomData([
    'title' => 'New Title',
    'description' => 'New description',
    'logo' => 'https://example.com/logo.png',
    'cover_photo' => 'https://example.com/cover.jpg',
    'privacy' => 'public',
    'settings' => [
        'hide_members' => 'yes'
    ]
], $removeSrc = true); // Set true to delete old media files
```

**Working with Spaces:**

```php
// Get all spaces in a group
$spaces = $group->spaces()
    ->where('status', 'active')
    ->orderBy('serial')
    ->get();

// Count spaces in group
$spaceCount = $group->spaces()->count();

// Add space to group
$space = Space::find(1);
$space->parent_id = $group->id;
$space->save();

// Remove space from group
$space->parent_id = null;
$space->save();
```

**Hierarchical Groups:**

```php
// Create parent group
$parent = SpaceGroup::create([
    'title' => 'Technology',
    'slug' => 'technology'
]);

// Create child group
$child = SpaceGroup::create([
    'title' => 'Web Development',
    'slug' => 'web-development',
    'parent_id' => $parent->id
]);

// Get child groups
$children = SpaceGroup::where('parent_id', $parent->id)->get();
```

**Common Patterns:**

```php
// Get groups with space count
$groups = SpaceGroup::withCount('spaces')
    ->orderBy('serial')
    ->get();

foreach ($groups as $group) {
    echo $group->title . ' (' . $group->spaces_count . ' spaces)';
}

// Get groups with active spaces only
$groups = SpaceGroup::with(['spaces' => function($q) {
    $q->where('status', 'active');
}])->get();

// Reorder groups
$groups = SpaceGroup::all();
$serial = 1;
foreach ($groups as $group) {
    $group->serial = $serial++;
    $group->save();
}
```

**Privacy Settings:**

- `public` - Visible to everyone
- `private` - Visible to members only
- `secret` - Hidden from non-members

**Status Values:**

- `active` - Active group
- `inactive` - Inactive group
- `archived` - Archived group

---

### Contact Model

Represents FluentCRM contacts integrated with the community (requires FluentCRM plugin).

**Namespace:** `FluentCommunity\App\Models\Contact`

**Table:** `fc_subscribers` (FluentCRM table)

**Fillable Attributes:**

```php
[
    'hash',             // Unique hash identifier
    'prefix',           // Name prefix (Mr., Mrs., Dr., etc.)
    'first_name',       // First name
    'last_name',        // Last name
    'user_id',          // Associated WordPress user ID
    'company_id',       // Associated company ID
    'email',            // Email address
    'status',           // Contact status (pending, subscribed, bounced, unsubscribed)
    'contact_type',     // Contact type (lead, customer)
    'address_line_1',   // Address line 1
    'address_line_2',   // Address line 2
    'postal_code',      // Postal/ZIP code
    'city',             // City
    'state',            // State/Province
    'country',          // Country
    'phone',            // Phone number
    'timezone',         // Timezone
    'date_of_birth',    // Date of birth
    'source',           // Contact source
    'life_time_value',  // Customer lifetime value
    'last_activity',    // Last activity timestamp
    'total_points',     // Total points/score
    'latitude',         // Geographic latitude
    'longitude',        // Geographic longitude
    'ip',               // IP address
    'created_at',       // Creation timestamp
    'updated_at',       // Last update timestamp
    'avatar'            // Avatar URL
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\Contact;

// Get contact by user ID
$contact = Contact::where('user_id', 1)->first();

// Get contact by email
$contact = Contact::where('email', 'user@example.com')->first();

// Get all subscribed contacts
$subscribers = Contact::where('status', 'subscribed')->get();

// Get customers
$customers = Contact::where('contact_type', 'customer')->get();

// Update contact
$contact->update([
    'first_name' => 'John',
    'last_name' => 'Doe',
    'phone' => '+1234567890'
]);
```

**Common Status Values:**

- `pending` - Pending confirmation
- `subscribed` - Active subscriber
- `bounced` - Email bounced
- `unsubscribed` - Unsubscribed from emails

**Common Contact Types:**

- `lead` - Potential customer/lead
- `customer` - Paying customer

**Integration with Community:**

```php
// Get community user's FluentCRM contact
$user = User::find(1);
$contact = Contact::where('user_id', $user->ID)->first();

if ($contact) {
    echo $contact->email;
    echo $contact->status;
    echo $contact->total_points;
}

// Sync community user with FluentCRM
if (!$contact) {
    $contact = Contact::create([
        'user_id' => $user->ID,
        'email' => $user->user_email,
        'first_name' => $user->first_name,
        'last_name' => $user->last_name,
        'status' => 'subscribed'
    ]);
}
```

**Common Queries:**

```php
// Get active subscribers
$activeSubscribers = Contact::where('status', 'subscribed')
    ->whereNotNull('user_id')
    ->get();

// Get contacts by country
$usContacts = Contact::where('country', 'US')->get();

// Get high-value customers
$highValueCustomers = Contact::where('contact_type', 'customer')
    ->where('life_time_value', '>', 1000)
    ->orderBy('life_time_value', 'desc')
    ->get();

// Get recently active contacts
$recentlyActive = Contact::where('last_activity', '>=', now()->subDays(30))
    ->orderBy('last_activity', 'desc')
    ->get();

// Get contacts by source
$sourceContacts = Contact::where('source', 'community_registration')->get();
```

**Contact Information:**

```php
// Get full name
$fullName = trim($contact->prefix . ' ' . $contact->first_name . ' ' . $contact->last_name);

// Get full address
$address = implode(', ', array_filter([
    $contact->address_line_1,
    $contact->address_line_2,
    $contact->city,
    $contact->state,
    $contact->postal_code,
    $contact->country
]));

// Check if contact is active
$isActive = $contact->status === 'subscribed';

// Check if contact is customer
$isCustomer = $contact->contact_type === 'customer';
```

**Points and Engagement:**

```php
// Get top engaged contacts
$topEngaged = Contact::whereNotNull('total_points')
    ->orderBy('total_points', 'desc')
    ->limit(10)
    ->get();

// Update contact points
$contact->total_points += 50;
$contact->last_activity = now();
$contact->save();
```

**Geographic Data:**

```php
// Get contacts by location
$nearbyContacts = Contact::whereNotNull('latitude')
    ->whereNotNull('longitude')
    ->get();

// Update location
$contact->update([
    'latitude' => 40.7128,
    'longitude' => -74.0060,
    'city' => 'New York',
    'state' => 'NY',
    'country' => 'US'
]);
```

**Note:** This model requires the FluentCRM plugin to be installed and active. The `fc_subscribers` table is created by FluentCRM.

---

### NotificationSubscription Model

Represents user notification preferences (different from NotificationSubscriber).

**Namespace:** `FluentCommunity\App\Models\NotificationSubscription`

**Table:** `fcom_notification_users` (shares table with NotificationSubscriber, differentiated by object_type)

**Fillable Attributes:**

```php
[
    'object_id',         // Preference object ID
    'user_id',           // User ID
    'is_read',           // Read status
    'object_type',       // Always 'notification_pref' (auto-set)
    'notification_type'  // Notification type preference
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\NotificationSubscription;

// Get user's notification preferences
$preferences = NotificationSubscription::where('user_id', 1)->get();

// Create notification preference
$pref = NotificationSubscription::create([
    'user_id' => 1,
    'object_id' => 123,
    'notification_type' => 'email'
]);

// Update preference
$pref->update(['is_read' => 1]);
```

**Relationships:**

```php
// Get user
$user = $subscription->user;

// Get user's extended profile
$xprofile = $subscription->xprofile;
```

**Automatic Behaviors:**

```php
// On creating:
// - Auto-sets object_type to 'notification_pref'

// On updating:
// - Auto-sets object_type to 'notification_pref'

// Global scope:
// - Automatically filters by object_type = 'notification_pref'
```

---

### SidebarLink Model

Represents custom sidebar links (extends BaseSpace).

**Namespace:** `FluentCommunity\App\Models\SidebarLink`

**Table:** `fcom_spaces` (shares table with Space/SpaceGroup, type='sidebar_link')

**Type:** `sidebar_link` (auto-set)

**Default Settings:**

```php
[
    'emoji' => '',           // Emoji icon
    'shape_svg' => '',       // SVG shape icon
    'permalink' => '',       // Link URL
    'membership_ids' => []   // Restricted to membership IDs
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\SidebarLink;

// Create sidebar link
$link = SidebarLink::create([
    'title' => 'Documentation',
    'slug' => 'documentation',
    'settings' => [
        'emoji' => '📚',
        'permalink' => 'https://docs.example.com'
    ]
]);

// Get all sidebar links
$links = SidebarLink::orderBy('serial')->get();

// Update link
$link->updateCustomData([
    'title' => 'Updated Title',
    'settings' => [
        'permalink' => 'https://new-url.com'
    ]
]);
```

**Note:** Inherits all properties and methods from BaseSpace model.

---

### UserMeta Model

Represents WordPress user metadata (wp_usermeta table).

**Namespace:** `FluentCommunity\App\Models\UserMeta`

**Table:** `usermeta` (WordPress core table)

**Primary Key:** `umeta_id`

**Timestamps:** Disabled

**Fillable Attributes:**

```php
[
    'user_id',    // User ID
    'meta_key',   // Meta key
    'meta_value'  // Meta value
]
```

**Basic Usage:**

```php
use FluentCommunity\App\Models\UserMeta;

// Get user meta by key
$meta = UserMeta::byUser($userId)
    ->byKey('_community_role')
    ->first();

// Create user meta
$meta = UserMeta::create([
    'user_id' => 1,
    'meta_key' => 'custom_field',
    'meta_value' => 'custom_value'
]);

// Update user meta
$meta->update(['meta_value' => 'new_value']);

// Delete user meta
$meta->delete();
```

**Relationships:**

```php
// Get user
$user = $userMeta->user;
```

**Query Scopes:**

```php
// Filter by meta key
$metas = UserMeta::byKey('_community_role')->get();

// Filter by user ID
$userMetas = UserMeta::byUser($userId)->get();

// Combine scopes
$meta = UserMeta::byUser($userId)
    ->byKey('_community_role')
    ->first();
```

**Common Meta Keys:**

- `_user_community_roles` - User community roles
- `_community_role` - Primary community role
- `first_name` - User first name
- `last_name` - User last name
- `nickname` - User nickname
- `description` - User bio/description

---

## Pro Models

### Follow Model

Manages user follow relationships (Pro feature).

**Namespace:** `FluentCommunityPro\App\Models\Follow`

**Table:** `fcom_followers`

**Fillable Attributes:**

```php
[
    'follower_id',  // User ID who is following
    'followed_id',  // User ID being followed
    'level'         // Follow level (default: 1)
]
```

**Basic Usage:**

```php
use FluentCommunityPro\App\Models\Follow;

// Follow a user
$follow = Follow::create([
    'follower_id' => 1,
    'followed_id' => 2,
    'level' => 1
]);

// Unfollow
$follow->delete();

// Get user's followers
$followers = Follow::where('followed_id', $userId)
    ->with('follower')
    ->get();

// Get users that user is following
$following = Follow::where('follower_id', $userId)
    ->with('followed')
    ->get();

// Check if user follows another user
$isFollowing = Follow::where('follower_id', $userId)
    ->where('followed_id', $targetUserId)
    ->exists();
```

**Relationships:**

```php
// Get follower's profile (who is following)
$followerProfile = $follow->follower;

// Get followed user's profile (being followed)
$followedProfile = $follow->followed;
```

**Common Patterns:**

```php
// Count followers
$followerCount = Follow::where('followed_id', $userId)->count();

// Count following
$followingCount = Follow::where('follower_id', $userId)->count();

// Get mutual follows
$mutualFollows = Follow::where('follower_id', $userId)
    ->whereIn('followed_id', function($query) use ($userId) {
        $query->select('follower_id')
            ->from('fcom_followers')
            ->where('followed_id', $userId);
    })
    ->get();
```

---

### Moderation Model

Manages content moderation reports (Pro feature).

**Namespace:** `FluentCommunityPro\App\Models\Moderation`

**Table:** `fcom_post_comments` (shares table with Comment, type='report')

**Fillable Attributes:**

```php
[
    'user_id',       // Reporter user ID
    'parent_id',     // Comment ID (if reporting comment)
    'post_id',       // Feed/post ID
    'reason',        // Report reason (mapped to 'message')
    'explanation',   // Detailed explanation (mapped to 'message_rendered')
    'meta',          // Additional metadata (serialized)
    'type',          // Always 'report' (auto-set)
    'status',        // Report status (pending, reviewed, resolved, dismissed)
    'content_type',  // Type of content being reported (feed, comment)
    'reports_count', // Number of reports (mapped to 'reactions_count')
    'created_at',    // Creation timestamp
    'updated_at'     // Update timestamp
]
```

**Basic Usage:**

```php
use FluentCommunityPro\App\Models\Moderation;

// Create report
$report = Moderation::create([
    'user_id' => 1,
    'post_id' => 123,
    'content_type' => 'feed',
    'reason' => 'spam',
    'explanation' => 'This post contains spam content',
    'status' => 'pending'
]);

// Get pending reports
$pendingReports = Moderation::where('status', 'pending')
    ->with(['post', 'reporter'])
    ->orderBy('created_at', 'desc')
    ->get();

// Update report status
$report->update(['status' => 'reviewed']);

// Delete report (also deletes related notifications)
$report->delete();
```

**Relationships:**

```php
// Get reported post/feed
$post = $report->post;

// Get reported comment (if content_type is 'comment')
$comment = $report->comment;

// Get reporter's profile
$reporter = $report->reporter;
```

**Attribute Mapping:**

```php
// These attributes are mapped to Comment table columns:
// 'reason' => 'message'
// 'explanation' => 'message_rendered'
// 'reports_count' => 'reactions_count'
```

**Automatic Behaviors:**

```php
// On creating:
// - Auto-sets status to 'pending' if not provided
// - Auto-sets type to 'report'

// On deleting:
// - Automatically deletes related Notification records

// Global scope:
// - Automatically filters by type = 'report'
// - Automatically selects mapped columns
```

**Common Report Reasons:**

- `spam` - Spam content
- `harassment` - Harassment or bullying
- `inappropriate` - Inappropriate content
- `misinformation` - False information
- `copyright` - Copyright violation
- `other` - Other reasons

**Common Status Values:**

- `pending` - Awaiting review
- `reviewed` - Under review
- `resolved` - Issue resolved
- `dismissed` - Report dismissed

**Moderation Workflow:**

```php
// Get reports by content type
$feedReports = Moderation::where('content_type', 'feed')
    ->where('status', 'pending')
    ->get();

$commentReports = Moderation::where('content_type', 'comment')
    ->where('status', 'pending')
    ->get();

// Get reports for specific content
$postReports = Moderation::where('post_id', $postId)
    ->where('content_type', 'feed')
    ->get();

// Count reports by status
$pendingCount = Moderation::where('status', 'pending')->count();
$reviewedCount = Moderation::where('status', 'reviewed')->count();
```

---

## Query Builder Methods

All models support standard Eloquent query methods:

### Basic Queries

```php
// Get all records
$feeds = Feed::all();

// Find by ID
$feed = Feed::find(1);

// Find or fail (throws exception if not found)
$feed = Feed::findOrFail(1);

// First record
$feed = Feed::first();

// Count records
$count = Feed::count();
```

### Where Clauses

```php
// Simple where
$feeds = Feed::where('status', 'published')->get();

// Multiple conditions
$feeds = Feed::where('status', 'published')
    ->where('space_id', 5)
    ->get();

// Or where
$feeds = Feed::where('status', 'published')
    ->orWhere('status', 'draft')
    ->get();

// Where in
$feeds = Feed::whereIn('space_id', [1, 2, 3])->get();

// Where not null
$feeds = Feed::whereNotNull('title')->get();
```

### Ordering and Limiting

```php
// Order by
$feeds = Feed::orderBy('created_at', 'desc')->get();

// Limit
$feeds = Feed::limit(10)->get();

// Offset
$feeds = Feed::offset(10)->limit(10)->get();

// Pagination
$feeds = Feed::paginate(20);
```

### Relationships

```php
// Eager loading
$feeds = Feed::with(['user', 'space', 'comments'])->get();

// Lazy eager loading
$feeds = Feed::all();
$feeds->load('comments');

// Relationship counts
$feeds = Feed::withCount('comments')->get();
```

---

## Creating Records

```php
// Using create
$feed = Feed::create([
    'user_id' => 1,
    'title' => 'My Post',
    'message' => 'Content here'
]);

// Using new and save
$feed = new Feed();
$feed->user_id = 1;
$feed->title = 'My Post';
$feed->message = 'Content here';
$feed->save();
```

---

## Updating Records

```php
// Update single record
$feed = Feed::find(1);
$feed->update(['title' => 'New Title']);

// Update multiple records
Feed::where('status', 'draft')
    ->update(['status' => 'published']);
```

---

## Deleting Records

```php
// Delete single record
$feed = Feed::find(1);
$feed->delete();

// Delete by ID
Feed::destroy(1);

// Delete multiple
Feed::destroy([1, 2, 3]);

// Delete with conditions
Feed::where('status', 'draft')->delete();
```

---

## Best Practices

1. **Use Relationships** - Leverage model relationships instead of manual joins
2. **Eager Load** - Use `with()` to prevent N+1 query problems
3. **Use Scopes** - Create reusable query scopes for common filters
4. **Validate Data** - Always validate before creating/updating
5. **Handle Exceptions** - Use try-catch for database operations
6. **Use Transactions** - For operations that modify multiple tables

---

## Example: Complete CRUD Operations

```php
use FluentCommunity\App\Models\Feed;

// Create
$feed = Feed::create([
    'user_id' => get_current_user_id(),
    'space_id' => 1,
    'title' => 'My First Post',
    'message' => 'This is my first community post!',
    'type' => 'feed',
    'status' => 'published',
    'privacy' => 'public'
]);

// Read
$feed = Feed::with(['user', 'space', 'comments'])
    ->find($feed->id);

// Update
$feed->update([
    'title' => 'My Updated Post',
    'message' => 'Updated content here'
]);

// Delete
$feed->delete();
```

---

## Next Steps

- [Database Schema](/database/schema) - Learn about table structures
- [REST API](/rest-api/) - Access models via REST API
- [Developer Hooks](/hooks/) - Hook into model events

---

## Need Help?

- Check the [Getting Started Guide](/getting-started)
- Review [Code Examples](/rest-api/examples)
- Explore [Developer Hooks](/hooks/)

