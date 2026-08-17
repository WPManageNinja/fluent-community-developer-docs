<?php
/**
 * Capture plan: builds a throwaway sandbox, walks every documented operation,
 * then tears the sandbox down. Included by capture.php.
 */

use FluentCommunity\App\Models\BaseSpace;
use FluentCommunity\App\Models\Feed;
use FluentCommunity\App\Models\Comment;
use FluentCommunity\App\Models\User;

function fc_first_crm_tag_id()
{
    if (!defined('FLUENTCRM')) {
        return 0;
    }
    $db = \FluentCommunity\App\App::make('db');
    $row = $db->table('fc_tags')->first();
    return $row ? (int)$row->id : 0;
}

// ---------------------------------------------------------------------------
// Sandbox users
// ---------------------------------------------------------------------------
$sandboxUsers = [
    'alex_rivera'  => ['Alex Rivera', 'alex.rivera@example.com'],
    'jordan_blake' => ['Jordan Blake', 'jordan.blake@example.com'],
    'sam_chen'     => ['Sam Chen', 'sam.chen@example.com'],
];

$n = 1;
foreach ($sandboxUsers as $login => $info) {
    list($name, $email) = $info;
    $user = get_user_by('login', $login);
    if (!$user) {
        $uid = wp_insert_user([
            'user_login'   => $login,
            'user_email'   => $email,
            'user_pass'    => wp_generate_password(24),
            'display_name' => $name,
            'first_name'   => explode(' ', $name)[0],
            'last_name'    => explode(' ', $name)[1],
            'role'         => 'subscriber',
        ]);
        if (is_wp_error($uid)) {
            fwrite(STDERR, "user create failed: " . $uid->get_error_message() . "\n");
            $n++;
            continue;
        }
        $user = get_user_by('ID', $uid);
    }
    $model = User::find($user->ID);
    $xprofile = $model ? $model->syncXProfile() : null;
    fc_set('user' . $n . '_id', $user->ID);
    fc_set('user' . $n . '_username', $xprofile ? $xprofile->username : $user->user_login);
    $n++;
}

$adminModel   = User::find(1);
$adminProfile = $adminModel ? $adminModel->syncXProfile() : null;
fc_set('admin_id', 1);
fc_set('admin_username', $adminProfile ? $adminProfile->username : 'admin');

// ---------------------------------------------------------------------------
// Sandbox creation (also captures the create responses)
// ---------------------------------------------------------------------------
$sandboxSpaceSettings = [
    'emoji'                => '',
    'shape_svg'            => '',
    'custom_lock_screen'   => 'no',
    'can_create_post'      => 'all',
    'layout_style'         => 'timeline',
    'hide_members_count'   => 'no',
    'restricted_post_only' => 'no',
    'document_library'     => 'yes',
    'document_access'      => 'everybody',
    'media_gallery'        => 'yes',
    'media_access'         => 'everybody',
];

$sg = fc_cap('spaces/create-space-group', 'POST', 'spaces/space_groups', [], [
    'title'       => 'Docs Sandbox Group',
    'slug'        => 'docs-sandbox-group',
    'description' => 'Temporary space group used to capture API documentation samples.',
    'settings'    => ['always_show_spaces' => 'yes'],
]);
$sgId = is_array($sg) ? (isset($sg['group']['id']) ? $sg['group']['id'] : (isset($sg['space_group']['id']) ? $sg['space_group']['id'] : null)) : null;
if (!$sgId) {
    $e = BaseSpace::withoutGlobalScopes()->where('slug', 'docs-sandbox-group')->first();
    $sgId = $e ? $e->id : null;
}
fc_set('space_group_id', $sgId);

$sp = fc_cap('spaces/create-space', 'POST', 'spaces', [], [
    'space' => [
        'title'       => 'Docs Sandbox Space',
        'slug'        => 'docs-sandbox-space',
        'privacy'     => 'public',
        'description' => 'Temporary space used to capture API documentation samples.',
        'parent_id'   => $sgId,
        'settings'    => $sandboxSpaceSettings,
    ],
]);
$spaceId = is_array($sp) && isset($sp['space']['id']) ? $sp['space']['id'] : null;
if (!$spaceId) {
    $e = BaseSpace::withoutGlobalScopes()->where('slug', 'docs-sandbox-space')->first();
    $spaceId = $e ? $e->id : null;
}
fc_set('space_id', $spaceId);
fc_set('space_slug', 'docs-sandbox-space');

// A second, disposable space for the delete samples.
$sp2 = fc_cap('spaces/_scratch-space', 'POST', 'spaces', [], [
    'space' => [
        'title'    => 'Docs Scratch Space',
        'slug'     => 'docs-scratch-space',
        'privacy'  => 'public',
        'settings' => $sandboxSpaceSettings,
    ],
], ['save' => false]);
$scratchSpaceId = is_array($sp2) && isset($sp2['space']['id']) ? $sp2['space']['id'] : null;
if (!$scratchSpaceId) {
    $e = BaseSpace::withoutGlobalScopes()->where('slug', 'docs-scratch-space')->first();
    $scratchSpaceId = $e ? $e->id : null;
}
fc_set('scratch_space_id', $scratchSpaceId);
fc_set('scratch_space_slug', 'docs-scratch-space');

$sp3 = fc_cap('spaces/_scratch-space-2', 'POST', 'spaces', [], [
    'space' => [
        'title'    => 'Docs Scratch Space Two',
        'slug'     => 'docs-scratch-space-2',
        'privacy'  => 'public',
        'settings' => $sandboxSpaceSettings,
    ],
], ['save' => false]);
$scratchSpace2Id = is_array($sp3) && isset($sp3['space']['id']) ? $sp3['space']['id'] : null;
if (!$scratchSpace2Id) {
    $e = BaseSpace::withoutGlobalScopes()->where('slug', 'docs-scratch-space-2')->first();
    $scratchSpace2Id = $e ? $e->id : null;
}
fc_set('scratch_space2_id', $scratchSpace2Id);

$sg2 = fc_cap('spaces/_scratch-group', 'POST', 'spaces/space_groups', [], [
    'title'       => 'Docs Scratch Group',
    'slug'        => 'docs-scratch-group',
    'description' => '',
], ['save' => false]);
$scratchGroupId = is_array($sg2) ? (isset($sg2['group']['id']) ? $sg2['group']['id'] : (isset($sg2['space_group']['id']) ? $sg2['space_group']['id'] : null)) : null;
if (!$scratchGroupId) {
    $e = BaseSpace::withoutGlobalScopes()->where('slug', 'docs-scratch-group')->first();
    $scratchGroupId = $e ? $e->id : null;
}
fc_set('scratch_group_id', $scratchGroupId);

// Members
fc_cap('members/add-space-member', 'POST', 'spaces/{{space_slug}}/members', [], [
    'user_id' => fc_ctx('user1_id'),
    'role'    => 'member',
]);
fc_cap('members/_add-member-2', 'POST', 'spaces/{{space_slug}}/members', [], [
    'user_id' => fc_ctx('user2_id'),
    'role'    => 'moderator',
], ['save' => false]);
fc_cap('members/_add-member-3', 'POST', 'spaces/{{space_slug}}/members', [], [
    'user_id' => fc_ctx('user3_id'),
    'role'    => 'member',
], ['save' => false]);

// Feeds
$feed = fc_cap('feeds/create-feed', 'POST', 'feeds', [], [
    'space'        => 'docs-sandbox-space',
    'message'      => "Welcome to the sandbox space!\n\nThis post exists so the API docs can show a realistic response payload.",
    'title'        => 'Sample announcement post',
    'content_type' => 'text',
    'topic_ids'    => [],
]);
$feedId = is_array($feed) && isset($feed['feed']['id']) ? $feed['feed']['id'] : null;
if (!$feedId && $spaceId) {
    $e = Feed::where('space_id', $spaceId)->orderBy('id', 'desc')->first();
    $feedId = $e ? $e->id : null;
}
fc_set('feed_id', $feedId);
if ($feedId) {
    $f = Feed::withoutGlobalScopes()->find($feedId);
    fc_set('feed_slug', $f ? $f->slug : null);
}

