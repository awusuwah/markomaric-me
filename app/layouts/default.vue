<script setup lang="ts">
import Header from "@/components/header/Header.vue";
</script>

<template>
  <Header />

  <main class="p-4 text-txt">
    <slot />
  </main>
</template>
