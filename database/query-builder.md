# Fluent Community Query Builder ​​

Fluent Community uses an Eloquent-based ORM system compatible with Laravel's Eloquent ORM. You can interact with database tables through Model classes or using direct query builder methods.

::: tip
Fluent Community's ORM is compatible with Laravel Framework's Eloquent ORM. If you are familiar with Laravel's Eloquent, you will feel right at home using Fluent Community's database system.
:::

## Example Using Models ​

Here is an example using Fluent Community models:

```php
use FluentCommunity\App\Models\Feed;

// Using the Feed model
$feeds = Feed::where('status', 'published')
            ->whereBetween('created_at', ['2024-01-01 00:00:00', '2024-12-30 23:59:59'])
            ->when($spaceId, function ($query) use ($spaceId) {
                return $query->where('space_id', $spaceId);
            })
            ->orderBy('created_at', 'DESC')
            ->get();
```

## Example Using Query Builder ​

You can also use the query builder directly:

```php
use FluentCommunity\App\Models\Feed;

$query = Feed::query()
            ->select(['title', 'message', 'status', 'created_at'])
            ->where('status', 'published')
            ->whereBetween('created_at', ['2024-01-01 00:00:00', '2024-12-30 23:59:59'])
            ->when($spaceId, function ($query) use ($spaceId) {
                return $query->where('space_id', $spaceId);
            })
            ->orderBy('created_at', 'DESC');
```

## Retrieving Results ​

### Retrieving All Rows From A Table ​

You can use the model's query builder to retrieve all rows from a table. The query builder provides a fluent interface for building database queries:

```php
<?php

use FluentCommunity\App\Models\Feed;

class FeedController extends Controller
{
    /**
     * Show a list of all the community's feeds.
     *
     * @return Response
     */
    public function index()
    {
        $feeds = Feed::all();
        // or using query builder
        $feeds = Feed::query()->get();

        return [
            'feeds' => $feeds
        ];
    }
}
```

The `get` method returns a collection containing the results where each result is an instance of the Model object. You may access each column's value by accessing the column as a property of the object:

```php
foreach ($feeds as $feed) {
    echo $feed->title;
}
```

### Retrieving A Single Row / Column From A Table ​

If you just need to retrieve a single row from the database table, you may use the `first` method. This method will return a single Model object:

```php
use FluentCommunity\App\Models\Feed;

$feed = Feed::where('status', 'published')->first();

echo $feed->title;
```

If you don't even need an entire row, you may extract a single value from a record using the `value` method. This method will return the value of the column directly:

```php
use FluentCommunity\App\Models\Feed;

$title = Feed::where('status', 'published')->value('title');
```

### Retrieving A List Of Column Values ​

If you would like to retrieve an array containing the values of a single column, you may use the `pluck` method. In this example, we'll retrieve an array of feed IDs:

```php
$feedIds = Feed::pluck('id');

foreach ($feedIds as $feedId) {
    echo $feedId;
}
```

You may also specify a custom key column for the returned Collection:

```php
$feedTitles = Feed::pluck('title', 'id');

foreach ($feedTitles as $id => $title) {
    echo $title;
}
```

### Chunking Results ​

If you need to work with thousands of database records, consider using the `chunk` method. This method retrieves a small chunk of the results at a time and feeds each chunk into a Closure for processing. This method is very useful for processing thousands of records. For example, let's work with the entire `fcom_posts` table in chunks of 100 records at a time:

```php
Feed::orderBy('id')->chunk(100, function ($feeds) {
    foreach ($feeds as $feed) {
        // Process each feed
    }
});
```

You may stop further chunks from being processed by returning `false` from the Closure:

```php
Feed::orderBy('id')->chunk(100, function ($feeds) {
    // Process the records...

    return false;
});
```

## Aggregates ​

The query builder also provides a variety of aggregate methods such as `count`, `max`, `min`, `avg`, and `sum`. You may call any of these methods after constructing your query:

```php
$feedCount = Feed::count();

$maxReactions = Feed::max('reactions_count');
```

Of course, you may combine these methods with other clauses:

```php
$avgComments = Feed::where('status', 'published')
                ->avg('comments_count');
```