$feed2 = fc_cap('feeds/_scratch-feed', 'POST', 'feeds', [], [
    'space'        => 'docs-sandbox-space',
    'title'        => 'Scratch post',
    'message'      => 'Scratch post used for the delete sample.',
    'content_type' => 'text',
], ['save' => false]);
fc_set('scratch_feed_id', is_array($feed2) && isset($feed2['feed']['id']) ? $feed2['feed']['id'] : null);

$feed3 = fc_cap('feeds/_scratch-feed-2', 'POST', 'feeds', [], [
    'space'        => 'docs-sandbox-space',
    'title'        => 'Second scratch post',
    'message'      => 'Second scratch post for media-preview and moderation samples.',
    'content_type' => 'text',
], ['save' => false, 'as' => fc_ctx('user1_id')]);
fc_set('scratch_feed2_id', is_array($feed3) && isset($feed3['feed']['id']) ? $feed3['feed']['id'] : null);

$survey = fc_cap('feeds/_survey-feed', 'POST', 'feeds', [], [
    'space'        => 'docs-sandbox-space',
    'title'        => 'Feature poll',
    'message'      => 'Which feature should we build next?',
    'content_type' => 'survey',
    'survey'       => [
        'type'     => 'single_choice',
        'options'  => [
            ['slug' => 'better-search', 'label' => 'Better search'],
            ['slug' => 'dark-mode', 'label' => 'Dark mode'],
            ['slug' => 'mobile-app', 'label' => 'Mobile app'],
        ],
        'end_date' => '',
    ],
], ['save' => false]);
$surveyId = is_array($survey) && isset($survey['feed']['id']) ? $survey['feed']['id'] : null;
fc_set('survey_feed_id', $surveyId);
$surveySlug = null;
if (is_array($survey)) {
    $surveySlug = \FluentCommunity\Framework\Support\Arr::get($survey, 'feed.meta.survey_config.options.0.slug');
}
if (!$surveySlug && $surveyId) {
    $sf = Feed::withoutGlobalScopes()->find($surveyId);
    $opts = $sf ? \FluentCommunity\Framework\Support\Arr::get($sf->meta, 'survey_config.options', []) : [];
    $surveySlug = isset($opts[0]['slug']) ? $opts[0]['slug'] : null;
}
fc_set('survey_option_slug', $surveySlug);

// Scheduled post (for the scheduled-post endpoints)
$scheduled = fc_cap('feeds/_scheduled-feed', 'POST', 'feeds', [], [
    'space'        => 'docs-sandbox-space',
    'title'        => 'Upcoming announcement',
    'message'      => 'This announcement goes out next week.',
    'content_type' => 'text',
    'scheduled_at' => gmdate('Y-m-d H:i:s', time() + 7 * DAY_IN_SECONDS),
    'status'       => 'scheduled',
], ['save' => false]);
fc_set('scheduled_feed_id', is_array($scheduled) && isset($scheduled['feed']['id']) ? $scheduled['feed']['id'] : null);

// Comments
$comment = fc_cap('comments/create-comment', 'POST', 'feeds/{{feed_id}}/comments', [], [
    'comment' => 'Great to be here — looking forward to the discussions!',
]);
$commentId = is_array($comment) && isset($comment['comment']['id']) ? $comment['comment']['id'] : null;
if (!$commentId && $feedId) {
    $e = Comment::where('post_id', $feedId)->orderBy('id', 'desc')->first();
    $commentId = $e ? $e->id : null;
}
fc_set('comment_id', $commentId);

$c2 = fc_cap('comments/_scratch-comment', 'POST', 'feeds/{{feed_id}}/comments', [], [
    'comment' => 'Scratch comment used for the delete sample.',
], ['save' => false]);
fc_set('scratch_comment_id', is_array($c2) && isset($c2['comment']['id']) ? $c2['comment']['id'] : null);

$c3 = fc_cap('comments/_scratch-comment-2', 'POST', 'feeds/{{feed_id}}/comments', [], [
    'comment' => 'Another scratch comment, used for moderation report samples.',
], ['save' => false]);
fc_set('scratch_comment2_id', is_array($c3) && isset($c3['comment']['id']) ? $c3['comment']['id'] : null);

// Course
$course = fc_cap('courses/create-course', 'POST', 'admin/courses', [], [
    'title'       => 'Docs Sandbox Course',
    'slug'        => 'docs-sandbox-course',
    'privacy'     => 'public',
    'description' => 'Temporary course used to capture API documentation samples.',
    'course_type' => 'self_paced',
    'status'      => 'published',
    'settings'    => [
        'emoji'          => '',
        'shape_svg'      => '',
        'course_layout'  => 'classic',
        'course_details' => '',
    ],
]);
$courseId = is_array($course) && isset($course['course']['id']) ? $course['course']['id'] : null;
if (!$courseId) {
    $e = BaseSpace::withoutGlobalScopes()->where('slug', 'docs-sandbox-course')->first();
    $courseId = $e ? $e->id : null;
}
fc_set('course_id', $courseId);
fc_set('course_slug', 'docs-sandbox-course');

$course2 = fc_cap('courses/_scratch-course', 'POST', 'admin/courses', [], [
    'title'       => 'Docs Scratch Course',
    'slug'        => 'docs-scratch-course',
    'privacy'     => 'public',
    'description' => 'Second sandbox course used for duplicate and delete samples.',
    'course_type' => 'self_paced',
    'status'      => 'published',
], ['save' => false]);
$scratchCourseId = is_array($course2) && isset($course2['course']['id']) ? $course2['course']['id'] : null;
if (!$scratchCourseId) {
    $e = BaseSpace::withoutGlobalScopes()->where('slug', 'docs-scratch-course')->first();
    $scratchCourseId = $e ? $e->id : null;
}
fc_set('scratch_course_id', $scratchCourseId);

// Sections
$section = fc_cap('courses/create-course-section', 'POST', 'admin/courses/{{course_id}}/sections', [], [
    'title' => 'Getting Started',
]);
$sectionId = is_array($section) && isset($section['section']['id']) ? $section['section']['id'] : null;
fc_set('section_id', $sectionId);

$section2 = fc_cap('courses/_scratch-section', 'POST', 'admin/courses/{{course_id}}/sections', [], [
    'title' => 'Scratch Section',
], ['save' => false]);
fc_set('scratch_section_id', is_array($section2) && isset($section2['section']['id']) ? $section2['section']['id'] : null);

$section3 = fc_cap('courses/_scratch-section-2', 'POST', 'admin/courses/{{course_id}}/sections', [], [
    'title' => 'Advanced Topics',
], ['save' => false]);
fc_set('scratch_section2_id', is_array($section3) && isset($section3['section']['id']) ? $section3['section']['id'] : null);

// Lessons
$lesson = fc_cap('courses/create-course-lesson', 'POST', 'admin/courses/{{course_id}}/lessons', [], [
    'title'      => 'Welcome to the course',
    'section_id' => $sectionId,
]);
$lessonId = is_array($lesson) && isset($lesson['lesson']['id']) ? $lesson['lesson']['id'] : null;
fc_set('lesson_id', $lessonId);

// Publish it so the learner-facing lesson endpoints return data.
if ($lessonId) {
    fc_cap('courses/update-course-lesson', 'PUT', 'admin/courses/{{course_id}}/lessons/{{lesson_id}}', [], [
        'lesson' => [
            'title'     => 'Welcome to the course',
            'parent_id' => $sectionId,
            'status'    => 'published',
            'message'   => "This is the first lesson.\n\nIt shows the lesson payload shape returned by the API.",
        ],
    ]);
    $l = Feed::withoutGlobalScopes()->find($lessonId);
    fc_set('lesson_slug', $l ? $l->slug : null);
}

$lesson2 = fc_cap('courses/_scratch-lesson', 'POST', 'admin/courses/{{course_id}}/lessons', [], [
    'title'      => 'Scratch Lesson',
    'section_id' => $sectionId,
], ['save' => false]);
fc_set('scratch_lesson_id', is_array($lesson2) && isset($lesson2['lesson']['id']) ? $lesson2['lesson']['id'] : null);

$lesson3 = fc_cap('courses/_scratch-lesson-2', 'POST', 'admin/courses/{{course_id}}/lessons', [], [
    'title'      => 'Movable Lesson',
    'section_id' => $sectionId,
], ['save' => false]);
fc_set('scratch_lesson2_id', is_array($lesson3) && isset($lesson3['lesson']['id']) ? $lesson3['lesson']['id'] : null);

