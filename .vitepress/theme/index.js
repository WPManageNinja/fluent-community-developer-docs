// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import DocStatusBanner from './components/DocStatusBanner.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register global components
    app.component('DocStatusBanner', DocStatusBanner)
  }
}

