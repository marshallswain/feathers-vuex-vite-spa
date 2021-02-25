<template>
  <div class="flex flex-row items-center justify-center p-2 space-x-5">
    <DarkModeToggle />
    <button v-if="auth0.state.isLoading" class="button" type="button">
      Loading
      <feather-loader class="ml-2" />
    </button>
    <div v-else>
      <button
        v-if="auth0.state.isAuthenticated"
        class="button"
        type="button"
        @click="logout"
      >
        Logout
        <feather-log-out class="ml-2" />
      </button>
      <button v-else class="button" type="button" @click="login">
        Login <feather-log-in class="ml-2" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, inject } from "vue";

const auth0: any = inject("auth0");

defineProps({
  msg: String,
});

function login() {
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#loginwithredirect
  auth0.client.loginWithRedirect();
}
function logout() {
  // https://auth0.github.io/auth0-spa-js/interfaces/logoutoptions.html
  auth0.client.logout({ returnTo: window.location.origin });
}
</script>

<style lang="postcss" scoped>
.button {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg flex flex-row items-center;
}
</style>