// Students
fc_cap('courses/add-course-student', 'POST', 'admin/courses/{{course_id}}/students', [], [
    'user_id' => fc_ctx('user1_id'),
]);
fc_cap('courses/_add-student-2', 'POST', 'admin/courses/{{course_id}}/students', [], [
    'user_id' => fc_ctx('user2_id'),
], ['save' => false]);

// Topic
$topics = fc_cap('admin/save-topics', 'POST', 'admin/topics', [], [
    'title'       => 'Docs Sandbox Topic',
    'slug'        => 'docs-sandbox-topic',
    'description' => 'Temporary topic for documentation samples.',
    'admin_only'  => 'no',
    'space_ids'   => array_values(array_filter([$spaceId])),
]);
$topicId = null;
if (is_array($topics)) {
    if (isset($topics['topic']['id'])) {
        $topicId = $topics['topic']['id'];
    } elseif (!empty($topics['topics'])) {
        foreach ($topics['topics'] as $t) {
            if (isset($t['slug']) && $t['slug'] === 'docs-sandbox-topic') {
                $topicId = $t['id'];
            }
        }
    }
}
if (!$topicId) {
    $t = \FluentCommunity\App\Models\Term::where('slug', 'docs-sandbox-topic')->first();
    $topicId = $t ? $t->id : null;
}
fc_set('topic_id', $topicId);

$topics2 = fc_cap('admin/_scratch-topic', 'POST', 'admin/topics', [], [
    'title' => 'Docs Scratch Topic',
    'slug'  => 'docs-scratch-topic',
], ['save' => false]);
$t2 = \FluentCommunity\App\Models\Term::where('slug', 'docs-scratch-topic')->first();
fc_set('scratch_topic_id', $t2 ? $t2->id : null);

// ---------------------------------------------------------------------------
// GET captures
// ---------------------------------------------------------------------------

// options
fc_cap('options/get-app-vars', 'GET', 'options/app-vars');
fc_cap('options/get-menu-items', 'GET', 'options/menu-items');
fc_cap('options/get-sidebar-menu-html', 'GET', 'options/sidebar-menu-html');

// activity
fc_cap('activity/list-activities', 'GET', 'activities', ['per_page' => 5, 'page' => 1]);

// spaces
fc_cap('spaces/list-spaces', 'GET', 'spaces');
fc_cap('spaces/list-all-spaces', 'GET', 'spaces/all-spaces');
fc_cap('spaces/discover-spaces', 'GET', 'spaces/discover', ['type' => 'all', 'sort_by' => 'popular']);
fc_cap('spaces/list-space-groups', 'GET', 'spaces/space_groups');
fc_cap('spaces/search-space-users', 'GET', 'spaces/users/search', ['space_id' => '{{space_id}}', 'search' => 'a']);
fc_cap('spaces/get-space-by-slug', 'GET', 'spaces/{{space_slug}}/by-slug');
fc_cap('spaces/get-space-lockscreens', 'GET', 'spaces/{{space_slug}}/lockscreens');
fc_cap('spaces/get-space-meta-settings', 'GET', 'spaces/{{space_slug}}/meta-settings');

// feeds
fc_cap('feeds/list-feeds', 'GET', 'feeds', ['space' => '{{space_slug}}', 'per_page' => 3, 'page' => 1]);
fc_cap('feeds/list-bookmarks', 'GET', 'feeds/bookmarks', ['per_page' => 3]);
fc_cap('feeds/get-feed-links', 'GET', 'feeds/links', ['scope' => 'global']);
fc_cap('feeds/get-feed-ticker', 'GET', 'feeds/ticker');
fc_cap('feeds/get-ticker-updates', 'GET', 'feeds/ticker-updates', ['context' => 'feeds']);
fc_cap('feeds/get-welcome-banner', 'GET', 'feeds/welcome-banner');
fc_cap('feeds/get-feed-by-id', 'GET', 'feeds/{{feed_id}}/by-id');
fc_cap('feeds/get-feed-by-slug', 'GET', 'feeds/{{feed_slug}}/by-slug');
fc_cap('feeds/list-scheduled-posts', 'GET', 'scheduled-posts');
fc_cap('feeds/get-oembed', 'GET', 'feeds/oembed', ['url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ']);

// comments
fc_cap('comments/list-feed-comments', 'GET', 'feeds/{{feed_id}}/comments');
fc_cap('comments/get-comment', 'GET', 'comments/{{comment_id}}');
fc_cap('comments/get-comments', 'GET', 'profile/{{admin_username}}/comments');
fc_cap('comments/get-course-comments', 'GET', 'admin/courses/{{course_id}}/comments');

// reactions
fc_cap('reactions/list-feed-reactions', 'GET', 'feeds/{{feed_id}}/reactions');
fc_cap('reactions/list-comment-reactions', 'GET', 'comments/{{comment_id}}/reactions');

// members
fc_cap('members/list-members', 'GET', 'members', ['per_page' => 5]);
fc_cap('members/list-space-members', 'GET', 'spaces/{{space_slug}}/members');

// notifications
fc_cap('notifications/list-notifications', 'GET', 'notifications');
fc_cap('notifications/list-unread-notifications', 'GET', 'notifications/unread');

// profile
fc_cap('profile/get-profile', 'GET', 'profile/{{admin_username}}');
fc_cap('profile/list-profile-spaces', 'GET', 'profile/{{admin_username}}/spaces');
fc_cap('profile/get-courses', 'GET', 'profile/{{admin_username}}/courses');
fc_cap('profile/list-profile-memberships', 'GET', 'profile/{{admin_username}}/memberships');
fc_cap('profile/get-notification-preferences', 'GET', 'profile/{{admin_username}}/notification-preferences');
fc_cap('profile/list-profile-followers', 'GET', 'profile/{{admin_username}}/followers');
fc_cap('profile/list-profile-followings', 'GET', 'profile/{{admin_username}}/followings');
fc_cap('profile/list-profile-blocked-users', 'GET', 'profile/{{admin_username}}/blocked-users');

// courses
fc_cap('courses/list-courses', 'GET', 'courses');
fc_cap('courses/list-all-courses', 'GET', 'courses/all-courses');
fc_cap('courses/list-admin-courses', 'GET', 'admin/courses');
fc_cap('courses/get-admin-course', 'GET', 'admin/courses/{{course_id}}');
fc_cap('courses/get-course', 'GET', 'courses/{{course_id}}');
fc_cap('courses/get-course-by-slug', 'GET', 'courses/{{course_slug}}/by-slug');
fc_cap('courses/get-lesson-by-slug', 'GET', 'courses/{{course_slug}}/lessons/{{lesson_slug}}/by-slug');
fc_cap('courses/list-course-sections', 'GET', 'admin/courses/{{course_id}}/sections');
fc_cap('courses/get-course-section', 'GET', 'admin/courses/{{course_id}}/sections/{{section_id}}');
fc_cap('courses/list-course-lessons', 'GET', 'admin/courses/{{course_id}}/lessons');
fc_cap('courses/get-course-lesson', 'GET', 'admin/courses/{{course_id}}/lessons/{{lesson_id}}');
fc_cap('courses/list-course-students', 'GET', 'admin/courses/{{course_id}}/students');
fc_cap('courses/search-course-users', 'GET', 'admin/courses/{{course_id}}/users/search', ['search' => 'a']);
fc_cap('courses/search-course-instructors', 'GET', 'admin/courses/{{course_id}}/instructors/search', ['search' => 'a']);
fc_cap('courses/get-course-meta-settings', 'GET', 'admin/courses/{{course_id}}/meta-settings');
fc_cap('courses/get-course-welcome-banner-settings', 'GET', 'admin/courses/{{course_id}}/welcome-banner');
fc_cap('courses/get-exportable-students', 'GET', 'admin/courses/{{course_id}}/export/students');

