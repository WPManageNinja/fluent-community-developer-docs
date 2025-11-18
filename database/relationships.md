# Model Relationships ​

Fluent Community uses Eloquent ORM relationships to establish connections between different models. Understanding these relationships is crucial for efficient data querying and manipulation.

## Relationship Types ​

Fluent Community models use the following relationship types:

- **One-to-One** - Each model has one related model
- **One-to-Many** - One model has many related models
- **Many-to-Many** - Models can have multiple related models
- **Polymorphic** - Models can relate to multiple different model types
- **Has One Through** - Access distant relationships through intermediate models

---

## Core Model Relationships ​

### Feed Relationships ​

The Feed model is central to Fluent Community and has multiple relationships:

```php
// Feed belongs to one User (WordPress user)
$feed = Feed::find(1);
$user = $feed->user;

// Feed belongs to one XProfile
$xprofile = $feed->xprofile;

// Feed belongs to one Space
$space = $feed->space;

// Feed has many Comments
$comments = $feed->comments;

// Feed has many Reactions
$reactions = $feed->reactions;

// Feed has many Activities
$activities = $feed->activities;

// Feed has many Notifications
$notifications = $feed->notifications;

// Feed has many Media
$media = $feed->media;

// Feed has many Survey Votes
$surveyVotes = $feed->surveyVotes();

// Feed belongs to many Terms (topics/tags)
$terms = $feed->terms;

// Feed has many Follows (through user_id)
$follows = $feed->follows;
```

#### Feed Model Relationships ​

| Relationship | Type | Related Model | Foreign Key | Local Key |
|--------------|------|---------------|-------------|-----------|
| user | belongsTo | User | user_id | ID |
| xprofile | belongsTo | XProfile | user_id | user_id |
| space | belongsTo | BaseSpace | space_id | id |
| comments | hasMany | Comment | post_id | id |
| reactions | hasMany | Reaction | object_id | id |
| activities | hasMany | Activity | feed_id | id |
| notifications | hasMany | Notification | feed_id | id |
| media | hasMany | Media | feed_id | id |
| surveyVotes | hasMany | Reaction | object_id | id |
| terms | belongsToMany | Term | post_id | term_id |
| follows | hasMany | Follow | followed_id | user_id |

---

### Comment Relationships ​

Comments are connected to multiple entities:

```php
// Comment belongs to one User
$comment = Comment::find(1);
$user = $comment->user;

// Comment belongs to one XProfile
$xprofile = $comment->xprofile;

// Comment belongs to one Feed (post)
$post = $comment->post;

// Comment has one Space (through Feed)
$space = $comment->space;

// Comment has many Reactions
$reactions = $comment->reactions;

// Comment has one Media
$media = $comment->media;
```

#### Comment Model Relationships ​

| Relationship | Type | Related Model | Foreign Key | Local Key |
|--------------|------|---------------|-------------|-----------|
| user | belongsTo | User | user_id | ID |
| xprofile | belongsTo | XProfile | user_id | user_id |
| post | belongsTo | Feed | post_id | id |
| space | hasOneThrough | BaseSpace | id (Feed) | post_id |
| reactions | hasMany | Reaction | object_id | id |
| media | hasOne | Media | sub_object_id | id |

---

### Space Relationships ​

Spaces have complex relationships for community organization:

```php
// Space belongs to one User (owner/creator)
$space = Space::find(1);
$owner = $space->owner;

// Space belongs to one SpaceGroup (parent)
$group = $space->group;

// Space has one SpaceUserPivot
$pivot = $space->space_pivot;

// Space has many Feeds (posts)
$posts = $space->posts;

// Space has many Comments (through Feeds)
$comments = $space->comments;

// Space belongs to many Users (members)
$members = $space->members;

// Space belongs to many XProfiles (member profiles)
$xprofiles = $space->xprofiles;
```

#### Space Model Relationships ​

| Relationship | Type | Related Model | Foreign Key | Local Key |
|--------------|------|---------------|-------------|-----------|
| owner | belongsTo | User | created_by | ID |
| group | belongsTo | SpaceGroup | parent_id | id |
| space_pivot | belongsTo | SpaceUserPivot | id | space_id |
| posts | hasMany | Feed | space_id | id |
| comments | hasManyThrough | Comment | space_id (Feed) | post_id |
| members | belongsToMany | User | space_id | user_id |
| xprofiles | belongsToMany | XProfile | space_id | user_id |

---

### User Relationships ​

Users connect to multiple community entities:

```php
// User has one XProfile
$user = User::find(1);
$xprofile = $user->xprofile;

// User belongs to many Spaces
$spaces = $user->spaces;

// User belongs to many Courses
$courses = $user->courses;

// User has many Follows (users this user follows)
$follows = $user->follows;

// User has many Followers (users following this user)
$followers = $user->followers;

// User has many UserMeta
$usermeta = $user->usermeta;
```

