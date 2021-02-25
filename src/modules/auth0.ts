import { reactive, App } from 'vue'
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js'

const domain = import.meta.env.VITE_APP1_AUTH0_DOMAIN as string
const client_id = import.meta.env.VITE_APP1_AUTH0_CLIENT_ID as string

let clientInit: null|Promise<Auth0Client> = null

export const $auth0 = reactive({
  client: null,
  state: {
    isLoading: true,
    isAuthenticated: false,
    error: null,
    user: null
  }
} as $Auth0Defaults)

export async function setupAuth0() {
  $auth0.client = await setupClient()
  const search = window.location.search
  const comingFromRedirect =
    search.includes('code=') && search.includes('state=')
  try {
    // If the user is returning to the app after auth success with Auth0.
    if (comingFromRedirect) {
      // handle the redirect and retrieve tokens
      const { appState } = await $auth0.client.handleRedirectCallback()
    }
  } catch (e) {
    $auth0.state.error = e
  } finally {
    // Initialize authentication state
    $auth0.state.isAuthenticated = await $auth0.client.isAuthenticated()
    $auth0.state.user = await $auth0.client.getUser()
    $auth0.state.isLoading = false
  }
}

function setupClient(): Promise<Auth0Client> {
  if (!clientInit) {
    clientInit = createAuth0Client({
      domain,
      client_id,
      redirect_uri: window.location.origin
      // audience: options.audience
    })
  }
  return clientInit
}

/**
 * Vue 3.0 plugin to expose the wrapper object throughout the application.
 * The Auth0 client is available as $auth0.client.
 */
export const install = ({ app }: { app: App }) => {
  app.use({
    install(app: App, options: any) {
      app.config.globalProperties.$auth0 = $auth0
      app.provide('auth0', $auth0)
    }
  })
}


/**
 * Vue 2.0 plugin to expose the wrapper object throughout the application.
 * The Auth0 client is available as $auth0.client.
 */
// export const Auth0Plugin = {
//   install(Vue, options) {
//     Vue.prototype.$auth0 = $auth0
//   }
// }

/**
 * Storage provider for the FeathersJS Authentication Client.
 * The getItem and setItem are not needed, but have to be stubbed out to prevent errors.
 */
export const storage = {
  async getItem() {
    let token

    try {
      $auth0.client = await setupClient()
      token = await $auth0.client?.getTokenSilently()
    } catch (error) {
      console.error('feathers auth0 storage error', error)
      token = ''
    }
    return token
  },
  setItem() {},
  removeItem() {}
}

interface $Auth0Defaults {
  client: Auth0Client | null
  state: {
    isLoading: boolean
    isAuthenticated: boolean
    error: Error | null
    user: any | null
  }
}