// admin
fc_cap('admin/get-general-settings', 'GET', 'admin/general');
fc_cap('admin/get-email-settings', 'GET', 'admin/email-settings');
fc_cap('admin/get-storage-settings', 'GET', 'admin/storage-settings');
fc_cap('admin/get-admin-welcome-banner', 'GET', 'admin/welcome-banner');
fc_cap('admin/get-auth-settings', 'GET', 'admin/auth-settings');
fc_cap('admin/get-onboarding-settings', 'GET', 'admin/on-boardings');
fc_cap('admin/get-profile-link-providers', 'GET', 'admin/profile-link-providers');
fc_cap('admin/list-all-space-courses', 'GET', 'admin/all_space_courses');
fc_cap('admin/get-custom-profile-fields', 'GET', 'admin/custom-profile-fields');
fc_cap('admin/get-messaging-settings', 'GET', 'admin/messaging-setting');
fc_cap('admin/get-settings', 'GET', 'admin/pwa-settings');
fc_cap('admin/list-topics', 'GET', 'admin/topics');
fc_cap('admin/list-user-badges', 'GET', 'admin/user-badges');
fc_cap('admin/search-admin-users', 'GET', 'admin/users', ['search' => 'a']);
fc_cap('admin/list-webhooks', 'GET', 'admin/webhooks', ['page' => 1]);
fc_cap('admin/list-admin-managers', 'GET', 'admin/managers');
fc_cap('admin/get-license-status', 'GET', 'admin/license');

// settings
fc_cap('settings/get-feature-settings', 'GET', 'settings/features');
fc_cap('settings/get-menu-settings', 'GET', 'settings/menu-settings');
fc_cap('settings/get-customization-settings', 'GET', 'settings/customization-settings');
fc_cap('settings/get-privacy-settings', 'GET', 'settings/privacy-settings');
fc_cap('settings/get-color-config', 'GET', 'settings/color-config');
fc_cap('settings/get-crm-tagging-config', 'GET', 'settings/crm-tagging-config');
fc_cap('settings/get-fluent-player-settings', 'GET', 'settings/fluent-player-settings');
fc_cap('settings/get-followers-settings', 'GET', 'settings/followers/config');
fc_cap('settings/get-snippets-settings', 'GET', 'settings/snippets-settings');

// reports / analytics
fc_cap('reports/get-overview-widget-report', 'GET', 'analytics/overview/widget');
fc_cap('reports/get-overview-activity-report', 'GET', 'analytics/overview/activity');
fc_cap('reports/get-popular-day-time-report', 'GET', 'analytics/overview/popular-day-time');
fc_cap('reports/get-member-widget-report', 'GET', 'analytics/members/widget');
fc_cap('reports/get-member-activity-report', 'GET', 'analytics/members/activity');
fc_cap('reports/list-top-members-report', 'GET', 'analytics/members/top-members');
fc_cap('reports/list-top-commenters-report', 'GET', 'analytics/members/top-commenters');
fc_cap('reports/list-top-post-starters-report', 'GET', 'analytics/members/top-post-starters');
fc_cap('reports/get-space-widget-report', 'GET', 'analytics/spaces/widget', ['space_id' => '{{space_id}}']);
fc_cap('reports/get-space-activity-report', 'GET', 'analytics/spaces/activity', ['space_id' => '{{space_id}}']);
fc_cap('reports/list-popular-spaces-report', 'GET', 'analytics/spaces/popular');
fc_cap('reports/search-report-spaces', 'GET', 'analytics/spaces/search', ['search' => 'a']);

// invitations / leaderboard / documents / media (Pro)
fc_cap('leaderboard/list-leaderboard', 'GET', 'leaderboard');
fc_cap('leaderboard/get-leaderboard-levels', 'GET', 'admin/leaderboards/levels');
fc_cap('documents/list-documents', 'GET', 'documents', ['space_id' => '{{space_id}}']);
fc_cap('media/get-index', 'GET', 'media-gallery/{{space_slug}}', ['type' => 'photos', 'per_page' => 24]);

// ---------------------------------------------------------------------------
// Mutating captures on sandbox entities
// ---------------------------------------------------------------------------

// Reactions
fc_cap('reactions/toggle-feed-reaction', 'POST', 'feeds/{{feed_id}}/react', [], [
    'react_type' => 'like',
], ['as' => fc_ctx('user1_id')]);
fc_cap('reactions/post-add-or-remove-post-react', 'POST', 'feeds/{{feed_id}}/reactions/toggle', [], [
    'react_type' => 'like',
], ['as' => fc_ctx('user2_id')]);
fc_cap('reactions/toggle-comment-reaction', 'POST', 'feeds/{{feed_id}}/comments/{{comment_id}}/reactions', [], [
    'state' => true,
], ['as' => fc_ctx('user1_id')]);
fc_cap('reactions/cast-survey-vote', 'POST', 'feeds/{{survey_feed_id}}/apps/survey-vote', [], [
    'vote_indexes' => array_values(array_filter([fc_ctx('survey_option_slug')])),
], ['as' => fc_ctx('user1_id')]);
fc_cap('reactions/list-survey-voters', 'GET', 'feeds/{{survey_feed_id}}/apps/survey-voters/{{survey_option_slug}}');

// Feed mutations
fc_cap('feeds/update-feed', 'POST', 'feeds/{{feed_id}}', [], [
    'message'      => "Welcome to the sandbox space!\n\nEdited to show the update payload.",
    'title'        => 'Sample announcement post (updated)',
    'content_type' => 'text',
    'space'        => '{{space_slug}}',
]);
fc_cap('feeds/patch-feed', 'PATCH', 'feeds/{{feed_id}}', [], ['is_sticky' => 'yes']);
fc_cap('feeds/render-markdown-preview', 'POST', 'feeds/markdown-preview', [], [
    'text' => "## Heading\n\nSome **bold** text and a [link](https://fluentcommunity.co).",
]);
fc_cap('feeds/batch-fetch-feeds', 'POST', 'feeds/batch', [], ['feed_ids' => array_values(array_filter([fc_ctx('feed_id'), fc_ctx('scratch_feed_id')]))]);
fc_cap('feeds/update-feed-links', 'POST', 'feeds/links', [], [
    'scope' => 'global',
    'links' => [
        ['title' => 'Community handbook', 'url' => 'https://example.com/handbook', 'is_new_tab' => 'yes'],
    ],
]);
fc_cap('feeds/reschedule-post', 'PUT', 'scheduled-posts/{{scheduled_feed_id}}', [], [
    'scheduled_at' => gmdate('Y-m-d H:i:s', time() + 14 * DAY_IN_SECONDS),
]);
fc_cap('feeds/publish-scheduled-post', 'POST', 'scheduled-posts/publish/{{scheduled_feed_id}}');
fc_cap('media/delete-media-preview', 'DELETE', 'feeds/{{scratch_feed2_id}}/media-preview');

// Comment mutations
fc_cap('comments/update-comment', 'POST', 'feeds/{{feed_id}}/comments/{{comment_id}}', [], [
    'comment' => 'Great to be here — edited to show the update payload.',
]);
fc_cap('comments/patch-comment', 'PATCH', 'feeds/{{feed_id}}/comments/{{comment_id}}', [], ['is_sticky' => 'yes']);

// Moderation
fc_cap('reports/create-moderation-report', 'POST', 'moderation/report', [], [
    'post_id'      => fc_ctx('scratch_feed2_id'),
    'content_type' => 'post',
    'reason'       => 'spam',
    'explanation'  => 'Sample moderation report created for the API docs.',
], ['as' => fc_ctx('user3_id')]);
fc_cap('reports/list-moderation-reports', 'GET', 'moderation/reports');

// Space mutations
fc_cap('spaces/update-space-by-slug', 'PUT', 'spaces/{{space_slug}}/by-slug', [], [
    'data' => [
        'title'       => 'Docs Sandbox Space',
        'privacy'     => 'public',
        'description' => 'Temporary space used to capture API documentation samples (updated).',
        'settings'    => $sandboxSpaceSettings,
    ],
]);
fc_cap('spaces/update-space-by-id', 'PUT', 'spaces/{{scratch_space2_id}}/by-id', [], [
    'data' => [
        'title'    => 'Docs Scratch Space Two',
        'privacy'  => 'private',
        'settings' => $sandboxSpaceSettings,
    ],
]);
fc_cap('spaces/update-space-links', 'POST', 'spaces/{{space_slug}}/links', [], [
    'links' => [
        ['title' => 'Space guidelines', 'url' => 'https://example.com/guidelines', 'is_new_tab' => 'yes'],
    ],
]);
$spaceLockscreen = fc_cap('spaces/_lockscreen-read', 'GET', 'spaces/{{space_slug}}/lockscreens', [], [], ['save' => false]);
$spaceLockFields = is_array($spaceLockscreen) && isset($spaceLockscreen['lockscreen'])
    ? $spaceLockscreen['lockscreen']
    : [];
