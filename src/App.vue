<template>
  <div class="text-center text-gray-300">[App.vue]</div>
  <router-view></router-view>
  <div class="p-5 m-6">
    <h2 class="text-xl font-bold">Auth State</h2>
    <pre class="text-xs text-white bg-black">{{ authState }}</pre>
  </div>
</template>

<script lang="ts">
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    const { state } = useStore();
    const authState = computed(() => state.auth);
    return { authState };
  },
};
</script>

<style lang="postcss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @apply dark:text-gray-100;
}
.dark body {
  @apply bg-gray-800;
}
</style>