### Determining If Records Exist ​

Instead of using the `count` method to determine if any records exist that match your query's constraints, you may use the `exists`:

```php
return Feed::where('status', 'published')->exists();
```

## Selects ​

### Specifying A Select Clause ​

Of course, you may not always want to select all columns from a database table. Using the `select` method, you can specify a custom select clause for the query:

```php
$feeds = Feed::select('title', 'message as content')->get();
```

The `distinct` method allows you to force the query to return distinct results:

```php
$feeds = Feed::distinct()->get();
```

If you already have a query builder instance and wish to add a column to its existing select clause, you may use the `addSelect` method:

```php
$query = Feed::select('title');

$feeds = $query->addSelect('message')->get();
```

## Raw Expressions ​

Sometimes you may need to use a raw expression in a query. To create a raw expression, you may use WordPress's `$wpdb` object:

```php
global $wpdb;

$feeds = Feed::select($wpdb->prepare('count(*) as feed_count, status'))
                     ->where('status', '<>', 'draft')
                     ->groupBy('status')
                     ->get();
```

## Raw Methods ​

### selectRaw ​

The `selectRaw` method can be used in place of `select()`. This method accepts an optional array of bindings as its second argument:

```php
global $wpdb;

$feeds = Feed::selectRaw('reactions_count * ? as engagement_score', [1.5])
                ->get();
```

### whereRaw / orWhereRaw ​

The `whereRaw` and `orWhereRaw` methods can be used to inject a raw where clause into your query. These methods accept an optional array of bindings as their second argument:

```php
$feeds = Feed::whereRaw('reactions_count > (comments_count * 2)')
                ->get();
```

### havingRaw / orHavingRaw ​

The `havingRaw` and `orHavingRaw` methods may be used to set a raw string as the value of the having clause. These methods accept an optional array of bindings as their second argument:

```php
global $wpdb;

$feeds = Feed::select('space_id', $wpdb->prepare('SUM(reactions_count) as total'))
                ->groupBy('space_id')
                ->havingRaw('SUM(reactions_count) > ?', [100])
                ->get();
```

### orderByRaw ​

The `orderByRaw` method may be used to set a raw string as the value of the order by clause:

```php
$feeds = Feed::orderByRaw('FIELD(status, "published", "scheduled", "draft")')
                ->get();
```

## Joins ​

### Inner Join Statement ​

The query builder may also be used to write join statements. To perform a basic "inner join", you may use the `join` method on a query builder instance. The first argument passed to the `join` method is the name of the table you need to join to, while the remaining arguments specify the column constraints for the join. Of course, as you can see, you can join to multiple tables in a single query:

```php
global $wpdb;

$feeds = Feed::join($wpdb->prefix . 'fcom_spaces', 'fcom_posts.space_id', '=', 'fcom_spaces.id')
            ->join($wpdb->prefix . 'fcom_post_comments', 'fcom_posts.id', '=', 'fcom_post_comments.post_id')
            ->select('fcom_posts.*', 'fcom_spaces.title as space_title')
            ->get();
```

### Left Join / Right Join Statement ​

If you would like to perform a "left join" instead of an "inner join", use the `leftJoin` method. The `leftJoin` method has the same signature as the `join` method:

```php
global $wpdb;

$feeds = Feed::leftJoin($wpdb->prefix . 'fcom_spaces', 'fcom_posts.space_id', '=', 'fcom_spaces.id')
            ->get();
```

Similarly, you may use the `rightJoin` method to perform a "right join":

```php
global $wpdb;

$feeds = Feed::rightJoin($wpdb->prefix . 'fcom_spaces', 'fcom_posts.space_id', '=', 'fcom_spaces.id')
            ->get();
```

### Cross Join Statement ​

To perform a "cross join" use the `crossJoin` method with the name of the table you wish to cross join to. Cross joins generate a cartesian product between the first table and the joined table:

```php
global $wpdb;

$results = Feed::crossJoin($wpdb->prefix . 'fcom_terms')
            ->get();
```

### Advanced Join Clauses ​

## Additional Where Clauses ​

### whereBetween / orWhereBetween ​

The `whereBetween` method verifies that a column's value is between two values:

```php
$feeds = Feed::whereBetween('reactions_count', [10, 100])
                    ->get();
```

The `whereNotBetween` method verifies that a column's value is outside of two values:

```php
$feeds = Feed::whereNotBetween('reactions_count', [10, 100])
                    ->get();
```

### whereIn / whereNotIn / orWhereIn / orWhereNotIn ​

The `whereIn` method verifies that a given column's value is contained within the given array:

```php
$feeds = Feed::whereIn('status', ['published', 'scheduled'])
                    ->get();
```

The `whereNotIn` method verifies that the given column's value is not contained in the given array:

```php
$feeds = Feed::whereNotIn('status', ['draft', 'deleted'])
                    ->get();
```

### whereNull / whereNotNull / orWhereNull / orWhereNotNull ​

The `whereNull` method verifies that the value of the given column is NULL:

```php
$feeds = Feed::whereNull('deleted_at')
                    ->get();
```

The `whereNotNull` method verifies that the column's value is not NULL:

```php
$feeds = Feed::whereNotNull('space_id')
                    ->get();
```

### whereDate / whereYear ​

The `whereDate` method may be used to compare a column's value against a date:

```php
$feeds = Feed::whereDate('created_at', '2024-12-31')
                ->get();
```

The `whereYear` method may be used to compare a column's value against a specific year:

```php
$feeds = Feed::whereYear('created_at', '2024')
                ->get();
```

## Parameter Grouping ​

Sometimes you may need to create more advanced where clauses such as "where exists" or nested parameter groupings. The Fluent Community query builder can handle these as well. To get started, let's look at an example of grouping constraints within parenthesis:

```php
Feed::where('status', '=', 'published')
            ->where(function ($query) {
                $query->where('reactions_count', '>', 100)
                      ->orWhere('comments_count', '>', 50);
            })
            ->get();
```

As you can see, passing a Closure into the `where` method instructs the query builder to begin a constraint group. The Closure will receive a query builder instance which you can use to set the constraints that should be contained within the parenthesis group. The example above will produce the following SQL:

```sql
select * from fcom_posts where status = 'published' and (reactions_count > 100 or comments_count > 50)
```

## Where Exists Clauses ​

The `whereExists` method allows you to write where exists SQL clauses. The `whereExists` method accepts a Closure argument, which will receive a query builder instance allowing you to define the query that should be placed inside the "exists" clause:

```php
global $wpdb;

Feed::whereExists(function ($query) use ($wpdb) {
            $query->selectRaw('1')
                  ->from($wpdb->prefix . 'fcom_post_comments')
                  ->whereRaw('fcom_post_comments.post_id = fcom_posts.id');
        })
        ->get();
```

The query above will produce the following SQL:

```sql
select * from fcom_posts
where exists (
    select 1 from fcom_post_comments where fcom_post_comments.post_id = fcom_posts.id
)
```

## Ordering, Grouping, Limit, & Offset ​

### orderBy ​

The `orderBy` method allows you to sort the result of the query by a given column. The first argument to the `orderBy` method should be the column you wish to sort by, while the second argument controls the direction of the sort and may be either `asc` or `desc`:

```php
$feeds = Feed::orderBy('created_at', 'DESC')
                ->get();
```

### latest / oldest ​

The `latest` and `oldest` methods allow you to easily order results by date. By default, result will be ordered by the `created_at` column. Or, you may pass the column name that you wish to sort by:

```php
$feeds = Feed::latest()
                ->get();
```

### groupBy / having ​

The `groupBy` and `having` methods may be used to group the query results. The `having` method's signature is similar to that of the `where` method:

```php
$feeds = Feed::groupBy('space_id')
                ->having('space_id', '>', 10)
                ->get();
```

You may pass multiple arguments to the `groupBy` method to group by multiple columns:

```php
$feeds = Feed::groupBy('space_id', 'status')
                ->having('space_id', '>', 10)
                ->get();
```

### skip / take ​

To limit the number of results returned from the query, or to skip a given number of results in the query, you may use the `skip` and `take` methods:

```php
$feeds = Feed::skip(10)
                ->take(5)
                ->get();
```

