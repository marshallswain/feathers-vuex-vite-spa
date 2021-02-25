import { watch } from 'vue'
import { $auth0 } from '~/modules/auth0'
import { models } from '@feathersjs/vuex'
import { router } from '../routes'

// called when the store is initialized
export function auth({ feathers }: { feathers: { apiClient: any, apiVuex: any } }) {
  const { apiClient } = feathers
  /**
   * This authentication strategy assumes that you have the FeathersJS API server setup
   * with the Feathers-Auth0-Strategy: https://github.com/morphatic/feathers-auth0-strategy
   */
  return function authPlugin(store: any) {
    store.registerModule('auth', {
      namespaced: true,
      state: {
        isLoading: true,
        isAuthenticated: false,
        accessToken: null, // The auth0 and API accessToken
        payload: null, // accessToken payload
        user: null, // FeathersJS User record
        auth0User: null, // user record on Auth0
        error: null,
      },
      mutations: {
        setAuthDataFromApi(state: any, response: { user: any }) {
          if (response.user) {
            response.user = new models.api.User(response.user)
          }
          Object.assign(state, response)
        },
        setAuth0User(state: any, auth0User: any) {
          Object.assign(state, { auth0User })
        },
        setAuthenticated(state: { isAuthenticated: boolean; isLoading: boolean }) {
          state.isAuthenticated = true
          state.isLoading = false
        },
        setLoaded(state: { isLoading: boolean }) {
          state.isLoading = false
        },
        setError(state: { error: boolean }) {
          state.error = true
        },
      },
      actions: {
        async authenticate({ commit, dispatch }: any, authData: any) {
          try {
            const response = await apiClient.authenticate(authData)

            commit('setAuthDataFromApi', response)
          } catch (error) {
            console.log('error during Feathers API Authentication', error)
            store.commit('auth/setError')
          }
        },
      }
    })

    // Clean up Auth0 code and state from the URL after login redirect.
    const search = window.location.search
    const cameFromRedirect = search.includes('code=') && search.includes('state=')
    if (cameFromRedirect) {
      router.replace({ path: '/' })
    }

    // Send user to home page if there's a problem with auth.
    watch(
      () => $auth0.state.error,
      error => {
        if (error?.message === 'Invalid state') {
          router.replace({ path: '/' })
          window.location.reload()
        }
      }
    )

    // Once Auth0 state finishes loading, authenticate the API server user is logged in.
    watch(
      () => $auth0.state.isLoading,
      async isLoading => {
        if (!isLoading) {
          if ($auth0.state.user) {
            const accessToken = await apiClient.authentication.getAccessToken()
            await store.dispatch('auth/authenticate', {
              strategy: 'auth0',
              accessToken
            })
            store.commit('auth/setAuth0User', $auth0.state.user)
            store.commit('auth/setAuthenticated')

            console.log('logged in')
          }
          store.commit('auth/setLoaded')
        }
      }
    )
  }
}