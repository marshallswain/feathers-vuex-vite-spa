import { createStore } from 'vuex'

import { users } from './services/users'
import { environments } from './services/environments'

export function setupStore({ feathers }) {
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
      feathers.apiVuex.makeAuthPlugin({ userService: 'users' }),
    ],
  })
  return store
}
