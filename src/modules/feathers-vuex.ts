import { FeathersVuex } from '@feathersjs/vuex'
import { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(FeathersVuex)
}
