<DocStatusBanner />

# Meta Settings API ​

## Introduction ​

The Meta Settings API allows you to add custom meta fields to Course and Space settings pages. This powerful API enables you to extend Fluent Community with custom configuration options for your spaces and courses.

::: tip Use Cases
- Add custom configuration fields for integrations
- Store additional space/course metadata
- Create custom settings sections for your extensions
- Build advanced customization options
:::

---

## Basic Usage ​

### Adding a Custom Meta Box ​

```php
add_action('fluent_community/on_wp_init', function ($app) {
    $api = \FluentCommunity\App\Functions\Utility::extender();
    
    $api->addMetaBox('my_custom_metabox', [
        'section_title'   => 'My Custom Settings',
        'fields_callback' => function ($spaceOrCourse) {
            return [
                // Define your fields here
            ];
        },
        'data_callback'   => function ($spaceOrCourse) {
            // Retrieve saved data
        },
        'save_callback'   => function ($settings, $spaceOrCourse) {
            // Save the data
        }
    ], ['course', 'space']); // Where to show: 'course', 'space', or both
});
```

::: tip Compatibility
The `fluent_community/on_wp_init` hook ensures compatibility with all versions of Fluent Community. You don't need to check the plugin version.
:::

---

## Complete Example ​

Here's a comprehensive example showing all available field types:

```php
add_action('fluent_community/on_wp_init', function ($app) {
    $api = \FluentCommunity\App\Functions\Utility::extender();
    
    $api->addMetaBox('my_metabox_example', [
        'section_title'   => 'My Custom Course / Space Meta Example',
        
        // Define fields
        'fields_callback' => function ($spaceOrCourse) {
            return [
                'text_field' => [
                    'label'       => 'Text Field',
                    'data_type'   => 'text',
                    'type'        => 'text',
                    'help_text'   => 'This is my example text field',
                    'placeholder' => 'Enter some text here',
                ],
                'radio_group' => [
                    'label'     => 'Radio Group',
                    'type'      => 'radio',
                    'help_text' => 'This is my example radio group',
                    'options'   => [
                        [
                            'label' => 'Option 1',
                            'value' => 'option_1'
                        ],
                        [
                            'label' => 'Option 2',
                            'value' => 'option_2'
                        ]
                    ]
                ],
                'checkboxes' => [
                    'label'     => 'Checkboxes',
                    'type'      => 'checkbox',
                    'help_text' => 'This is my example checkbox group',
                    'options'   => [
                        [
                            'label' => 'Check 1',
                            'value' => 'check_1'
                        ],
                        [
                            'label' => 'Check 2',
                            'value' => 'check_2'
                        ]
                    ]
                ],
                'date' => [
                    'label'       => 'Date Picker',
                    'type'        => 'date',
                    'help_text'   => 'This is my example date picker',
                    'placeholder' => 'Select a date',
                ],
                'color_picker' => [
                    'label'       => 'Color Picker',
                    'type'        => 'color_picker',
                    'help_text'   => 'This is my example color picker',
                    'placeholder' => 'Select a color',
                ],
                'raw_html' => [
                    'label'   => '',
                    'type'    => 'raw_html',
                    'content' => '<p>This is a raw HTML field. You can add any HTML content here.</p>',
                ],
                'multi_selects' => [
                    'label'       => 'Select Boxes',
                    'type'        => 'select',
                    'is_multiple' => true,
                    'help_text'   => 'This is my example select box',
                    'options'     => [
                        [
                            'label' => 'Hello 1',
                            'value' => 'value_1'
                        ],
                        [
                            'label' => 'Hello 2',
                            'value' => 'value_2'
                        ]
                    ],
                    'placeholder' => 'Select Some Options',
                ],
                'checkbox' => [
                    'true_value'     => 'yes',
                    'false_value'    => 'no',
                    'type'           => 'inline_checkbox',
                    'checkbox_label' => 'This is my inline checkbox label',
                ]
            ];
        },
        
        // Retrieve saved data
        'data_callback' => function ($spaceOrCourse) {
            // Get saved settings
            $settings = $spaceOrCourse->getCustomMeta('_my_metabox_example_settings', []);
            
            // Define defaults
            $defaults = [
                'text_field'    => '',
                'radio_group'   => '',
                'checkboxes'    => [],
                'date'          => '',
                'color_picker'  => '',
                'multi_selects' => [],
                'checkbox'      => 'no'
            ];
            
            // Merge with defaults
            $settings = wp_parse_args($settings, $defaults);
            
            // Return settings array with keys matching field names
            return $settings;
        },
        
        // Save data
        'save_callback' => function ($settings, $spaceOrCourse) {
            if (!is_array($settings)) {
                return;
            }
            
            // Validate and sanitize settings before saving
            // Add your validation logic here
            
            // Save settings
            $spaceOrCourse->updateCustomMeta('_my_metabox_example_settings', $settings);
        }
    ], ['course', 'space']); // Show in both Course and Space settings
});
```

