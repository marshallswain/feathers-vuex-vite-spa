import { models } from '@feathersjs/vuex'

export async function getEnv({ slug }) {
  const env = await models.api.Environment.get(slug)
  return env
}