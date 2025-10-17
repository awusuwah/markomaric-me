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
    "h-3 w-3": props.size === "xs",
    "h-4 w-4": props.size === "sm",
    "h-6 w-6": props.size === "md",
    "h-8 w-8": props.size === "lg",
  },
  props.class,
]);
</script>

<template>
  <NuxtIcon v-if="icon" :name="iconName" :class="iconClasses" />
</template>
