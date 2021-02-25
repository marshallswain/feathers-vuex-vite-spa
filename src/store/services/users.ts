// src/store/services/users.js
export function users({ feathers }) {
  const { apiClient, apiVuex } = feathers
  const { BaseModel, makeServicePlugin } = apiVuex

  class User extends BaseModel {
    static modelName = 'User' // Required for $FeathersVuex plugin to work after production transpile.
    static instanceDefaults() {
      return {
        email: '',
        password: '',
      }
    }
  }
  const servicePath = 'users'
  const vuexPlugin = makeServicePlugin({
    Model: User,
    service: apiClient.service(servicePath),
    servicePath,
  })

  // Setup the client-side Feathers hooks.
  apiClient.service(servicePath).hooks({})

  return vuexPlugin
}
