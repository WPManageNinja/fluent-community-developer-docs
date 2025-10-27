import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fluent Community",
  description: "Complete developer documentation for Fluent Community plugin",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'Developer Docs',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'REST API', link: '/rest-api/' },
      { text: 'Getting Started', link: '/rest-api/getting-started' }
    ],

    sidebar: {
      '/rest-api/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'REST API Overview', link: '/rest-api/' },
            { text: 'Quick Reference', link: '/rest-api/quick-reference' },
            { text: 'Authentication', link: '/rest-api/authentication' },
            { text: 'Getting Started', link: '/rest-api/getting-started' }
          ]
        },
        {
          text: 'REST API Resources',
          items: [
            {
              text: 'Core Resources',
              items: [
                { text: 'Feeds', link: '/rest-api/feeds' },
                { text: 'Comments', link: '/rest-api/comments' },
                { text: 'Spaces', link: '/rest-api/spaces' },
                { text: 'Space Groups', link: '/rest-api/space-groups' },
                { text: 'Space Members', link: '/rest-api/space-members' },
                { text: 'Profiles', link: '/rest-api/profiles' },
                { text: 'Members', link: '/rest-api/members' },
                { text: 'Activities', link: '/rest-api/activities' }
              ]
            },
            {
              text: 'Engagement',
              items: [
                { text: 'Reactions', link: '/rest-api/reactions' },
                { text: 'Bookmarks', link: '/rest-api/bookmarks' },
                { text: 'Notifications', link: '/rest-api/notifications' }
              ]
            },
            {
              text: 'Learning & Courses',
              items: [
                { text: 'Courses', link: '/rest-api/courses' },
                { text: 'Lessons', link: '/rest-api/lessons' },
                { text: 'Course Progress', link: '/rest-api/course-progress' },
                { text: 'Quizzes [PRO]', link: '/rest-api/quizzes' }
              ]
            },
            {
              text: 'Media & Settings',
              items: [
                { text: 'Media', link: '/rest-api/media' },
                { text: 'Giphy [PRO]', link: '/rest-api/giphy' },
                { text: 'Settings', link: '/rest-api/settings' },
                { text: 'Migrations', link: '/rest-api/migrations' }
              ]
            },
            {
              text: 'Pro Features',
              items: [
                { text: 'Followers', link: '/rest-api/followers' },
                { text: 'Analytics', link: '/rest-api/analytics' },
                { text: 'Moderation', link: '/rest-api/moderation' },
                { text: 'Topics', link: '/rest-api/topics' },
                { text: 'Webhooks', link: '/rest-api/webhooks' },
                { text: 'Scheduled Posts', link: '/rest-api/scheduled-posts' },
                { text: 'Community Managers', link: '/rest-api/managers' },
                { text: 'Leaderboard', link: '/rest-api/leaderboard' }
              ]
            }
          ]
        },
        {
          text: 'Guides & Reference',
          items: [
            { text: 'Error Handling', link: '/rest-api/errors' },
            { text: 'Code Examples', link: '/rest-api/examples' },
            { text: 'Changelog', link: '/rest-api/changelog' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/WPManageNinja/fluent-community' }
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
    }
  }
})
