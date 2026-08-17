<?php
/**
 * Removes every sandbox row the capture harness creates.
 * Run with: wp eval-file teardown.php
 */

use FluentCommunity\App\Models\BaseSpace;
use FluentCommunity\App\Models\Feed;
use FluentCommunity\App\Models\Comment;
use FluentCommunity\App\Models\Term;

add_filter('pre_wp_mail', '__return_true', 999);
wp_set_current_user(1);

$slugs = [
    'docs-sandbox-space',
    'docs-scratch-space',
    'docs-scratch-space-2',
    'docs-sandbox-course',
    'docs-scratch-course',
    'docs-scratch-course-copy',
    'docs-sandbox-group',
    'docs-sandbox-link',
];

$spaceIds = [];
foreach ($slugs as $slug) {
    $rows = BaseSpace::withoutGlobalScopes()->where('slug', 'like', $slug . '%')->get();
    foreach ($rows as $row) {
        $spaceIds[] = $row->id;
    }
}
$spaceIds = array_values(array_unique($spaceIds));

if ($spaceIds) {
    $feedIds = Feed::withoutGlobalScopes()->whereIn('space_id', $spaceIds)->pluck('id')->toArray();
    if ($feedIds) {
        Comment::withoutGlobalScopes()->whereIn('post_id', $feedIds)->delete();
        Feed::withoutGlobalScopes()->whereIn('id', $feedIds)->delete();
        Feed::withoutGlobalScopes()->whereIn('parent_id', $feedIds)->delete();
    }
    $db = \FluentCommunity\App\App::make('db');
    $db->table('fcom_space_user')->whereIn('space_id', $spaceIds)->delete();
    $db->table('fcom_posts')->whereIn('space_id', $spaceIds)->delete();
    BaseSpace::withoutGlobalScopes()->whereIn('id', $spaceIds)->delete();
    echo "removed " . count($spaceIds) . " sandbox spaces/courses/groups\n";
}

foreach (['docs-sandbox-topic', 'docs-scratch-topic'] as $slug) {
    Term::where('slug', $slug)->delete();
}

// Early capture runs sent createSpaceGroup a nested `group` payload while the
// controller reads flat fields, so it created untitled groups with a timestamp
// slug. Clean those up; a real group always has a title and a word slug.
$junkGroups = BaseSpace::withoutGlobalScopes()
    ->where('type', 'space_group')
    ->where(function ($q) {
        $q->whereNull('title')->orWhere('title', '');
    })
    ->get();
foreach ($junkGroups as $group) {
    if (preg_match('/^\d+$/', (string)$group->slug)) {
        $group->delete();
        echo "removed untitled space group {$group->id}\n";
    }
}

$db = \FluentCommunity\App\App::make('db');
$db->table('fcom_meta')
    ->where('object_type', 'invitation')
    ->where('value', 'like', '%@example.com%')
    ->delete();

echo "teardown complete\n";
