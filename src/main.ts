import 'windi.css'
import { createApp } from 'vue'
import { setupFeathers } from './feathers'
import { setupStore } from './store/store'
import { router } from './routes'
import App from './App.vue'


function setup(App) {
  const app = createApp(App)
  const feathers = setupFeathers()
  app.use(router)
  app.use(setupStore({ feathers }))

  // install all modules under `modules/`
  Object.values(import.meta.globEager('./modules/*.ts')).map(i =>
    i.install?.({ app }),
  )

  app.mount('#app')
}

setup(App)
