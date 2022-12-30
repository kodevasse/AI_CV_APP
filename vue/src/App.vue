<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <header>
    <NavBar />
  </header>
  <div class="min-w-full">
    <RouterView />
  </div>
</template>

<style>
html {
  overflow-x: hidden;
  margin-right: calc(-1 * (100vw - 100%));
}
</style>