---

## Available Field Types ​

### Text Field ​

```php
'text_field' => [
    'label'       => 'Text Field',
    'data_type'   => 'text',  // text, number, email, password, url
    'type'        => 'text',
    'help_text'   => 'Help text for this field',
    'placeholder' => 'Enter text here',
]
```

**Data Types:**
- `text` - Regular text input
- `number` - Numeric input
- `email` - Email input with validation
- `password` - Password input (masked)
- `url` - URL input with validation

---

### Textarea ​

```php
'textarea_field' => [
    'label'       => 'Textarea Field',
    'data_type'   => 'textarea',
    'type'        => 'text',
    'help_text'   => 'Multi-line text input',
    'placeholder' => 'Enter multiple lines',
    'rows'        => 5,  // Optional: number of rows
]
```

---

### Radio Group ​

```php
'radio_group' => [
    'label'     => 'Radio Group',
    'type'      => 'radio',
    'help_text' => 'Select one option',
    'options'   => [
        [
            'label' => 'Option 1',
            'value' => 'option_1'
        ],
        [
            'label' => 'Option 2',
            'value' => 'option_2'
        ]
    ]
]
```

---

### Checkbox Group ​

```php
'checkboxes' => [
    'label'     => 'Checkboxes',
    'type'      => 'checkbox',
    'help_text' => 'Select multiple options',
    'options'   => [
        [
            'label' => 'Check 1',
            'value' => 'check_1'
        ],
        [
            'label' => 'Check 2',
            'value' => 'check_2'
        ]
    ]
]
```

---

### Inline Checkbox ​

```php
'checkbox' => [
    'true_value'     => 'yes',
    'false_value'    => 'no',
    'type'           => 'inline_checkbox',
    'checkbox_label' => 'Enable this feature',
]
```

---

### Select Dropdown ​

**Single Select:**
```php
'single_select' => [
    'label'       => 'Select Box',
    'type'        => 'select',
    'is_multiple' => false,
    'help_text'   => 'Select one option',
    'options'     => [
        [
            'label' => 'Option 1',
            'value' => 'value_1'
        ],
        [
            'label' => 'Option 2',
            'value' => 'value_2'
        ]
    ],
    'placeholder' => 'Select an option',
]
```

**Multi-Select:**
```php
'multi_selects' => [
    'label'       => 'Select Boxes',
    'type'        => 'select',
    'is_multiple' => true,
    'help_text'   => 'Select multiple options',
    'options'     => [
        [
            'label' => 'Option 1',
            'value' => 'value_1'
        ],
        [
            'label' => 'Option 2',
            'value' => 'value_2'
        ]
    ],
    'placeholder' => 'Select options',
]
```

---

### Date Picker ​

```php
'date' => [
    'label'       => 'Date Picker',
    'type'        => 'date',
    'help_text'   => 'Select a date',
    'placeholder' => 'Select a date',
]
```

---

### Color Picker ​

```php
'color_picker' => [
    'label'       => 'Color Picker',
    'type'        => 'color_picker',
    'help_text'   => 'Select a color',
    'placeholder' => 'Select a color',
]
```

---

### Raw HTML ​

```php
'raw_html' => [
    'label'   => '',  // Optional label
    'type'    => 'raw_html',
    'content' => '<p>Custom HTML content here</p>',
]
```

---

## Callbacks Explained ​

### fields_callback ​

Defines the structure of your custom fields.

**Parameters:**
- `$spaceOrCourse` - The Space or Course model object

**Returns:** Array of field definitions