if ($spaceLockFields) {
    $spaceLockFields[0]['heading'] = 'Members only';
    $spaceLockFields[0]['description'] = 'Join this space to see the discussions.';
    $spaceLockFields[0]['button_text'] = 'Join now';
}
fc_cap('spaces/update-space-lockscreen-settings', 'PUT', 'spaces/{{space_slug}}/lockscreens', [], [
    'lockscreen' => $spaceLockFields,
]);
fc_cap('spaces/update-space-group', 'PUT', 'spaces/space_groups/{{space_group_id}}', [], [
    'title'       => 'Docs Sandbox Group',
    'description' => 'Temporary space group (updated).',
    'settings'    => ['always_show_spaces' => 'yes'],
]);
fc_cap('spaces/move-space', 'PATCH', 'spaces/space_groups/move-space', [], [
    'space_id' => fc_ctx('scratch_space_id'),
    'group_id' => fc_ctx('space_group_id'),
]);
$groupIndexes = [];
foreach (array_values(array_filter([fc_ctx('space_group_id'), fc_ctx('scratch_group_id')])) as $position => $groupId) {
    $groupIndexes[(string)$groupId] = $position;
}
fc_cap('spaces/reindex-space-groups', 'PATCH', 'spaces/space_groups/re-index', [], [
    'indexes' => $groupIndexes,
]);
fc_cap('spaces/reindex-spaces', 'PATCH', 'spaces/space_groups/re-index-spaces', [], [
    'indexes' => array_values(array_filter([fc_ctx('space_id'), fc_ctx('scratch_space_id')])),
]);
fc_cap('spaces/join-space', 'POST', 'spaces/{{scratch_space_slug}}/join', [], [], ['as' => fc_ctx('user3_id')]);
fc_cap('spaces/leave-space', 'POST', 'spaces/{{scratch_space_slug}}/leave', [], [], ['as' => fc_ctx('user3_id')]);

// Members mutations
fc_cap('members/update-member', 'PATCH', 'members/{{user1_id}}', [], ['status' => 'active']);
fc_cap('members/post-bulk-add-members', 'POST', 'spaces/{{scratch_space_slug}}/members/bulk-add', [], [
    'user_ids' => array_values(array_filter([fc_ctx('user1_id'), fc_ctx('user2_id')])),
    'role'     => 'member',
]);
fc_cap('members/post-bulk-import-members', 'POST', 'spaces/{{scratch_space_slug}}/members/bulk-import', [], [
    'emails' => "alex.rivera@example.com\njordan.blake@example.com",
    'role'   => 'member',
]);
fc_cap('members/post-resolve-crm-tag-space', 'POST', 'spaces/{{scratch_space_slug}}/members/resolve-crm-tag', [], [
    'tag_id'      => fc_first_crm_tag_id(),
    'per_page'    => 50,
    'offset'      => 0,
]);
fc_cap('members/remove-space-member', 'POST', 'spaces/{{scratch_space_slug}}/members/remove', [], [
    'user_id' => fc_ctx('user2_id'),
]);

// Profile mutations
fc_cap('profile/update-profile', 'POST', 'profile/{{user1_username}}', [], [
    'data' => [
        'first_name'        => 'Alex',
        'last_name'         => 'Rivera',
        'username'          => fc_ctx('user1_username'),
        'short_description' => 'Community builder and docs sample user.',
        'headline'          => 'Product Designer',
        'website'           => 'https://example.com',
        'social_links'      => [],
    ],
]);
fc_cap('profile/patch-profile', 'PUT', 'profile/{{user1_username}}', [], [
    'data' => [
        'first_name'        => 'Alex',
        'last_name'         => 'Rivera',
        'username'          => fc_ctx('user1_username'),
        'short_description' => 'Community builder. Patched via the API.',
    ],
]);
fc_cap('profile/save-notification-preferences', 'POST', 'profile/{{user1_username}}/notification-preferences', [], [
    'user_globals' => ['email_notification' => 'yes'],
    'space_prefs'  => [],
], ['as' => fc_ctx('user1_id')]);
fc_cap('profile/follow-profile-user', 'POST', 'profile/{{user2_username}}/follow', [], [], ['as' => fc_ctx('user1_id')]);
fc_cap('profile/toggle-profile-notification', 'POST', 'profile/{{user2_username}}/notification', [], [], ['as' => fc_ctx('user1_id')]);
fc_cap('profile/toggle-profile-follow', 'POST', 'profile/{{user3_id}}/toggle-follow', [], [], ['as' => fc_ctx('user1_id')]);
fc_cap('profile/unfollow-profile-user', 'POST', 'profile/{{user2_username}}/unfollow', [], [], ['as' => fc_ctx('user1_id')]);
fc_cap('profile/block-profile-user', 'POST', 'profile/{{user3_username}}/block', [], [], ['as' => fc_ctx('user1_id')]);
fc_cap('profile/unblock-profile-user', 'POST', 'profile/{{user3_username}}/unblock', [], [], ['as' => fc_ctx('user1_id')]);

// Notifications
fc_cap('notifications/mark-notifications-read-by-feed', 'POST', 'notifications/mark-read/{{feed_id}}/by-feed-id', [], [], ['as' => fc_ctx('user1_id')]);
fc_cap('notifications/mark-all-notifications-read', 'POST', 'notifications/mark-all-read', [], [], ['as' => fc_ctx('user1_id')]);

// Course mutations
fc_cap('courses/update-course', 'PUT', 'admin/courses/{{course_id}}', [], [
    'title'       => 'Docs Sandbox Course',
    'slug'        => 'docs-sandbox-course',
    'privacy'     => 'public',
    'status'      => 'published',
    'course_type' => 'self_paced',
    'description' => 'Temporary course used to capture API documentation samples (updated).',
]);
fc_cap('courses/update-course-section', 'PUT', 'admin/courses/{{course_id}}/sections/{{section_id}}', [], [
    'title'  => 'Getting Started (updated)',
    'status' => 'published',
]);
fc_cap('courses/patch-course-section', 'PATCH', 'admin/courses/{{course_id}}/sections/{{section_id}}', [], ['status' => 'published']);
fc_cap('courses/patch-course-lesson', 'PATCH', 'admin/courses/{{course_id}}/lessons/{{lesson_id}}', [], ['status' => 'published']);
$sectionIndexes = [];
foreach (array_values(array_filter([fc_ctx('section_id'), fc_ctx('scratch_section2_id')])) as $position => $sectionId) {
    $sectionIndexes[(string)$sectionId] = $position + 1;
}
fc_cap('courses/reindex-course-sections', 'PATCH', 'admin/courses/{{course_id}}/sections/indexes', [], [
    'indexes' => $sectionIndexes,
]);
$lessonIndexes = [];
foreach (array_values(array_filter([fc_ctx('lesson_id'), fc_ctx('scratch_lesson2_id')])) as $position => $lessonId) {
    $lessonIndexes[(string)$lessonId] = $position + 1;
}
fc_cap('courses/reindex-course-lessons', 'PATCH', 'admin/courses/{{course_id}}/sections/{{section_id}}/indexes', [], [
    'indexes' => $lessonIndexes,
]);
fc_cap('courses/move-course-lesson', 'PUT', 'admin/courses/{{course_id}}/move-lesson', [], [
    'lesson_id'  => fc_ctx('scratch_lesson2_id'),
    'section_id' => fc_ctx('scratch_section2_id'),
]);
fc_cap('courses/copy-course-section', 'PUT', 'admin/courses/{{scratch_course_id}}/copy-section', [], [
    'section_id'     => fc_ctx('section_id'),
    'from_course_id' => fc_ctx('course_id'),
]);
fc_cap('courses/post-duplicate-lesson', 'POST', 'admin/courses/{{course_id}}/lessons/{{scratch_lesson_id}}/duplicate');
fc_cap('courses/duplicate-course', 'POST', 'admin/courses/{{scratch_course_id}}/duplicate');
fc_cap('courses/update-course-links', 'POST', 'admin/courses/{{course_id}}/links', [], [
    'links' => [['title' => 'Course syllabus', 'url' => 'https://example.com/syllabus', 'is_new_tab' => 'yes']],
]);
$courseLockscreen = fc_cap('courses/_lockscreen-read', 'GET', 'spaces/{{space_slug}}/lockscreens', [], [], ['save' => false]);
$courseLockFields = is_array($courseLockscreen) && isset($courseLockscreen['lockscreen'])
    ? $courseLockscreen['lockscreen']
    : [];
