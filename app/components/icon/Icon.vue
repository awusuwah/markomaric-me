<script setup lang="ts">
import type { IconProps } from "./icon";

const props = withDefaults(defineProps<IconProps>(), {
  size: "md",
  flag: false,
  class: "",
});

const iconName = computed(() => {
  if (props.icon?.includes(":")) return props.icon;

  const prefix = props.flag ? "circle-flags" : "ri";
  return `${prefix}:${props.icon}`;
});

const iconClasses = computed(() => [
  {
    "h-10 w-10": props.size === "md",
    "h-14 w-14": props.size === "lg",
  },
  props.class,
]);
</script>

<template>
  <NuxtIcon v-if="icon" :name="iconName" :class="iconClasses" />
</template>