```php
'fields_callback' => function ($spaceOrCourse) {
    // You can use $spaceOrCourse to conditionally show fields
    $fields = [
        'basic_field' => [
            'label' => 'Basic Field',
            'type'  => 'text',
        ]
    ];
    
    // Conditional field based on space type
    if ($spaceOrCourse->type === 'course') {
        $fields['course_specific'] = [
            'label' => 'Course Only Field',
            'type'  => 'text',
        ];
    }
    
    return $fields;
}
```

---

### data_callback ​

Retrieves saved settings for the Space or Course.

**Parameters:**
- `$spaceOrCourse` - The Space or Course model object

**Returns:** Array of saved values

```php
'data_callback' => function ($spaceOrCourse) {
    // Retrieve saved settings
    $settings = $spaceOrCourse->getCustomMeta('_my_settings_key', []);
    
    // Define defaults
    $defaults = [
        'field1' => '',
        'field2' => 'default_value',
        'field3' => [],
    ];
    
    // Merge with defaults
    return wp_parse_args($settings, $defaults);
}
```

---

### save_callback ​

Saves the settings when the form is submitted.

**Parameters:**
- `$settings` - Array of submitted values
- `$spaceOrCourse` - The Space or Course model object

**Returns:** void

```php
'save_callback' => function ($settings, $spaceOrCourse) {
    if (!is_array($settings)) {
        return;
    }
    
    // Validate settings
    $validated = [];
    
    if (isset($settings['text_field'])) {
        $validated['text_field'] = sanitize_text_field($settings['text_field']);
    }
    
    if (isset($settings['email_field'])) {
        $validated['email_field'] = sanitize_email($settings['email_field']);
    }
    
    // Save validated settings
    $spaceOrCourse->updateCustomMeta('_my_settings_key', $validated);
}
```

---

## Retrieving Meta Values ​

### In Your Code ​

```php
// Get a Space or Course
$space = \FluentCommunity\App\Models\Space::find($spaceId);

// Retrieve custom meta
$settings = $space->getCustomMeta('_my_settings_key', []);

// Access individual values
$textValue = $settings['text_field'] ?? '';
$checkboxValue = $settings['checkbox'] ?? 'no';
```

---

## Best Practices ​

### 1. Use Unique Meta Keys ​

```php
// Good: Prefixed and unique
$spaceOrCourse->updateCustomMeta('_myplugin_settings', $settings);

// Bad: Generic key
$spaceOrCourse->updateCustomMeta('settings', $settings);
```

### 2. Always Validate and Sanitize ​

```php
'save_callback' => function ($settings, $spaceOrCourse) {
    $validated = [];
    
    // Sanitize text
    if (isset($settings['text'])) {
        $validated['text'] = sanitize_text_field($settings['text']);
    }
    
    // Validate email
    if (isset($settings['email'])) {
        $email = sanitize_email($settings['email']);
        if (is_email($email)) {
            $validated['email'] = $email;
        }
    }
    
    // Validate URL
    if (isset($settings['url'])) {
        $validated['url'] = esc_url_raw($settings['url']);
    }
    
    $spaceOrCourse->updateCustomMeta('_my_key', $validated);
}
```

### 3. Provide Defaults ​

```php
'data_callback' => function ($spaceOrCourse) {
    $settings = $spaceOrCourse->getCustomMeta('_my_key', []);
    
    $defaults = [
        'enabled'  => 'no',
        'count'    => 10,
        'options'  => [],
    ];
    
    return wp_parse_args($settings, $defaults);
}
```

### 4. Use Conditional Fields ​

```php
'fields_callback' => function ($spaceOrCourse) {
    $fields = [];
    
    // Show different fields for courses vs spaces
    if ($spaceOrCourse->type === 'course') {
        $fields['course_duration'] = [
            'label' => 'Course Duration (hours)',
            'type'  => 'text',
            'data_type' => 'number',
        ];
    } else {
        $fields['space_category'] = [
            'label' => 'Space Category',
            'type'  => 'select',
            'options' => [
                ['label' => 'General', 'value' => 'general'],
                ['label' => 'Support', 'value' => 'support'],
            ],
        ];
    }
    
    return $fields;
}
```

---

## Related Documentation ​

- [Database Models](/database/models.md) - Learn about Space and Course models
- [Code Snippets](/guides/code-snippets.md) - More practical examples
- [Filter Hooks](/hooks/filters/) - Customize plugin behavior