Alternatively, you may use the `limit` and `offset` methods:

```php
$feeds = Feed::limit(10)
                ->offset(5)
                ->get();
```

## Conditional Clauses ​

Sometimes you may want clauses to apply to a query only when something else is true. For instance, you may only want to apply a where statement if a given input value is present on the incoming request. You may accomplish this using `when` method:

```php
$spaceId = $request->get('space_id');

$feeds = Feed::when($spaceId, function ($query, $spaceId) {
                    return $query->where('space_id', $spaceId);
                })
                ->get();
```

The `when` method only executes the given Closure when the first parameter is true. If the first parameter is false, the Closure will not be executed.

You may pass another Closure as the third parameter to the `when` method. This Closure will execute if the first parameter evaluates as false. To illustrate how this feature may be used, we will use it to configure the default sorting of a query:

```php
$sortBy = null;

$feeds = Feed::when($sortBy, function ($query, $sortBy) {
                    return $query->orderBy($sortBy);
                }, function ($query) {
                    return $query->orderBy('created_at');
                })
                ->get();
```

## Inserts ​

The query builder also provides an `insert` method for inserting records into the database table. The `insert` method accepts an array of column names and values:

```php
Feed::insert(
    ['user_id' => 1, 'status' => 'published', 'title' => 'My Post', 'message' => 'Content here']
);
```

You may even insert several records into the table with a single call to `insert` by passing an array of arrays. Each array represents a row to be inserted into the table:

```php
Feed::insert([
    ['user_id' => 1, 'status' => 'published', 'title' => 'Post 1', 'message' => 'Content 1'],
    ['user_id' => 2, 'status' => 'published', 'title' => 'Post 2', 'message' => 'Content 2']
]);
```

### Auto-Incrementing IDs ​

If the table has an auto-incrementing id, use the `insertGetId` method to insert a record and then retrieve the ID:

```php
$id = Feed::insertGetId(
    ['user_id' => 1, 'status' => 'published', 'title' => 'My Post', 'message' => 'Content here']
);
```

## Updates ​

Of course, in addition to inserting records into the database, the query builder can also update existing records using the `update` method. The `update` method, like the `insert` method, accepts an array of column and value pairs containing the columns to be updated. You may constrain the update query using where clauses:

```php
Feed::where('id', 1)
            ->update(['status' => 'published']);
```

### Increment & Decrement ​

The query builder also provides convenient methods for incrementing or decrementing the value of a given column. This is useful for updating reaction counts or comment counts.

Both of these methods accept at least one argument: the column to modify. A second argument may optionally be passed to control the amount by which the column should be incremented or decremented:

```php
// Increment reactions when user reacts
Feed::increment('reactions_count', 1);

// Decrement comments when comment is deleted
Feed::decrement('comments_count');
```

You may also specify additional columns to update during the operation:

```php
Feed::decrement('comments_count', 1, ['updated_at' => current_time('mysql')]);
```

## Deletes ​

The query builder may also be used to delete records from the table via the `delete` method. You may constrain delete statements by adding where clauses before calling the `delete` method:

```php
Feed::delete();

Feed::where('status', 'draft')->delete();
```

If you wish to truncate the entire table, which will remove all rows and reset the auto-incrementing ID to zero, you may use the `truncate` method:

```php
Feed::truncate();
```

## Fluent Community-Specific Query Examples ​

### Feed Queries ​

```php
// Get all published feeds with engagement data
$feeds = Feed::where('status', 'published')
    ->withCount(['comments', 'reactions'])
    ->orderBy('created_at', 'desc')
    ->get();

// Get feeds from specific space
$spaceFeeds = Feed::where('space_id', 5)
    ->where('status', 'published')
    ->with(['user', 'xprofile', 'space'])
    ->latest()
    ->paginate(20);

// Get trending feeds (high engagement)
$trendingFeeds = Feed::where('status', 'published')
    ->where('created_at', '>=', now()->subDays(7))
    ->orderByRaw('(reactions_count + comments_count * 2) DESC')
    ->limit(10)
    ->get();
```

### Comment Queries ​