if ($courseLockFields) {
    $courseLockFields[0]['heading'] = 'Enrol to continue';
    $courseLockFields[0]['description'] = 'This course is available to enrolled students.';
    $courseLockFields[0]['button_text'] = 'Enrol now';
}
fc_cap('courses/update-course-lockscreen-settings', 'PUT', 'admin/courses/{{course_id}}/lockscreens', [], [
    'lockscreen' => $courseLockFields,
]);
fc_cap('courses/post-update-course-welcome-banner-settings', 'POST', 'admin/courses/{{course_id}}/welcome-banner', [], [
    'settings' => [
        'enabled'     => 'yes',
        'title'       => 'Welcome to the course',
        'description' => 'Start with the first lesson.',
    ],
]);
fc_cap('courses/post-bulk-add-students', 'POST', 'admin/courses/{{scratch_course_id}}/students/bulk-add', [], [
    'user_ids' => array_values(array_filter([fc_ctx('user1_id'), fc_ctx('user2_id')])),
]);
fc_cap('courses/post-bulk-import-students', 'POST', 'admin/courses/{{scratch_course_id}}/students/bulk-import', [], [
    'emails' => "alex.rivera@example.com\njordan.blake@example.com",
]);
fc_cap('courses/post-resolve-crm-tag-course', 'POST', 'admin/courses/{{course_id}}/students/resolve-crm-tag', [], [
    'tag_id'   => fc_first_crm_tag_id(),
    'per_page' => 50,
    'offset'   => 0,
]);
fc_cap('courses/enroll-course', 'POST', 'courses/{{course_id}}/enroll', [], [], ['as' => fc_ctx('user3_id')]);
fc_cap('courses/update-lesson-completion', 'PUT', 'courses/{{course_id}}/lessons/{{lesson_id}}/completion', [], ['state' => 'completed'], ['as' => fc_ctx('user3_id')]);
fc_cap('courses/post-mark-lesson-video-watched', 'POST', 'courses/{{course_id}}/lessons/{{lesson_id}}/video-watched', [], [], ['as' => fc_ctx('user3_id')]);
fc_cap('courses/get-lesson-quiz-result', 'GET', 'courses/{{course_id}}/lessons/{{lesson_id}}/quiz/result', [], [], ['as' => fc_ctx('user3_id')]);

// ---------------------------------------------------------------------------
// Quiz flow (Pro): create a quiz lesson, publish it with questions, enrol a
// student, submit an attempt, then read and moderate the result.
// ---------------------------------------------------------------------------
$quizLesson = fc_cap('courses/_quiz-lesson', 'POST', 'admin/courses/{{course_id}}/lessons', [], [
    'title'      => 'Module 1 Quiz',
    'section_id' => fc_ctx('section_id'),
    'type'       => 'quiz',
], ['save' => false]);
$quizLessonId = is_array($quizLesson) && isset($quizLesson['lesson']['id']) ? $quizLesson['lesson']['id'] : null;
fc_set('quiz_lesson_id', $quizLessonId);

if ($quizLessonId) {
    fc_cap('courses/_quiz-lesson-publish', 'PUT', 'admin/courses/{{course_id}}/lessons/{{quiz_lesson_id}}', [], [
        'lesson' => [
            'title'     => 'Module 1 Quiz',
            'parent_id' => fc_ctx('section_id'),
            'status'    => 'published',
            'message'   => 'Answer all questions to complete this module.',
            'meta'      => [
                'enable_passing_score'  => 'yes',
                'passing_score'         => 60,
                'enforce_passing_score' => 'no',
                'hide_result'           => 'no',
                'quiz_questions'        => [
                    [
                        'slug'    => 'q1',
                        'type'    => 'single_choice',
                        'label'   => 'Which HTTP method creates a new feed post?',
                        'enabled' => true,
                        'options' => [
                            ['label' => 'GET', 'is_correct' => false],
                            ['label' => 'POST', 'is_correct' => true],
                            ['label' => 'DELETE', 'is_correct' => false],
                        ],
                    ],
                    [
                        'slug'    => 'q2',
                        'type'    => 'multiple_choice',
                        'label'   => 'Which of these are space privacy levels?',
                        'enabled' => true,
                        'options' => [
                            ['label' => 'public', 'is_correct' => true],
                            ['label' => 'private', 'is_correct' => true],
                            ['label' => 'hidden', 'is_correct' => false],
                        ],
                    ],
                ],
            ],
        ],
    ], ['save' => false]);

    fc_cap('courses/submit-lesson-quiz', 'POST', 'courses/{{course_id}}/lessons/{{quiz_lesson_id}}/quiz/submit', [], [
        'answers' => [
            'q1' => 'POST',
            'q2' => ['public', 'private'],
        ],
    ], ['as' => fc_ctx('user3_id')]);

    fc_cap('courses/get-lesson-quiz-result', 'GET', 'courses/{{course_id}}/lessons/{{quiz_lesson_id}}/quiz/result', [], [], ['as' => fc_ctx('user3_id')]);
    fc_cap('courses/list-course-quiz-results', 'GET', 'admin/courses/{{course_id}}/quiz-results');
    fc_cap('courses/get-exportable-quiz-results', 'GET', 'admin/courses/{{course_id}}/export/quiz-results');

    $quizResults = fc_cap('courses/_quiz-results-read', 'GET', 'admin/courses/{{course_id}}/quiz-results', [], [], ['save' => false]);
    $quizResultId = \FluentCommunity\Framework\Support\Arr::get((array)$quizResults, 'results.data.0.id');
    if (!$quizResultId) {
        $db = \FluentCommunity\App\App::make('db');
        $row = $db->table('fcom_post_comments')->where('type', 'quiz')->orderBy('id', 'desc')->first();
        $quizResultId = $row ? (int)$row->id : null;
    }
    fc_set('quiz_result_id', $quizResultId);
    fc_cap('courses/update-course-quiz-result', 'POST', 'admin/courses/{{course_id}}/quiz-results/{{quiz_result_id}}', [], [
        'status' => 'passed',
    ]);
}

fc_cap('courses/delete-reset-my-progress', 'DELETE', 'courses/{{course_id}}/progress', [], [], ['as' => fc_ctx('user3_id')]);
fc_cap('courses/delete-reset-student-progress', 'DELETE', 'admin/courses/{{course_id}}/students/{{user1_id}}/progress');
fc_cap('courses/remove-course-student', 'DELETE', 'admin/courses/{{course_id}}/students/{{user2_id}}');

// Invitations (mail is suppressed globally)
fc_cap('invitations/create-invitation', 'POST', 'invitations', [], [
    'email'        => 'new.member+' . wp_generate_password(6, false) . '@example.com',
    'space_id'     => fc_ctx('space_id'),
    'invitee_name' => 'New Member',
]);
fc_cap('invitations/create-invitation-link', 'POST', 'invitations/link', [], [
    'title'       => 'Team invite link',
    'space_id'    => fc_ctx('space_id'),
    'limit'       => 0,
    'expire_date' => '',
]);

// Settings round-trips: read the current value and write the identical payload
// back, so the response shape is real without changing any configuration.
$roundTrips = [
    ['settings/save-feature-settings',       'settings/features',                'features',  'admin/get-general-settings'],
];
$featureGet = fc_cap('settings/_features-read', 'GET', 'settings/features', [], [], ['save' => false]);
if (is_array($featureGet) && isset($featureGet['features'])) {
    fc_cap('settings/save-feature-settings', 'POST', 'settings/features', [], ['features' => $featureGet['features']]);
}

