<script setup lang="ts">
defineProps<{ error: { statusCode: number; statusMessage: string; message: string } }>();
</script>

<template>
  <div class="w-screen h-screen grid place-items-center">
    <section class="w-1/3 bg-bgr-light rounded-2xl p-12 flex flex-col gap-4">
      <h1 class="text-3xl font-bold mb-2">{{ error.statusCode }}</h1>
      <p class="text-lg text-gray-400">{{ error.statusMessage }}</p>
      <NuxtLink to="/" class="text-blue-500 hover:underline">Go back to the home page</NuxtLink>
    </section>
  </div>
</template>
