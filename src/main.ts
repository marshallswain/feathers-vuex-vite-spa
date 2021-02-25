import 'windi.css'
import { setupAuth0, storage } from '~/modules/auth0'
import { createApp, App as AppType } from 'vue'
import { setupFeathers } from './feathers'
import { setupStore } from './store/store'
import { router } from './routes'
import App from './App.vue'

setupAuth0()

const app = createApp(App)
const feathers = setupFeathers({ storage })
app.use(router)
app.use(setupStore({ feathers }))

// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).map(i =>
  i.install?.({ app, isClient: true, router }),
)

app.mount('#app')