$menuGet = fc_cap('settings/_menu-read', 'GET', 'settings/menu-settings', [], [], ['save' => false]);
if (is_array($menuGet)) {
    fc_cap('settings/save-menu-settings', 'POST', 'settings/menu-settings', [], [
        'menuSettings' => isset($menuGet['menuSettings']) ? $menuGet['menuSettings'] : (isset($menuGet['settings']) ? $menuGet['settings'] : $menuGet),
    ]);
}

$customGet = fc_cap('settings/_custom-read', 'GET', 'settings/customization-settings', [], [], ['save' => false]);
if (is_array($customGet) && isset($customGet['settings'])) {
    fc_cap('settings/save-customization-settings', 'POST', 'settings/customization-settings', [], ['settings' => $customGet['settings']]);
}

$privacyGet = fc_cap('settings/_privacy-read', 'GET', 'settings/privacy-settings', [], [], ['save' => false]);
if (is_array($privacyGet) && isset($privacyGet['settings'])) {
    fc_cap('settings/save-privacy-settings', 'POST', 'settings/privacy-settings', [], ['settings' => $privacyGet['settings']]);
}

$colorGet = fc_cap('settings/_color-read', 'GET', 'settings/color-config', [], [], ['save' => false]);
if (is_array($colorGet)) {
    fc_cap('settings/save-color-config', 'POST', 'settings/color-config', [], $colorGet);
}

$crmGet = fc_cap('settings/_crm-read', 'GET', 'settings/crm-tagging-config', [], [], ['save' => false]);
if (is_array($crmGet)) {
    fc_cap('settings/save-crm-tagging-config', 'POST', 'settings/crm-tagging-config', [], $crmGet);
}

$playerGet = fc_cap('settings/_player-read', 'GET', 'settings/fluent-player-settings', [], [], ['save' => false]);
if (is_array($playerGet) && isset($playerGet['settings'])) {
    fc_cap('settings/save-fluent-player-settings', 'POST', 'settings/fluent-player-settings', [], ['settings' => $playerGet['settings']]);
}

$followGet = fc_cap('settings/_follow-read', 'GET', 'settings/followers/config', [], [], ['save' => false]);
if (is_array($followGet)) {
    fc_cap('settings/save-followers-settings', 'POST', 'settings/followers/config', [], $followGet);
}

$snipGet = fc_cap('settings/_snip-read', 'GET', 'settings/snippets-settings', [], [], ['save' => false]);
if (is_array($snipGet)) {
    fc_cap('settings/save-snippets-settings', 'POST', 'settings/snippets-settings', [], $snipGet);
}

$genGet = fc_cap('admin/_general-read', 'GET', 'admin/general', [], [], ['save' => false]);
if (is_array($genGet) && isset($genGet['settings'])) {
    fc_cap('admin/save-general-settings', 'POST', 'admin/general', [], ['settings' => $genGet['settings']]);
}

$emailGet = fc_cap('admin/_email-read', 'GET', 'admin/email-settings', [], [], ['save' => false]);
if (is_array($emailGet) && isset($emailGet['email_settings'])) {
    fc_cap('admin/save-email-settings', 'POST', 'admin/email-settings', [], [
        'email_settings' => $emailGet['email_settings'],
        'settings'       => $emailGet['email_settings'],
    ]);
}

$storageGet = fc_cap('admin/_storage-read', 'GET', 'admin/storage-settings', [], [], ['save' => false]);
if (is_array($storageGet) && isset($storageGet['config'])) {
    fc_cap('admin/save-storage-settings', 'POST', 'admin/storage-settings', [], [
        'config'   => $storageGet['config'],
        'settings' => $storageGet['config'],
    ]);
}

$bannerGet = fc_cap('admin/_banner-read', 'GET', 'admin/welcome-banner', [], [], ['save' => false]);
if (is_array($bannerGet) && isset($bannerGet['settings'])) {
    fc_cap('admin/save-admin-welcome-banner', 'POST', 'admin/welcome-banner', [], ['settings' => $bannerGet['settings']]);
}

$authGet = fc_cap('admin/_auth-read', 'GET', 'admin/auth-settings', [], [], ['save' => false]);
if (is_array($authGet) && isset($authGet['settings'])) {
    fc_cap('admin/save-auth-settings', 'POST', 'admin/auth-settings', [], ['settings' => $authGet['settings']]);
}

$onboardGet = fc_cap('admin/_onboard-read', 'GET', 'admin/on-boardings', [], [], ['save' => false]);
if (is_array($onboardGet) && isset($onboardGet['settings'])) {
    fc_cap('admin/save-onboarding-settings', 'POST', 'admin/on-boardings', [], ['settings' => $onboardGet['settings']]);
}

$providerGet = fc_cap('admin/_provider-read', 'GET', 'admin/profile-link-providers', [], [], ['save' => false]);
if (is_array($providerGet)) {
    fc_cap('admin/save-profile-link-providers', 'POST', 'admin/profile-link-providers', [], [
        'configs' => isset($providerGet['configs']) ? $providerGet['configs'] : (isset($providerGet['providers']) ? $providerGet['providers'] : []),
    ]);
}

$cpfGet = fc_cap('admin/_cpf-read', 'GET', 'admin/custom-profile-fields', [], [], ['save' => false]);
if (is_array($cpfGet)) {
    fc_cap('admin/post-save-custom-profile-fields', 'POST', 'admin/custom-profile-fields', [], [
        'groups'     => isset($cpfGet['groups']) ? $cpfGet['groups'] : [],
        'fields'     => isset($cpfGet['fields']) ? $cpfGet['fields'] : [],
        'is_enabled' => isset($cpfGet['is_enabled']) ? $cpfGet['is_enabled'] : 'no',
    ]);
}

$msgGet = fc_cap('admin/_msg-read', 'GET', 'admin/messaging-setting', [], [], ['save' => false]);
if (is_array($msgGet) && isset($msgGet['settings'])) {
    fc_cap('admin/save-messaging-settings', 'POST', 'admin/messaging-setting', [], ['settings' => $msgGet['settings']]);
}

$pwaGet = fc_cap('admin/_pwa-read', 'GET', 'admin/pwa-settings', [], [], ['save' => false]);
if (is_array($pwaGet) && isset($pwaGet['settings'])) {
    fc_cap('admin/post-save-settings', 'POST', 'admin/pwa-settings', [], ['settings' => $pwaGet['settings']]);
}

$badgeGet = fc_cap('admin/_badge-read', 'GET', 'admin/user-badges', [], [], ['save' => false]);
if (is_array($badgeGet) && isset($badgeGet['badges'])) {
    fc_cap('admin/save-user-badges', 'POST', 'admin/user-badges', [], ['badges' => $badgeGet['badges']]);
}

$levelGet = fc_cap('leaderboard/_level-read', 'GET', 'admin/leaderboards/levels', [], [], ['save' => false]);
if (is_array($levelGet) && isset($levelGet['levels'])) {
    fc_cap('leaderboard/save-leaderboard-levels', 'POST', 'admin/leaderboards/levels', [], ['levels' => $levelGet['levels']]);
}

// Topic config + sidebar link + webhook + manager (sandbox rows we then remove)
fc_cap('admin/save-topic-config', 'POST', 'admin/topics/config', [], [
    'config' => ['show_topics_in_sidebar' => 'yes'],
]);
$link = fc_cap('admin/save-sidebar-link', 'POST', 'admin/links', [], [
    'link' => [
        'title'     => 'Docs Sandbox Link',
        'parent_id' => fc_ctx('space_group_id'),
        'privacy'   => 'public',
        'settings'  => [
            'permalink' => 'https://example.com/docs',
            'new_tab'   => 'yes',
            'emoji'     => '',
            'shape_svg' => '',
        ],
    ],
]);
$linkId = null;
if (is_array($link)) {
    $linkId = isset($link['link']['id']) ? $link['link']['id'] : (isset($link['sidebar_link']['id']) ? $link['sidebar_link']['id'] : null);
}
if (!$linkId) {
    $e = BaseSpace::withoutGlobalScopes()->where('slug', 'docs-sandbox-link')->first();
    $linkId = $e ? $e->id : null;
}
fc_set('sidebar_link_id', $linkId);