#### User Model Relationships ​

| Relationship | Type | Related Model | Foreign Key | Local Key |
|--------------|------|---------------|-------------|-----------|
| xprofile | belongsTo | XProfile | ID | user_id |
| spaces | belongsToMany | BaseSpace | user_id | space_id |
| courses | belongsToMany | Course | user_id | space_id |
| follows | hasMany | Follow | follower_id | ID |
| followers | hasMany | Follow | followed_id | ID |
| usermeta | hasMany | UserMeta | user_id | ID |

---

### XProfile Relationships ​

Extended user profiles connect to community data:

```php
// XProfile belongs to one User
$xprofile = XProfile::find(1);
$user = $xprofile->user;

// XProfile has one Contact (FluentCRM)
$contact = $xprofile->contact;

// XProfile belongs to many Spaces
$spaces = $xprofile->spaces;

// XProfile has many Feeds (posts)
$posts = $xprofile->posts;

// XProfile has many Comments
$comments = $xprofile->comments;

// XProfile belongs to many Courses
$courses = $xprofile->courses;
```

#### XProfile Model Relationships ​

| Relationship | Type | Related Model | Foreign Key | Local Key |
|--------------|------|---------------|-------------|-----------|
| user | belongsTo | User | user_id | ID |
| contact | hasOne | Contact | user_id | user_id |
| spaces | belongsToMany | BaseSpace | user_id | space_id |
| posts | hasMany | Feed | user_id | user_id |
| comments | hasMany | Comment | user_id | user_id |
| courses | belongsToMany | Course | user_id | space_id |

---

### Reaction Relationships ​

Reactions are polymorphic and can be attached to different entities:

```php
// Reaction belongs to one User
$reaction = Reaction::find(1);
$user = $reaction->user;

// Reaction belongs to one XProfile
$xprofile = $reaction->xprofile;

// Reaction belongs to one Feed (if object_type is 'feed')
$feed = $reaction->feed;

// Reaction belongs to one Comment (if object_type is 'comment')
$comment = $reaction->comment;
```

#### Reaction Model Relationships ​

| Relationship | Type | Related Model | Foreign Key | Local Key |
|--------------|------|---------------|-------------|-----------|
| user | belongsTo | User | user_id | ID |
| xprofile | belongsTo | XProfile | user_id | user_id |
| feed | belongsTo | Feed | object_id | id |
| comment | belongsTo | Comment | object_id | id |

---

### Notification Relationships ​

Notifications connect users to community activities:

```php
// Notification belongs to one Feed
$notification = Notification::find(1);
$feed = $notification->feed;

// Notification belongs to one User (source user)
$srcUser = $notification->src_user;

// Notification has many NotificationSubscribers
$subscribers = $notification->subscribers;

// Notification has one NotificationSubscriber
$subscriber = $notification->subscriber;
```

#### Notification Model Relationships ​

| Relationship | Type | Related Model | Foreign Key | Local Key |
|--------------|------|---------------|-------------|-----------|
| feed | belongsTo | Feed | feed_id | id |
| src_user | belongsTo | User | src_user_id | ID |
| subscribers | hasMany | NotificationSubscriber | object_id | id |
| subscriber | hasOne | NotificationSubscriber | object_id | id |

---



### Activity Relationships ​

Activities track user actions in the community:

```php
// Activity belongs to one User
$activity = Activity::find(1);
$user = $activity->user;

// Activity belongs to one XProfile
$xprofile = $activity->xprofile;

// Activity belongs to one Feed
$feed = $activity->feed;

// Activity belongs to one Space
$space = $activity->space;
```

#### Activity Model Relationships ​

| Relationship | Type | Related Model | Foreign Key | Local Key |
|--------------|------|---------------|-------------|-----------|
| user | belongsTo | User | user_id | ID |
| xprofile | belongsTo | XProfile | user_id | user_id |
| feed | belongsTo | Feed | feed_id | id |
| space | belongsTo | BaseSpace | space_id | id |

---

### Term Relationships ​

Terms (topics/tags) organize content:

```php
// Term belongs to many Feeds (posts)
$term = Term::find(1);
$posts = $term->posts;
```

#### Term Model Relationships ​

| Relationship | Type | Related Model | Foreign Key | Local Key |
|--------------|------|---------------|-------------|-----------|
| posts | belongsToMany | Feed | term_id | post_id |

---

### SpaceUserPivot Relationships ​

Space membership pivot table relationships:

```php
// SpaceUserPivot belongs to one User
$pivot = SpaceUserPivot::find(1);
$user = $pivot->user;

// SpaceUserPivot belongs to one XProfile
$xprofile = $pivot->xprofile;

// SpaceUserPivot belongs to one Space
$space = $pivot->space;
```

#### SpaceUserPivot Model Relationships ​

| Relationship | Type | Related Model | Foreign Key | Local Key |
|--------------|------|---------------|-------------|-----------|
| user | belongsTo | User | user_id | ID |
| xprofile | belongsTo | XProfile | user_id | user_id |
| space | belongsTo | BaseSpace | space_id | id |

---

### Media Relationships ​

Media files attached to content:

```php
// Media belongs to one User
$media = Media::find(1);
$user = $media->user;

// Media belongs to one XProfile
$xprofile = $media->xprofile;

// Media belongs to one Feed
$feed = $media->feed;
```

#### Media Model Relationships ​

| Relationship | Type | Related Model | Foreign Key | Local Key |
|--------------|------|---------------|-------------|-----------|
| user | belongsTo | User | user_id | ID |
| xprofile | belongsTo | XProfile | user_id | user_id |
| feed | belongsTo | Feed | feed_id | id |

---

## Pro Plugin Relationships ​

### Follow Relationships (Pro) ​

User following system for Pro version:

```php
// Follow belongs to one XProfile (follower)
$follow = Follow::find(1);
$follower = $follow->follower;

// Follow belongs to one XProfile (followed user)
$followed = $follow->followed;
```

#### Follow Model Relationships ​

| Relationship | Type | Related Model | Foreign Key | Local Key |
|--------------|------|---------------|-------------|-----------|
| follower | belongsTo | XProfile | follower_id | user_id |
| followed | belongsTo | XProfile | followed_id | user_id |

---

## Relationship Usage Examples ​

### Eager Loading ​

Prevent N+1 queries by eager loading relationships:

```php
// Load feeds with their users, spaces, and comments
$feeds = Feed::with(['user', 'xprofile', 'space', 'comments'])->get();

// Load spaces with their members and posts
$spaces = Space::with(['members', 'posts'])->get();

// Load comments with their post and reactions
$comments = Comment::with(['post', 'reactions', 'user'])->get();

// Load users with their profile and spaces
$users = User::with(['xprofile', 'spaces'])->get();
```

---

### Querying with Relationships ​

Use relationships in queries:

```php
// Get feeds for users with specific email
$feeds = Feed::whereHas('user', function($query) {
    $query->where('user_email', '[email protected]');
})->get();

// Get spaces with active members
$spaces = Space::whereHas('members', function($query) {
    $query->where('status', 'active');
})->get();

// Get comments that have reactions
$comments = Comment::whereHas('reactions')->get();

// Get users who are members of a specific space
$users = User::whereHas('spaces', function($query) use ($spaceId) {
    $query->where('space_id', $spaceId);
})->get();
```

---

### Filtering by Relationship Data ​

```php
// Get feeds with more than 10 comments
$feeds = Feed::has('comments', '>', 10)->get();

// Get users with verified profiles
$users = User::whereHas('xprofile', function($query) {
    $query->where('is_verified', 1);
})->get();

// Get spaces created in specific date range
$spaces = Space::whereHas('owner', function($query) {
    $query->whereBetween('user_registered', ['2024-01-01', '2024-12-31']);
})->get();
```

---

### Counting Relationships ​

```php
// Get feeds with comment count
$feeds = Feed::withCount('comments')->get();

// Get spaces with member count
$spaces = Space::withCount('members')->get();

// Get users with space count
$users = User::withCount('spaces')->get();

// Get feeds with reaction count by type
$feeds = Feed::withCount([
    'reactions as likes_count' => function($query) {
        $query->where('type', 'like');
    },
    'reactions as bookmarks_count' => function($query) {
        $query->where('type', 'bookmark');
    }
])->get();
```

---

### Complex Relationship Queries ​

```php
// Get users with their latest feed post
$users = User::with(['xprofile.posts' => function($query) {
    $query->latest()->limit(1);
}])->get();

// Get feeds with their space's member count
$feeds = Feed::with(['space' => function($query) {
    $query->withCount('members');
}])->get();

// Get comments with their post's space information
$comments = Comment::with(['post.space'])->get();

// Get spaces with their most active members (by post count)
$spaces = Space::with(['xprofiles' => function($query) {
    $query->withCount('posts')->orderBy('posts_count', 'desc')->limit(10);
}])->get();
```

---

## Relationship Best Practices ​

### 1. Use Eager Loading ​

Always eager load relationships to prevent N+1 queries:

```php
// Bad - N+1 queries
$feeds = Feed::all();
foreach ($feeds as $feed) {
    echo $feed->user->display_name; // N+1 query
}

// Good - Eager loading
$feeds = Feed::with('user')->get();
foreach ($feeds as $feed) {
    echo $feed->user->display_name; // No additional queries
}
```

---

### 2. Use Specific Columns ​

Only load the columns you need:

```php
// Load only specific columns
$feeds = Feed::with(['user:ID,display_name,user_email'])->get();

// Load specific columns from multiple relationships
$comments = Comment::with([
    'user:ID,display_name',
    'post:id,title,slug'
])->get();
```

---

### 3. Use Constraints ​

Apply constraints to relationships:

```php
// Load only published posts
$spaces = Space::with(['posts' => function($query) {
    $query->where('status', 'published');
}])->get();

// Load only active members
$spaces = Space::with(['members' => function($query) {
    $query->wherePivot('status', 'active');
}])->get();
```

---

### 4. Use Lazy Loading Wisely ​

Lazy load when you don't always need the relationship:

```php
$feed = Feed::find(1);

// Only load when needed
if ($needComments) {
    $comments = $feed->comments;
}

// Check if relationship is loaded
if ($feed->relationLoaded('comments')) {
    $comments = $feed->comments;
}
```

---

### 5. Use Relationship Methods ​

Use relationship methods for complex queries:

```php
// Get published feeds for specific space
$space = Space::find(1);
$feeds = $space->posts()->where('status', 'published')->get();

// Get active members for space
$activeMembers = $space->members()->wherePivot('status', 'active')->get();

// Get user's feeds in specific space
$user = User::find(1);
$feeds = $user->xprofile->posts()->where('space_id', $spaceId)->get();
```

---

## Common Relationship Patterns ​

### 1. Parent-Child Relationships ​

```php
// Feed -> Comments
$feed = Feed::find(1);
$comments = $feed->comments;

// Space -> Feeds
$space = Space::find(1);
$feeds = $space->posts;

// User -> XProfile
$user = User::find(1);
$xprofile = $user->xprofile;
```

---

### 2. Many-to-Many Relationships ​

```php
// User -> Spaces
$user = User::find(1);
$spaces = $user->spaces;

// Feed -> Terms
$feed = Feed::find(1);
$terms = $feed->terms;

// Space -> Members
$space = Space::find(1);
$members = $space->members;
```

---


### 3. Polymorphic Relationships ​

```php
// Reactions can belong to different models
$reactions = Reaction::where('object_type', 'feed')
    ->where('object_id', 1)
    ->get();

// Get all reactions for a feed
$feed = Feed::find(1);
$reactions = $feed->reactions;

// Get all reactions for a comment
$comment = Comment::find(1);
$reactions = $comment->reactions;
```

---

### 4. Through Relationships ​

```php
// Comment -> Space (through Feed)
$comment = Comment::find(1);
$space = $comment->space;

// Space -> Comments (through Feeds)
$space = Space::find(1);
$comments = $space->comments;
```

---

## Performance Considerations ​

### 1. Index Foreign Keys ​

Ensure foreign key columns are indexed:

```sql
-- Add indexes for better performance
ALTER TABLE fcom_posts ADD INDEX idx_user_id (user_id);
ALTER TABLE fcom_posts ADD INDEX idx_space_id (space_id);
ALTER TABLE fcom_post_comments ADD INDEX idx_post_id (post_id);
ALTER TABLE fcom_post_reactions ADD INDEX idx_object_id (object_id);
ALTER TABLE fcom_space_user ADD INDEX idx_user_id (user_id);
ALTER TABLE fcom_space_user ADD INDEX idx_space_id (space_id);
```

---

### 2. Use Query Scopes ​

Create scopes for common relationship queries:

```php
// In Feed model
public function scopeWithAuthor($query) {
    return $query->with(['user', 'xprofile']);
}

public function scopeWithEngagement($query) {
    return $query->withCount(['comments', 'reactions']);
}

// Usage
$feeds = Feed::withAuthor()->withEngagement()->get();
```

---

### 3. Cache Relationship Data ​

Cache frequently accessed relationship data:

```php
// Cache user's spaces
$user = User::find(1);
$spaces = Cache::remember("user_{$user->ID}_spaces", 3600, function() use ($user) {
    return $user->spaces()->with('xprofiles')->get();
});

// Cache space members
$space = Space::find(1);
$members = Cache::remember("space_{$space->id}_members", 3600, function() use ($space) {
    return $space->members()->wherePivot('status', 'active')->get();
});
```

---

## Next Steps ​

- Learn about [Query Builder](./query-builder.md) for advanced queries
- Explore [Database Schema](./schema.md) for table structures
- Check [Database Models](./models.md) for model details

