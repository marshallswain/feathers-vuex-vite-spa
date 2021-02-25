import { createRouter, createWebHistory } from 'vue-router';
import generatedRoutes from 'pages-generated'
import { setupLayouts } from 'layouts-generated'

const routes = setupLayouts(generatedRoutes)

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