$webhook = fc_cap('admin/save-webhook', 'POST', 'admin/webhooks', [], [
    'title'                 => 'Docs Sandbox Webhook',
    'space_ids'             => array_values(array_filter([fc_ctx('space_id')])),
    'course_ids'            => array_values(array_filter([fc_ctx('course_id')])),
    'send_wp_welcome_email' => 'no',
]);
$webhookId = null;
if (is_array($webhook)) {
    $webhookId = isset($webhook['webhook']['id']) ? $webhook['webhook']['id'] : null;
}
fc_set('webhook_id', $webhookId);

fc_cap('admin/save-admin-manager', 'POST', 'admin/managers', [], [
    'user_id'     => fc_ctx('user2_id'),
    'permissions' => ['space_management'],
]);

// ---------------------------------------------------------------------------
// Delete captures (all on sandbox rows)
// ---------------------------------------------------------------------------
fc_cap('admin/delete-admin-manager', 'DELETE', 'admin/managers/{{user2_id}}');
fc_cap('admin/delete-webhook', 'DELETE', 'admin/webhooks/{{webhook_id}}');
fc_cap('admin/delete-sidebar-link', 'DELETE', 'admin/links/{{sidebar_link_id}}');
fc_cap('admin/delete-topic', 'DELETE', 'admin/topics/{{scratch_topic_id}}');
fc_cap('comments/delete-comment', 'DELETE', 'feeds/{{feed_id}}/comments/{{scratch_comment_id}}');
fc_cap('feeds/delete-feed', 'DELETE', 'feeds/{{scratch_feed_id}}');
fc_cap('courses/delete-course-lesson', 'DELETE', 'admin/courses/{{course_id}}/lessons/{{scratch_lesson_id}}');
fc_cap('courses/delete-course-section', 'DELETE', 'admin/courses/{{course_id}}/sections/{{scratch_section_id}}');
fc_cap('courses/delete-course', 'DELETE', 'admin/courses/{{scratch_course_id}}');
fc_cap('spaces/delete-space-by-id', 'DELETE', 'spaces/{{scratch_space2_id}}/by-id');
fc_cap('spaces/delete-space-by-slug', 'DELETE', 'spaces/{{scratch_space_slug}}');

// Moderation + invitation deletes use rows created above.
$reports = fc_cap('reports/_reports-read', 'GET', 'moderation/reports', [], [], ['save' => false]);
$reportId = \FluentCommunity\Framework\Support\Arr::get((array)$reports, 'reports.data.0.id');
if (!$reportId) {
    $db = \FluentCommunity\App\App::make('db');
    $row = $db->table('fcom_post_comments')->where('type', 'report')->orderBy('id', 'desc')->first();
    $reportId = $row ? (int)$row->id : null;
}
fc_set('report_id', $reportId);
fc_cap('reports/update-moderation-report', 'PUT', 'moderation/reports/{{report_id}}', [], ['status' => 'unpublished']);
fc_cap('reports/delete-moderation-report', 'DELETE', 'moderation/reports/{{report_id}}');

$inv = fc_cap('invitations/_inv-read', 'GET', 'invitations', ['space_id' => '{{space_id}}'], [], ['save' => false]);
$invId = \FluentCommunity\Framework\Support\Arr::get((array)$inv, 'invitations.data.0.id');
if (!$invId) {
    $db = \FluentCommunity\App\App::make('db');
    $row = $db->table('fcom_post_comments')->where('type', 'invitation')->orderBy('id', 'desc')->first();
    $invId = $row ? (int)$row->id : null;
}
fc_set('invitation_id', $invId);
fc_cap('invitations/list-invitations', 'GET', 'invitations', ['space_id' => '{{space_id}}', 'status' => 'pending']);
fc_cap('invitations/resend-invitation', 'POST', 'invitations/{{invitation_id}}/resend');
fc_cap('invitations/delete-invitation', 'DELETE', 'invitations/{{invitation_id}}');


// ---------------------------------------------------------------------------
// Remaining endpoints that are safe to exercise on a dev install
// ---------------------------------------------------------------------------

// Moderation config round-trip (read the live config, write the same back).
$modConfig = fc_cap('reports/_moderation-config-read', 'GET', 'options/app-vars', [], [], ['save' => false]);
$existingModConfig = \FluentCommunity\App\Functions\Utility::getOption('moderation_config', []);
if (!is_array($existingModConfig) || !$existingModConfig) {
    $existingModConfig = [
        'is_enabled'                      => 'no',
        'profanity_filter'                => '',
        'flag_after_threshold'            => 3,
        'first_comment_approval'          => 'no',
        'auto_flag_user_reject_threshold' => 0,
        'auto_flag_user_report_threshold' => 0,
    ];
}
fc_cap('reports/save-moderation-config', 'POST', 'moderation/config', [], ['config' => $existingModConfig]);

// Mark a single notification read, using one addressed to the sandbox student.
$db = \FluentCommunity\App\App::make('db');
$notifRow = $db->table('fcom_notification_users')
    ->where('user_id', fc_ctx('user1_id'))
    ->where('object_type', 'notification')
    ->orderBy('id', 'desc')
    ->first();
if ($notifRow) {
    fc_set('notification_id', $notifRow->object_id);
    fc_cap('notifications/mark-notification-read', 'POST', 'notifications/mark-read/{{notification_id}}', [], [], ['as' => fc_ctx('user1_id')]);
}

// Password change, performed by a throwaway sandbox account on itself.
$oldPrivacy = \FluentCommunity\App\Functions\Utility::getPrivacySetting('can_change_password');
if ($oldPrivacy === 'yes') {
    $tempPassword = wp_generate_password(16, false);
    wp_set_password($tempPassword, fc_ctx('user3_id'));
    fc_cap('profile/post-change-password', 'POST', 'profile/{{user3_username}}/change-password', [], [
        'data' => [
            'current_password' => $tempPassword,
            'new_password'     => $tempPassword . 'X1',
            'confirm_password' => $tempPassword . 'X1',
        ],
    ], ['as' => fc_ctx('user3_id')]);
}

// Portal slug: post the slug that is already configured, so nothing changes.
$generalSettings = \FluentCommunity\App\Services\Helper::generalSettings();
if (!defined('FLUENT_COMMUNITY_PORTAL_SLUG') && !empty($generalSettings['slug'])) {
    fc_cap('admin/change-portal-slug', 'POST', 'admin/on-boardings/change-slug', [], [
        'new_slug' => $generalSettings['slug'],
    ]);
}

// FluentPlayer video content, using any existing media row.
$mediaRow = $db->table('fcom_media_archive')->orderBy('id', 'desc')->first();
if ($mediaRow) {
    fc_set('media_id', $mediaRow->media_key ? $mediaRow->media_key : $mediaRow->id);
    fc_cap('media/get-video-content', 'GET', 'fluent-player/video-content/{{media_id}}', [
        'url'      => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'title'    => 'Lesson intro',
        'provider' => 'youtube',
        'type'     => 'video',
    ]);
}

// Giphy search (the API key is configured on this install).
fc_cap('giphy/search-giphy', 'GET', 'giphy', ['q' => 'welcome', 'offset' => 0, 'limit' => 5]);

// Document library: attach a document to the sandbox space, then update and
// delete it through the API.
$mediaModel = \FluentCommunity\App\Models\Media::create([
    'media_key'      => md5(uniqid('docs', true)),
    'user_id'        => 1,
    'is_active'      => 1,
    'media_type'     => 'document',
    'object_source'  => 'space_document',
    'sub_object_id'  => fc_ctx('space_id'),
    'media_path'     => 'fluent-community/documents/community-handbook.pdf',
    'url'            => 'https://example.com/community-handbook.pdf',
    'settings'       => [
        'title' => 'Community handbook.pdf',
        'type'  => 'application/pdf',
    ],
]);
if ($mediaModel) {
    fc_set('document_id', $mediaModel->id);
    fc_cap('documents/update-document', 'POST', 'documents/update', [], [
        'id'    => $mediaModel->id,
        'title' => 'Community handbook (2026 edition).pdf',
    ]);
    fc_cap('documents/delete-document', 'POST', 'documents/delete', [], [
        'id' => $mediaModel->id,
    ]);
}

// Space group delete last (children already removed).
fc_cap('spaces/delete-space-group', 'DELETE', 'spaces/space_groups/{{scratch_group_id}}');
