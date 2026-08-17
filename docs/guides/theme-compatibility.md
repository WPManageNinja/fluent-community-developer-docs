---
title: Theme Compatibility
description: Understand FluentCommunity headless and classic portal rendering modes.
---

# Theme Compatibility

The current FluentCommunity runtime supports two rendering modes:

- **Headless portal mode:** the default path in the shipped code. `Modules\FeaturesHandler` adds `fluent_community/portal_page_headless` as `true`.
- **Classic portal mode:** the portal page runs through the normal `portal_page.php` shell and WordPress theme hooks.

Use [`fluent_community/portal_page_headless`](/hooks/filters/rendering#fluent-community-portal-page-headless) to switch modes. Do not rely on the older `template_slug` examples from legacy docs.

## Force Classic Portal Rendering

```php
add_filter('fluent_community/portal_page_headless', '__return_false');
```

When this filter returns `false`, `PortalHandler` enqueues the portal assets with WordPress and renders the standard `portal_page.php` shell.

## Stay in Headless Mode and Inject Your Own Markup

When headless mode is enabled, the plugin renders `app/Views/headless_page.php` and exposes these hook points:

- [`fluent_community/headless/head_early`](/hooks/actions/rendering#fluent-community-headless-head-early)
- [`fluent_community/headless/head`](/hooks/actions/rendering#fluent-community-headless-head)
- [`fluent_community/headless/content`](/hooks/actions/rendering#fluent-community-headless-content)
- [`fluent_community/headless/before_js_loaded`](/hooks/actions/rendering#fluent-community-headless-before-js-loaded)
- [`fluent_community/headless/footer`](/hooks/actions/rendering#fluent-community-headless-footer)

Example:

```php
add_action('fluent_community/headless/head', function ($scope) {
    if ($scope !== 'portal') {
        return;
    }
    ?>
    <meta name="robots" content="index,follow" />
    <?php
}, 10, 1);
```

## Classic Portal Hook Points

The classic portal shell exposes a different set of hooks:

- [`fluent_community/portal_head_meta`](/hooks/actions/rendering#fluent-community-portal-head-meta)
- [`fluent_community/portal_head`](/hooks/actions/rendering#fluent-community-portal-head)
- [`fluent_community/portal_html`](/hooks/actions/rendering#fluent-community-portal-html)
- [`fluent_community/portal_footer`](/hooks/actions/rendering#fluent-community-portal-footer)

This is the correct place to inject analytics, custom CSS, or SEO metadata when you are using the regular portal page template.

## Headless Asset Loading

In headless mode, `PortalHandler` triggers [`fluent_community/rendering_headless_portal`](/hooks/actions/rendering#fluent-community-rendering-headless-portal) and `Modules\FeaturesHandler` attaches the CSS and JS bundles to the headless template. If you override this flow, keep that action in place or manually load the same assets.

## Practical Rule of Thumb

- Use **headless mode** when FluentCommunity is the product shell and you want the fastest, most isolated rendering path.
- Use **classic mode** when the community must inherit broader WordPress template behavior or theme-level integrations.

## Full hook reference

Every hook named on this page has a generated reference entry with its parameters,
call sites and an example — see [Rendering & Theming actions](/hooks/actions/rendering) and
[Rendering & Theming filters](/hooks/filters/rendering).
