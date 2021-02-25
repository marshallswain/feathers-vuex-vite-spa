import { App } from 'vue'
import { Router } from 'vue-router'

interface ModuleOptions {
  app: App,
  isClient: boolean
  router: Router
}

export type Module = ({ app, isClient, router }: ModuleOptions) => void
