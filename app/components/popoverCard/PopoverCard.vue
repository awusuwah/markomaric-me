<script setup lang="ts">
/**
 * The classes for the popover card.
 */
const cardClasses = computed(() => ({
  "bg-blue-500": true,
}));
</script>

<template>
  <article ref="popover" :class="cardClasses"></article>
</template>
