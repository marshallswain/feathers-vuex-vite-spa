# @feathersjs/vuex SPA App Template

This is a PWA template for FeathersVuex and Vite, inspired by [Vitesse](https://github.com/antfu/vitesse) by @antfu.  The majority of the plugins, etc., are the same, so refer to the [vitesse](https://github.com/antfu/vitesse) project for more information.

## Features

- [`@feathersjs/vuex`](https://vuex.feathersjs.com) ready for your config. Bring your own FeathersJS API.

- [Auth0] authentication

- ⚡️ [Vue 3](https://github.com/vuejs/vue-next), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness

- 🗂 [File based routing](./src/pages)

- 📦 [Components auto importing](./src/components)

- 📑 [Layout system](./src/layouts)

- 📲 [PWA](https://github.com/antfu/vite-plugin-pwa)

- 🎨 [Windi CSS](https://github.com/windicss/windicss) - on-demand Tailwind CSS with speed

- 😃 [Use icons from any icon sets, with no compromise](./src/components)

- 🌍 [I18n ready](./locales)

- 🗒 [Markdown Support](https://github.com/antfu/vite-plugin-md)

- 🌙 Dark Mode Support

- 🔥 Use the [new `<script setup>` style](https://github.com/vuejs/rfcs/pull/227)

- 🖨 Server-side generation (SSG) via [vite-ssg](https://github.com/antfu/vite-ssg)

- 🦾 TypeScript, of course

- ☁️ Deploy on Netlify, zero-config

## Setting up Auth0 Authentication

To get up and running quickly, this template comes with Auth0 SPA login support. Auth0's free account generously provides up to 7000 active users per month.  This app template takes care of the client side of auth.  Take a look at https://github.com/morphatic/feathers-auth0-strategy for turnkey Auth0 authentication on the Feathers API server.

### Setting Up Auth

The below steps are required to get it to work. To disable it, see the next section.

1. Go to https://manage.auth0.com and create an Auth0 app.  Set the **Application Type** to `Single Page Application`.  Make note of the domain and client secret.  Add `http://localhost:3000` (or the host assigned by Vite upon startup) to the following places in the Auth0 application admin page.  (If these settings are not correct, you will see 403 errors upon loading the page.)
  - Allowed Callback URLs
  - Allowed Logout URLs
  - Allowed Web Origins
2. Rename the environment variables in `src/auth0.ts` to match your environment.  Use the domain and client secret from step 1.

If you are using VS Code, you may need to use the "Reload Window" command after you configure environment variables.

### Disable Auth

