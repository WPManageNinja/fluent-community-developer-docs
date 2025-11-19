# Theme Compatibility ​

## Introduction ​

Fluent Community runs in its own optimized template environment that doesn't load unnecessary WordPress resources. This design choice provides better performance and reduces conflicts. However, you can still integrate Fluent Community's frame UI into your WordPress pages, posts, and custom post types.

::: tip Performance First
Fluent Community uses a standalone template by default for optimal performance. Use theme compatibility features only when you need to integrate with your WordPress theme.
:::

---

## Understanding Fluent Community Templates ​

### Default Behavior ​

By default, Fluent Community uses its own template (`fluent-community.php`) which:

- ✅ Loads minimal WordPress resources
- ✅ Provides optimal performance
- ✅ Reduces theme conflicts
- ✅ Delivers faster page loads
- ✅ Uses Vue.js single-page application architecture

### Frame Template ​

The frame template (`fluent-community-frame.php`) integrates with your WordPress theme:

- ✅ Loads your theme's header and footer
- ✅ Maintains consistent site design
- ✅ Works with theme navigation
- ✅ Compatible with most themes and page builders
- ⚠️ Slightly slower due to additional WordPress resources

---

## Theme Compatibility Options ​

### Block Themes (Recommended) ​

If you're using a modern block theme (WordPress 5.9+):

#### Option 1: Use Default Block Template ​

1. Go to **Pages → Edit Page**
2. In the right sidebar, find **Template**
3. Select **"Fluent Community"** template
4. Update the page

#### Option 2: Use Page Layout Block ​

1. Edit your page in the block editor
2. Add the **"Fluent Community Page Layout"** block
3. Configure block settings
4. Publish the page

**Supported Post Types:**
- Pages ✅
- Posts ✅
- Custom Post Types ✅
- Archives ✅

---

### Classic Themes ​

If you're using a classic theme:

#### Automatic Compatibility ​

Fluent Community automatically works with most popular classic themes and page builders:

- ✅ Astra
- ✅ GeneratePress
- ✅ OceanWP
- ✅ Kadence
- ✅ Neve
- ✅ Elementor
- ✅ Beaver Builder
- ✅ Divi
- ✅ And many more...

#### Manual Configuration ​

If your theme doesn't work automatically, use the code snippets below.

---

## Using Code Snippets ​

### Load Frame for Specific Post Types ​

#### Single Blog Posts Only ​

```php
add_filter('fluent_community/template_slug', function ($templateSlug) {
    if (is_singular(['post'])) {
        return 'fluent-community-frame.php';
    }
    return $templateSlug;
});
```

**Use Case:** Integrate community features into blog posts while keeping other pages separate.

---

#### Posts and Archives ​

```php
add_filter('fluent_community/template_slug', function ($templateSlug) {
    if (is_singular(['post']) || is_home() || is_category() || is_tag() || is_author()) {
        return 'fluent-community-frame.php';
    }
    return $templateSlug;
});
```

**Use Case:** Full blog integration with community features.

---

#### All Pages and Posts ​

```php
add_filter('fluent_community/template_slug', function ($templateSlug) {
    return 'fluent-community-frame.php';
});
```

**Use Case:** Complete site integration with consistent theme design everywhere.

---

### Load Frame for Custom Post Types ​

#### Specific Custom Post Type ​

```php
add_filter('fluent_community/template_slug', function ($templateSlug) {
    if (is_singular(['product', 'course'])) {
        return 'fluent-community-frame.php';
    }
    return $templateSlug;
});
```

**Use Case:** Integrate community with WooCommerce products or LearnDash courses.

---

#### Multiple Custom Post Types ​

```php
add_filter('fluent_community/template_slug', function ($templateSlug) {
    $postTypes = ['product', 'course', 'event', 'portfolio'];
    
    if (is_singular($postTypes)) {
        return 'fluent-community-frame.php';
    }
    return $templateSlug;
});
```

---

### Conditional Loading ​

#### Load Frame Only for Logged-In Users ​

```php
add_filter('fluent_community/template_slug', function ($templateSlug) {
    if (is_user_logged_in()) {
        return 'fluent-community-frame.php';
    }
    return $templateSlug;
});
```

**Use Case:** Show community features only to members.

---

#### Load Frame Based on User Role ​

```php
add_filter('fluent_community/template_slug', function ($templateSlug) {
    $user = wp_get_current_user();
    
    if (in_array('subscriber', $user->roles) || in_array('member', $user->roles)) {
        return 'fluent-community-frame.php';
    }
    
    return $templateSlug;
});
```

**Use Case:** Different templates for different user roles.

---

#### Exclude Specific Pages ​

```php
add_filter('fluent_community/template_slug', function ($templateSlug) {
    // Don't use frame on homepage or specific pages
    if (is_front_page() || is_page(['about', 'contact'])) {
        return $templateSlug;
    }
    
    // Use frame everywhere else
    return 'fluent-community-frame.php';
});
```

**Use Case:** Keep marketing pages separate from community.

---

## Page Builder Integration ​

### Elementor ​

Fluent Community works seamlessly with Elementor:

1. Create a new page in Elementor
2. Add the **"Fluent Community"** widget
3. Configure widget settings
4. Publish the page