```php
// Get all comments for a feed
$comments = Comment::where('post_id', 123)
    ->whereNull('parent_id')
    ->with(['user', 'xprofile', 'reactions'])
    ->orderBy('created_at', 'asc')
    ->get();

// Get comment count by user
global $wpdb;

$commentStats = Comment::select('user_id', $wpdb->prepare('COUNT(*) as comment_count'))
    ->where('status', 'published')
    ->groupBy('user_id')
    ->having('comment_count', '>', 10)
    ->get();
```

### Space Queries ​

```php
// Get public spaces with member count
$spaces = Space::where('privacy', 'public')
    ->where('status', 'active')
    ->withCount('members')
    ->orderBy('members_count', 'desc')
    ->get();

// Get spaces user is member of
$userSpaces = Space::whereHas('members', function($query) use ($userId) {
        $query->where('user_id', $userId)
              ->where('status', 'active');
    })
    ->with('xprofiles')
    ->get();
```

### User & Profile Queries ​

```php
// Get active users with their profiles
$users = User::whereHas('xprofile', function($query) {
        $query->where('status', 'active');
    })
    ->with('xprofile')
    ->orderBy('display_name', 'asc')
    ->get();

// Get top contributors
$topContributors = XProfile::withCount(['posts', 'comments'])
    ->where('status', 'active')
    ->orderByRaw('(posts_count + comments_count) DESC')
    ->limit(10)
    ->get();
```

### Reaction Queries ​

```php
// Get all reactions for a feed
$reactions = Reaction::where('object_type', 'feed')
    ->where('object_id', 123)
    ->with(['user', 'xprofile'])
    ->get();

// Get reaction statistics
global $wpdb;

$reactionStats = Reaction::select('type', $wpdb->prepare('COUNT(*) as count'))
    ->where('object_type', 'feed')
    ->where('object_id', 123)
    ->groupBy('type')
    ->get();
```

### Notification Queries ​

```php
// Get unread notifications for user
$notifications = Notification::whereHas('subscribers', function($query) use ($userId) {
        $query->where('user_id', $userId)
              ->where('is_read', 0);
    })
    ->with(['feed', 'srcUser'])
    ->orderBy('created_at', 'desc')
    ->limit(20)
    ->get();

// Mark notifications as read
Notification::whereHas('subscribers', function($query) use ($userId) {
        $query->where('user_id', $userId);
    })
    ->update(['is_read' => 1]);
```

### Activity Queries ​

```php
// Get recent activities for a space
$activities = Activity::where('space_id', 5)
    ->where('created_at', '>=', now()->subDays(30))
    ->with(['user', 'xprofile', 'feed'])
    ->orderBy('created_at', 'desc')
    ->get();

// Get user activity summary
global $wpdb;

$activitySummary = Activity::select('action_name', $wpdb->prepare('COUNT(*) as count'))
    ->where('user_id', 1)
    ->groupBy('action_name')
    ->get();
```

### Term (Topic) Queries ​

```php
// Get all topics with post count
$topics = Term::where('taxonomy_name', 'post_topic')
    ->withCount('posts')
    ->orderBy('posts_count', 'desc')
    ->get();

// Get feeds by topic
$topicFeeds = Feed::whereHas('terms', function($query) use ($topicSlug) {
        $query->where('slug', $topicSlug);
    })
    ->where('status', 'published')
    ->with(['user', 'space'])
    ->latest()
    ->get();
```

### Media Queries ​

```php
// Get all media for a feed
$media = Media::where('feed_id', 123)
    ->where('is_active', 1)
    ->orderBy('created_at', 'asc')
    ->get();

// Get user's uploaded media
$userMedia = Media::where('user_id', 1)
    ->where('is_active', 1)
    ->orderBy('created_at', 'desc')
    ->paginate(20);
```

### Pro Feature Queries ​

```php
// Get user's followers (Pro)
use FluentCommunity\App\Models\Follow;

$followers = Follow::where('followed_id', $userId)
    ->with(['follower'])
    ->get();

// Get users that current user follows (Pro)
$following = Follow::where('follower_id', $userId)
    ->with(['followed'])
    ->get();

// Get moderation reports (Pro)
use FluentCommunity\App\Models\Moderation;

$reports = Moderation::where('status', 'pending')
    ->with(['reporter', 'feed', 'comment'])
    ->orderBy('created_at', 'desc')
    ->get();
```

