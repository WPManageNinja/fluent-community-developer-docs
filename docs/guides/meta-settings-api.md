---
title: Meta Settings API
description: Extend space and course settings panels with custom meta sections.
---

# Meta Settings API

FluentCommunity exposes a small extension API through `FluentCommunity\App\Functions\Utility::extender()`. The entry point is `FluentExtendApi::addMetaBox()`.

## Register a Meta Section

```php
add_action('fluent_community/on_wp_init', function () {
    $extender = \FluentCommunity\App\Functions\Utility::extender();

    $extender->addMetaBox('docs_example', [
        'section_title'   => 'Docs Example',
        'fields_callback' => function ($model) {
            return [
                'webhook_secret' => [
                    'label'       => 'Webhook Secret',
                    'type'        => 'text',
                    'placeholder' => 'Enter a shared secret',
                    'help_text'   => 'Stored as custom meta on the selected object.',
                ],
            ];
        },
        'data_callback'   => function ($model) {
            return [
                'webhook_secret' => $model->getCustomMeta('_docs_example', ''),
            ];
        },
        'save_callback'   => function ($settings, $model) {
            $model->updateCustomMeta('_docs_example', sanitize_text_field($settings['webhook_secret'] ?? ''));
        },
    ], ['space', 'course']);
});
```

## Required Arguments

`addMetaBox()` expects:

- `section_title`
- `fields_callback`
- `data_callback`
- `save_callback`

It only accepts `space` and `course` in the object types array.

## What the API Registers Internally

For each object type you enable, the extender wires up:

- `fluent_community/{object}/meta_fields`
- `fluent_community/{object}/update_meta_settings_{provider}`

That means a provider key of `docs_example` becomes:

- `fluent_community/space/update_meta_settings_docs_example`
- `fluent_community/course/update_meta_settings_docs_example`

## Storage Helpers

The built-in models already provide helper methods for custom meta:

- `BaseSpace::getCustomMeta()` / `BaseSpace::updateCustomMeta()`
- `User::getCustomMeta()` / `User::updateCustomMeta()`
- `Feed::getCustomMeta()` / `Feed::updateCustomMeta()`

For settings panels, use the model instance passed into your callbacks instead of querying the `fcom_meta` table directly.

## Related Endpoints

- [Get Space Meta Settings](/restapi/operations/spaces/get-space-meta-settings)
- [Get Course Meta Settings](/restapi/operations/courses/get-course-meta-settings)
- [Get Space Lockscreen Settings](/restapi/operations/spaces/get-space-lockscreens)
- [Update Space Lockscreen Settings](/restapi/operations/spaces/update-space-lockscreen-settings) <span class="pro-badge">PRO</span>
- [Update Course Lockscreen Settings](/restapi/operations/courses/update-course-lockscreen-settings) <span class="pro-badge">PRO</span>
