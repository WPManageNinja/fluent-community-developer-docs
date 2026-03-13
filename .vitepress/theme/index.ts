import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import { theme } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'
import DocsHome from './components/DocsHome.vue'
import Mermaid from './components/Mermaid.vue'
import './custom.css'
import './openapi.css'

declare global {
  interface Window {
    __customServerUrl?: string
  }
}

let ssrOpenApiFetchInstalled = false

function importNodeModule<T>(specifier: string): Promise<T> {
  return Function(`return import(${JSON.stringify(specifier)})`)() as Promise<T>
}

function encodeBasicAuth(value: string) {
  if (!value) {
    return value
  }

  if (value.startsWith('Basic ') || value.startsWith('Bearer ')) {
    return value
  }

  if (!value.includes(':')) {
    return `Basic ${value}`
  }

  try {
    return `Basic ${btoa(value)}`
  } catch {
    return `Basic ${value}`
  }
}

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {}),
  async enhanceApp({ app, router, siteData }) {
    app.component('DocsHome', DocsHome)
    app.component('Mermaid', Mermaid)

    if (typeof window === 'undefined' && !ssrOpenApiFetchInstalled) {
      const [{ readFile }, { join }] = await Promise.all([
        importNodeModule<typeof import('node:fs/promises')>('node:fs/promises'),
        importNodeModule<typeof import('node:path')>('node:path'),
      ])
      const originalFetch = globalThis.fetch.bind(globalThis)

      globalThis.fetch = async function (
        input: Parameters<typeof fetch>[0],
        init?: Parameters<typeof fetch>[1],
      ) {
        const url =
          typeof input === 'string'
            ? input
            : input instanceof URL
              ? input.toString()
              : input instanceof Request
                ? input.url
                : String(input)

        if (url.startsWith('/openapi/public/')) {
          const filePath = join(process.cwd(), 'public', url.replace(/^\/openapi\/public\//, 'openapi/'))

          try {
            const body = await readFile(filePath, 'utf8')
            return new Response(body, {
              status: 200,
              headers: {
                'content-type': 'application/json; charset=utf-8',
              },
            })
          } catch {
            return new Response(
              JSON.stringify({
                openapi: '3.0.4',
                info: {
                  title: 'FluentCommunity API',
                  version: '1.0.0',
                },
                paths: {},
              }),
              {
                status: 404,
                headers: {
                  'content-type': 'application/json; charset=utf-8',
                },
              },
            )
          }
        }

        return originalFetch(input, init)
      }

      ssrOpenApiFetchInstalled = true
    }

    theme.enhanceApp({ app, router, siteData })

    if (typeof window === 'undefined') {
      return
    }

    let zoomedNode: HTMLElement | null = null

    const handleDiagramClick = (event: Event) => {
      const node = event.currentTarget as HTMLElement

      if (!node) {
        return
      }

      if (zoomedNode && zoomedNode !== node) {
        zoomedNode.classList.remove('zoomed')
      }

      node.classList.toggle('zoomed')
      zoomedNode = node.classList.contains('zoomed') ? node : null
      document.body.style.overflow = zoomedNode ? 'hidden' : ''
    }

    const wireMermaidZoom = () => {
      window.setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.mermaid').forEach((node) => {
          if (node.dataset.zoomReady === 'true') {
            return
          }

          node.dataset.zoomReady = 'true'
          node.title = 'Click to zoom'
          node.addEventListener('click', handleDiagramClick)
        })
      }, 250)
    }

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !zoomedNode) {
        return
      }

      zoomedNode.classList.remove('zoomed')
      zoomedNode = null
      document.body.style.overflow = ''
    })

    const installPlaygroundHelpers = () => {
      window.setTimeout(() => {
        const authSection = Array.from(document.querySelectorAll('details')).find((node) =>
          node.querySelector('summary')?.textContent?.includes('Authorization'),
        ) as HTMLDetailsElement | undefined

        if (!authSection || authSection.querySelector('[data-server-url-input]')) {
          return
        }

        const wrapper = document.createElement('div')
        wrapper.innerHTML = `
          <details data-playground-instructions>
            <summary>Interactive API Playground</summary>
            <div>
              <p>Test FluentCommunity endpoints against your own WordPress site. Requests are sent directly from your browser.</p>
              <ol>
                <li>Enter your site domain below.</li>
                <li>Use WordPress Application Passwords or a pre-encoded Basic auth header.</li>
                <li>Run mutating requests against a staging site whenever possible.</li>
              </ol>
            </div>
          </details>
          <div class="playground-server-box">
            <label for="fc-server-url">Server URL</label>
            <input id="fc-server-url" data-server-url-input type="text" placeholder="your-site.test" />
            <p data-server-url-display>https://your-site.test/wp-json/fluent-community/v2</p>
          </div>
        `

        authSection.insertBefore(wrapper, authSection.firstChild)

        const input = authSection.querySelector<HTMLInputElement>('[data-server-url-input]')
        const display = authSection.querySelector<HTMLElement>('[data-server-url-display]')
        const authInput = authSection.querySelector<HTMLInputElement>(
          'input[placeholder="Authorization"], input[aria-label="Authorization"]',
        )

        if (authInput) {
          authInput.placeholder = 'username:application_password'
        }

        const savedDomain = window.localStorage.getItem('fluentcommunity_api_server_url')
        const savedAuth = window.localStorage.getItem('fluentcommunity_api_auth_credentials')

        if (input && savedDomain) {
          input.value = savedDomain
        }

        if (authInput && savedAuth && !authInput.value) {
          authInput.value = savedAuth
        }

        const updateServerUrl = () => {
          if (!input || !display) {
            return
          }

          const host = input.value.trim() || 'your-site.test'
          const serverUrl = `https://${host}/wp-json/fluent-community/v2`
          display.textContent = serverUrl
          window.__customServerUrl = serverUrl

          if (host && host !== 'your-site.test') {
            window.localStorage.setItem('fluentcommunity_api_server_url', host)
          }
        }

        input?.addEventListener('input', updateServerUrl)
        input?.addEventListener('change', updateServerUrl)
        authInput?.addEventListener('input', () => {
          const value = authInput.value.trim()
          if (value) {
            window.localStorage.setItem('fluentcommunity_api_auth_credentials', value)
          } else {
            window.localStorage.removeItem('fluentcommunity_api_auth_credentials')
          }
        })

        updateServerUrl()
      }, 300)
    }

    const observePage = () => {
      wireMermaidZoom()
      installPlaygroundHelpers()
    }

    const originalFetch = window.fetch.bind(window)
    window.fetch = function (...args: Parameters<typeof fetch>) {
      if (window.__customServerUrl && typeof args[0] === 'string') {
        args[0] = args[0].replace(
          /^https?:\/\/[^/]+\/wp-json\/fluent-community\/v2/,
          window.__customServerUrl,
        )
      }

      if (args[1]?.headers) {
        const headers = args[1].headers

        if (headers instanceof Headers) {
          const current = headers.get('Authorization') || headers.get('authorization')
          if (current) {
            headers.set('Authorization', encodeBasicAuth(current))
          }
        } else if (typeof headers === 'object') {
          const key =
            'Authorization' in headers
              ? 'Authorization'
              : 'authorization' in headers
                ? 'authorization'
                : null

          if (key && typeof headers[key] === 'string') {
            headers[key] = encodeBasicAuth(headers[key] as string)
          }
        }
      }

      return originalFetch(...args)
    }

    observePage()

    const observer = new MutationObserver(() => {
      observePage()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    if (router) {
      router.onAfterRouteChanged = () => {
        observePage()
      }
    }
  },
} satisfies Theme
