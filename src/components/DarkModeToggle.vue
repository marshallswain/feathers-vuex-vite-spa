<template>
  <button
    type="button"
    class="flex flex-col items-center justify-center text-lg text-gray-500 transition-colors duration-200 rounded-full hover:text-gray-400 focus:outline-none focus:shadow-outline"
    @click="isDark = !isDark"
  >
    <feather-sun v-if="isDark" />
    <feather-moon v-else />
  </button>
</template>

<script setup lang="ts">
import { isDark } from "~/logics";
</script>
