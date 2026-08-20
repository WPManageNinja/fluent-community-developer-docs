---
title: Theme Compatibility
description: How the FluentCommunity portal and auth screens are rendered, and where to hook into each.
---

# Theme Compatibility

FluentCommunity renders its own full-page HTML rather than going through your
theme's templates. There are two separate templates, and they are chosen by
*which page you are on*, not by a setting:

| Page | Template | Rendered from |
| --- | --- | --- |
| The portal (`/portal` and everything under it) | `app/Views/portal_page.php` | `PortalHandler` |
| Login, signup, password reset, invitation acceptance | `app/Views/headless_page.php` | `Modules\Auth\AuthModdule::viewAuthPage()` |

This matters because the two templates expose **different hooks**, and a callback
registered on the wrong set never fires.

## Portal pages

The portal always renders `portal_page.php`. Its hook points are:

- [`fluent_community/portal_head_meta`](/hooks/actions/rendering#fluent-community-portal-head-meta) — inside `<head>`, after the meta tags
- [`fluent_community/portal_head`](/hooks/actions/rendering#fluent-community-portal-head) — end of `<head>`
- [`fluent_community/portal_html`](/hooks/actions/rendering#fluent-community-portal-html) — inside the app container
- [`fluent_community/before_js_loaded`](/hooks/actions/rendering#fluent-community-before-js-loaded) — before the portal bundle is loaded
- [`fluent_community/portal_footer`](/hooks/actions/rendering#fluent-community-portal-footer) — end of `<body>`

This is where analytics, custom CSS and SEO metadata belong.

```php
add_action('fluent_community/portal_head', function () {
    ?>
    <meta name="robots" content="index,follow" />
    <?php
});
```

## Whether WordPress head and footer run

[`fluent_community/portal_page_headless`](/hooks/filters/rendering#fluent-community-portal-page-headless)
controls one thing only: whether `portal_page.php` calls `wp_head()` and
`wp_footer()`. It does **not** switch templates.

`Modules\FeaturesHandler` sets it to `true` by default, so out of the box the
portal does *not* run `wp_head()`/`wp_footer()` — which is why theme and plugin
assets do not appear there.

Return `false` to bring them back:

```php
add_filter('fluent_community/portal_page_headless', '__return_false');
```

Expect to re-check your styling afterwards: every plugin that enqueues global CSS
will now load inside the portal.

## Auth screens

The login, signup, password-reset and invitation-acceptance screens render
`headless_page.php`, which has its own hooks:

- [`fluent_community/headless/head_early`](/hooks/actions/rendering#fluent-community-headless-head-early)
- [`fluent_community/headless/head`](/hooks/actions/rendering#fluent-community-headless-head)
- [`fluent_community/headless/content`](/hooks/actions/rendering#fluent-community-headless-content)
- [`fluent_community/headless/before_js_loaded`](/hooks/actions/rendering#fluent-community-headless-before-js-loaded)
- [`fluent_community/headless/footer`](/hooks/actions/rendering#fluent-community-headless-footer)

Each receives a `$scope` argument. Today `AuthModdule` is the only caller and it
always passes `user_registration`, so the argument is currently a constant — do
not branch on it expecting a `portal` value.

```php
add_action('fluent_community/headless/head', function ($scope) {
    ?>
    <meta name="robots" content="noindex" />
    <?php
}, 10, 1);
```

## Full hook reference

Every hook named here has a generated entry with its parameters, call sites and an
example — see [Rendering & Theming actions](/hooks/actions/rendering) and
[Rendering & Theming filters](/hooks/filters/rendering).
