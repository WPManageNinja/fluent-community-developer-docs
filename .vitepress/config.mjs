import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Fluent Community Developer Docs",
    description: "Complete developer documentation for Fluent Community plugin",
    ignoreDeadLinks: true,
    srcExclude: ['**/user-docs/**'],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        siteTitle: '',
        logo: {
            light: '/images/dev-logo-light.png',
            dark: '/images/dev-logo-dark.png'
        },

        nav: [
            {text: 'Home', link: '/'},
            {text: 'Getting Started', link: '/getting-started'},
            {
                text: 'Database',
                items: [
                    {text: 'Database Schema', link: '/database/schema'},
                    {text: 'Database Models', link: '/database/models'},
                    {text: 'Model Relationships', link: '/database/relationships'},
                    {text: 'Query Builder', link: '/database/query-builder'}
                ]
            },
            {
                text: 'Developer Hooks',
                items: [
                    {text: 'Action Hooks', link: '/hooks/actions'},
                    {text: 'Filter Hooks', link: '/hooks/filters'},
                    {text: 'Helper Functions', link: '/helpers/'}
                ]
            },
            {text: 'REST API', link: '/rest-api/'},
            {
                text: 'Guides',
                items: [
                    {text: 'Code Snippets', link: '/guides/code-snippets'},
                    {text: 'Meta Settings API', link: '/guides/meta-settings-api'},
                    {text: 'Cloud Storage', link: '/guides/cloud-storage/'},
                    {text: 'Incoming Webhooks', link: '/guides/incoming-webhooks'},
                    {text: 'Menu Customization', link: '/guides/menu-customization'},
                    {text: 'Theme Compatibility', link: '/guides/theme-compatibility'}
                ]
            },
            {
                text: 'Deployment',
                items: [
                    {text: 'Server Requirements', link: '/deployment/server-requirements'},
                    {text: 'Performance Optimization', link: '/deployment/performance-optimization'},
                    {text: 'Benchmarks', link: '/deployment/benchmarks'}
                ]
            }
        ],

        sidebar: {
            '/getting-started': [
                {
                    text: 'Getting Started',
                    items: [
                        {text: 'Overview', link: '/getting-started'}
                    ]
                }
            ],
            '/database/': [
                {
                    text: 'Database',
                    items: [
                        {text: 'Database Schema', link: '/database/schema'},
                        {text: 'Database Models', link: '/database/models'},
                        {text: 'Model Relationships', link: '/database/relationships'},
                        {text: 'Query Builder', link: '/database/query-builder'}
                    ]
                }
            ],
            '/helpers/': [
                {
                    text: 'Helper Functions',
                    items: [
                        {text: 'Overview', link: '/helpers/'},
                        {text: 'Helper Class Reference', link: '/helpers/helper-class'}
                    ]
                }
            ],
            '/guides/': [
                {
                    text: 'Guides',
                    items: [
                        {text: 'Code Snippets & Recipes', link: '/guides/code-snippets'},
                        {text: 'Meta Settings API', link: '/guides/meta-settings-api'},
                        {
                            text: 'Cloud Storage',
                            collapsed: false,
                            items: [
                                {text: 'Overview', link: '/guides/cloud-storage/'},
                                {text: 'Cloudflare R2', link: '/guides/cloud-storage/cloudflare-r2'},
                                {text: 'Amazon S3', link: '/guides/cloud-storage/amazon-s3'},
                                {text: 'BunnyCDN', link: '/guides/cloud-storage/bunnycdn'}
                            ]
                        },
                        {text: 'Incoming Webhooks', link: '/guides/incoming-webhooks'},
                        {text: 'Menu Customization', link: '/guides/menu-customization'},
                        {text: 'Theme Compatibility', link: '/guides/theme-compatibility'}
                    ]
                }
            ],
            '/deployment/': [
                {
                    text: 'Deployment & Performance',
                    items: [
                        {text: 'Server Requirements', link: '/deployment/server-requirements'},
                        {text: 'Performance Optimization', link: '/deployment/performance-optimization'},
                        {text: 'Benchmarks', link: '/deployment/benchmarks'}
                    ]
                }
            ],
            '/hooks/': [
                {
                    text: 'Developer Hooks',
                    items: [
                        {
                            text: 'Action Hooks',
                            collapsed: false,
                            items: [
                                {text: 'Action Hooks Overview', link: '/hooks/actions'},
                                {text: 'Feeds & Posts', link: '/hooks/actions/feeds'},
                                {text: 'Comments', link: '/hooks/actions/comments'},
                                {text: 'Spaces', link: '/hooks/actions/spaces'},
                                {text: 'Users & Members', link: '/hooks/actions/users'},
                                {text: 'Authentication', link: '/hooks/actions/authentication'},
                                {text: 'Media', link: '/hooks/actions/media'},
                                {text: 'Reactions', link: '/hooks/actions/reactions'},
                                {text: 'Notifications', link: '/hooks/actions/notifications'},
                                {text: 'Courses', link: '/hooks/actions/courses'},
                                {text: 'Lessons', link: '/hooks/actions/lessons'},
                                {text: 'Integrations', link: '/hooks/actions/integrations'},
                                {text: 'Portal & UI', link: '/hooks/actions/portal'},
                                {text: 'Activities', link: '/hooks/actions/activities'},
                                {text: 'Managers', link: '/hooks/actions/managers'},
                                {text: 'Moderation', link: '/hooks/actions/moderation'},
                                {text: 'Followers', link: '/hooks/actions/followers'}
                            ]
                        },
                        {
                            text: 'Filter Hooks',
                            collapsed: false,
                            items: [
                                {text: 'Filter Hooks Overview', link: '/hooks/filters'},
                                {text: 'Feeds & Posts', link: '/hooks/filters/feeds'},
                                {text: 'Comments', link: '/hooks/filters/comments'},
                                {text: 'Spaces', link: '/hooks/filters/spaces'},
                                {text: 'Users & Members', link: '/hooks/filters/users'},
                                {text: 'Authentication', link: '/hooks/filters/authentication'},
                                {text: 'Media', link: '/hooks/filters/media'},
                                {text: 'Reactions', link: '/hooks/filters/reactions'},
                                {text: 'Notifications', link: '/hooks/filters/notifications'},
                                {text: 'Courses', link: '/hooks/filters/courses'},
                                {text: 'Portal & UI', link: '/hooks/filters/portal'},
                                {text: 'Activities', link: '/hooks/filters/activities'},
                                {text: 'Managers', link: '/hooks/filters/managers'},
                                {text: 'Moderation', link: '/hooks/filters/moderation'},
                                {text: 'Followers', link: '/hooks/filters/followers'}
                            ]
                        }
                    ]
                }
            ],
            '/rest-api/': [
                {
                    text: 'Getting Started',
                    items: [
                        {text: 'API Overview', link: '/rest-api/'},
                        {text: 'Error Handling', link: '/rest-api/errors'},
                        {text: 'Code Examples', link: '/rest-api/examples'}
                    ]
                },
                {
                    text: 'REST API Resources',
                    items: [
                        {
                            text: 'Core Resources',
                            items: [
                                {text: 'Feeds', link: '/rest-api/feeds'},
                                {text: 'Comments', link: '/rest-api/comments'},
                                {text: 'Spaces', link: '/rest-api/spaces'},
                                {text: 'Space Groups', link: '/rest-api/space-groups'},
                                {text: 'Space Members', link: '/rest-api/space-members'},
                                {text: 'Profiles', link: '/rest-api/profiles'},
                                {text: 'Members', link: '/rest-api/members'},
                                {text: 'Activities', link: '/rest-api/activities'}
                            ]
                        },
                        {
                            text: 'Engagement',
                            items: [
                                {text: 'Reactions', link: '/rest-api/reactions'},
                                {text: 'Bookmarks', link: '/rest-api/bookmarks'},
                                {text: 'Notifications', link: '/rest-api/notifications'}
                            ]
                        },
                        {
                            text: 'Learning & Courses',
                            items: [
                                {text: 'Courses', link: '/rest-api/courses'},
                                {text: 'Lessons', link: '/rest-api/lessons'},
                                {text: 'Course Progress', link: '/rest-api/course-progress'},
                                {text: 'Quizzes', link: '/rest-api/quizzes'}
                            ]
                        },
                        {
                            text: 'Media & Settings',
                            items: [
                                {text: 'Media', link: '/rest-api/media'},
                                {text: 'Giphy', link: '/rest-api/giphy'},
                                {text: 'Settings', link: '/rest-api/settings'},
                                {text: 'Migrations', link: '/rest-api/migrations'}
                            ]
                        },
                        {
                            text: 'Pro Features',
                            items: [
                                {text: 'Followers', link: '/rest-api/followers'},
                                {text: 'Analytics', link: '/rest-api/analytics'},
                                {text: 'Moderation', link: '/rest-api/moderation'},
                                {text: 'Topics', link: '/rest-api/topics'},
                                {text: 'Webhooks', link: '/rest-api/webhooks'},
                                {text: 'Scheduled Posts', link: '/rest-api/scheduled-posts'},
                                {text: 'Community Managers', link: '/rest-api/managers'},
                                {text: 'Leaderboard', link: '/rest-api/leaderboard'}
                            ]
                        }
                    ]
                }
            ]
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/WPManageNinja/fluent-community'}
        ],

        footer: {
            message: 'Fluent Community developer documentation',
            copyright: 'Copyright © 2025 Fluent Community'
        },

        search: {
            provider: 'local'
        },

        outline: {
            level: [2, 3],
            label: 'On this page'
        },
        editLink: {
            pattern: 'https://github.com/WPManageNinja/fluent-community-developer-docs/edit/master/:path'
        }
    },
    head: [
        ['meta', { name: 'og:image', content: 'https://fluentcommunity.co/wp-content/uploads/2025/11/fluent-com-dev-docs.png' }],
        ['link', { rel: 'icon', type: 'image/webp', href: '/favicon/favicon.webp' }]
    ]
})