### Complex Community Queries ​

```php
// Get user engagement statistics
global $wpdb;

$userStats = User::leftJoin($wpdb->prefix . 'fcom_posts', 'users.ID', '=', 'fcom_posts.user_id')
    ->leftJoin($wpdb->prefix . 'fcom_post_comments', 'users.ID', '=', 'fcom_post_comments.user_id')
    ->select([
        'users.ID',
        'users.display_name',
        $wpdb->prepare('COUNT(DISTINCT fcom_posts.id) as post_count'),
        $wpdb->prepare('COUNT(DISTINCT fcom_post_comments.id) as comment_count'),
        $wpdb->prepare('SUM(fcom_posts.reactions_count) as total_reactions')
    ])
    ->where('fcom_posts.status', 'published')
    ->groupBy('users.ID', 'users.display_name')
    ->having('post_count', '>', 0)
    ->get();

// Get space activity report
$spaceActivity = Space::leftJoin($wpdb->prefix . 'fcom_posts', 'fcom_spaces.id', '=', 'fcom_posts.space_id')
    ->select([
        'fcom_spaces.id',
        'fcom_spaces.title',
        $wpdb->prepare('COUNT(fcom_posts.id) as post_count'),
        $wpdb->prepare('SUM(fcom_posts.comments_count) as total_comments'),
        $wpdb->prepare('SUM(fcom_posts.reactions_count) as total_reactions')
    ])
    ->where('fcom_posts.status', 'published')
    ->where('fcom_posts.created_at', '>=', now()->subMonth())
    ->groupBy('fcom_spaces.id', 'fcom_spaces.title')
    ->orderBy('post_count', 'desc')
    ->get();
```

## Next Steps ​

- Learn about [Model Relationships](./relationships.md) for working with related data
- Explore [Database Schema](./schema.md) for table structures
- Check [Database Models](./models.md) for model details

```
global $wpdb;

Feed::join($wpdb->prefix . 'fcom_spaces', function ($join) {
            $join->on('fcom_posts.space_id', '=', 'fcom_spaces.id')
                 ->where('fcom_spaces.privacy', '=', 'public');
        })
        ->get();
```

## Unions ​

The query builder also provides a quick way to "union" two or more queries together. For example, you may create an initial query and use the `union` method to union it with a second query:

```php
$published = Feed::whereNull('deleted_at')
            ->where('status', 'published');

$feeds = Feed::whereNull('deleted_at')
            ->where('status', 'scheduled')
            ->union($published)
            ->get();
```

The `unionAll` method may also be used and has the same method signature as `union`. The difference between `union` and `unionAll` is that `unionAll` will not remove duplicate entries from your resultset.

## Where Clauses ​

### Simple Where Clauses ​

You may use the `where` method on a query builder instance to add where clauses to the query. The most basic call to `where` requires three arguments. The first argument is the name of the column. The second argument is an operator, which can be any of the database's supported operators. Finally, the third argument is the value to evaluate against the column.

For example, here is a query that verifies the value of a "status" column equals "published":

```php
$feeds = Feed::where('status', '=', 'published')->get();
```

For convenience, if you want to verify that a column is equal to a given value, you may pass the value directly as the second argument to the `where` method:

```php
$feeds = Feed::where('status', 'published')->get();
```

Of course, you may use a variety of other operators when writing a where clause:

```php
$feeds = Feed::where('reactions_count', '>', 100)->get();

$feeds = Feed::where('reactions_count', '>=', 100)->get();

$feeds = Feed::where('reactions_count', '<', 100)->get();

$feeds = Feed::where('reactions_count', '<=', 100)->get();

$feeds = Feed::where('status', '!=', 'draft')->get();

$feeds = Feed::where('status', '<>', 'draft')->get();
```

### Or Statements ​

You may chain where constraints together as well as add or clauses to the query. The `orWhere` method accepts the same arguments as the `where` method:

```php
$feeds = Feed::where('status', 'published')
                    ->orWhere('status', 'scheduled')
                    ->get();
```


