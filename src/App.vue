<template>
  <div class="text-center text-gray-300">[App.vue]</div>
  <router-view></router-view>
</template>

<script lang="ts">
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
// import { inject } from "vue";

export default {
  name: "App",
  setup() {
    return { hi: "hi" };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>