**Alternative:** Use the template filter to load the frame template.

---

### Beaver Builder ​

```php
add_filter('fluent_community/template_slug', function ($templateSlug) {
    if (class_exists('FLBuilder') && FLBuilderModel::is_builder_enabled()) {
        return 'fluent-community-frame.php';
    }
    return $templateSlug;
});
```

---

### Divi Builder ​

```php
add_filter('fluent_community/template_slug', function ($templateSlug) {
    if (function_exists('et_pb_is_pagebuilder_used') && et_pb_is_pagebuilder_used(get_the_ID())) {
        return 'fluent-community-frame.php';
    }
    return $templateSlug;
});
```

---

## Advanced Customization ​

### Custom Template Loading ​

Create your own custom template:

```php
add_filter('fluent_community/template_slug', function ($templateSlug) {
    // Load custom template from your theme
    if (is_singular('community')) {
        return 'my-custom-community-template.php';
    }
    return $templateSlug;
});
```

Then create `my-custom-community-template.php` in your theme directory:

```php
<?php
/**
 * Template Name: Custom Community Template
 */

get_header();
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">
        <?php
        // Load Fluent Community content
        do_action('fluent_community/render_portal');
        ?>
    </main>
</div>

<?php
get_sidebar();
get_footer();
```

---

### Modify Frame Template Behavior ​

#### Remove Sidebar from Frame ​

```php
add_action('fluent_community/before_frame_content', function() {
    add_filter('sidebars_widgets', function($sidebars) {
        $sidebars['sidebar-1'] = [];
        return $sidebars;
    });
});
```

---

#### Add Custom Content Before Community ​

```php
add_action('fluent_community/before_portal_content', function() {
    ?>
    <div class="custom-banner">
        <h2>Welcome to Our Community!</h2>
        <p>Connect, share, and grow together.</p>
    </div>
    <?php
});
```

---

#### Add Custom Content After Community ​

```php
add_action('fluent_community/after_portal_content', function() {
    ?>
    <div class="custom-footer">
        <p>Need help? <a href="/support">Contact Support</a></p>
    </div>
    <?php
});
```

---

## Troubleshooting ​

### Theme Not Compatible ​

**Symptoms:**
- Layout breaks
- Styles conflict
- JavaScript errors

**Solutions:**

1. **Try Frame Template:**
   ```php
   add_filter('fluent_community/template_slug', function ($templateSlug) {
       return 'fluent-community-frame.php';
   });
   ```

2. **Check for Conflicts:**
   - Disable other plugins temporarily
   - Switch to a default WordPress theme
   - Check browser console for errors

3. **Contact Support:**
   If issues persist, [open a support ticket](https://fluentcommunity.co/support/) with:
   - Theme name and version
   - Active plugins list
   - Browser console errors
   - Screenshots of the issue

---

### Styles Not Loading ​

**Symptoms:**
- Community looks unstyled
- Missing CSS

**Solutions:**

1. **Clear Cache:**
   - Clear WordPress cache
   - Clear browser cache
   - Clear CDN cache

2. **Check Theme Compatibility:**
   ```php
   add_action('wp_enqueue_scripts', function() {
       wp_enqueue_style('fluent-community');
   }, 999);
   ```

3. **Force Style Loading:**
   ```php
   add_filter('fluent_community/load_styles_in_frame', '__return_true');
   ```

---

### JavaScript Conflicts ​

**Symptoms:**
- Features not working
- Console errors
- Broken interactions

**Solutions:**

1. **Load Scripts in Footer:**
   ```php
   add_filter('fluent_community/load_scripts_in_footer', '__return_true');
   ```

2. **Disable Conflicting Scripts:**
   ```php
   add_action('wp_print_scripts', function() {
       if (is_singular('community')) {
           wp_dequeue_script('conflicting-script-handle');
       }
   }, 100);
   ```

---

### Performance Issues ​

**Symptoms:**
- Slow page loads
- High server load

**Solutions:**

1. **Use Default Template:**
   Remove frame template filter to use the optimized default template.

2. **Optimize Theme:**
   - Disable unused theme features
   - Minimize loaded scripts/styles
   - Use a lightweight theme

3. **Enable Caching:**
   - Use a caching plugin
   - Enable object caching
   - Use a CDN

---

## Best Practices ​

### 1. Use Default Template When Possible ​

The default Fluent Community template provides the best performance. Only use frame template when theme integration is necessary.

### 2. Test Thoroughly ​

Always test theme compatibility on a staging site before deploying to production.

### 3. Keep It Simple ​

Avoid loading unnecessary theme resources in community pages.

### 4. Monitor Performance ​

Use tools like Query Monitor to identify performance bottlenecks.

### 5. Update Regularly ​

Keep Fluent Community, your theme, and WordPress updated for best compatibility.

---

## Official Documentation ​

For more detailed information, see the [official Theme Compatibility guide](https://fluentcommunity.co/docs/theme-compatibility-feature/).

---

## Related Documentation ​

- [Performance Optimization](/deployment/performance-optimization.md) - Optimize your setup
- [Server Requirements](/deployment/server-requirements.md) - Hosting recommendations
- [Code Snippets](/guides/code-snippets.md) - More practical examples
- [Helper Functions](/helpers/helper-class.md) - Utility functions

