// src/store/services/environments.js
export function environments({ feathers }) {
  const { apiClient, apiVuex } = feathers;
  const { BaseModel, makeServicePlugin } = apiVuex;

  class Environment extends BaseModel {
    static modelName = "Environment"; // Required for $FeathersVuex plugin to work after production transpile.
    static instanceDefaults() {
      return {
        name: '',
        slug: '',
      };
    }
  }
  const servicePath = "environments";
  const vuexPlugin = makeServicePlugin({
    idField: 'slug',
    Model: Environment,
    service: apiClient.service(servicePath),
    servicePath,
  });

  // Setup the client-side Feathers hooks.
  apiClient.service(servicePath).hooks({});

  return vuexPlugin;
}
