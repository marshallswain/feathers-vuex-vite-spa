import { createStore } from 'vuex'

import { auth } from './store.auth'
import { users } from './services/users'
import { environments } from './services/environments'

export function setupStore({ feathers }: { feathers: { apiClient: any, apiVuex: any } }) {
  const store = createStore({
    state() {
      return {}
    },
    mutations: {},
    actions: {},
    getters: {},
    modules: {},
    plugins: [
      users({ feathers }),
      environments({ feathers }),
      auth({ feathers }), // comment this out and use the following line to disable Auth0 integration.
      // feathers.apiVuex.makeAuthPlugin({ userService: 'users' })
    ],
  })
  return store
}
