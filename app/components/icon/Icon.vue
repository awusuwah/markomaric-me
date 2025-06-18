<script setup lang="ts">
import type { IconProps } from "./icon";

const props = withDefaults(defineProps<IconProps>(), {
  size: "md",
  class: "",
});

/**
 * Determine the actual icon name. Icons without a collection prefix are assumed to be from the default collection
 * called `Remix Icons` or `ri:` for short.
 */
const iconName = computed((): string => {
  if (!props.icon?.includes(":")) {
    return `ri:${props.icon}`;
  }

  return props.icon;
});

/**
 * The classes which are applied to the icon element.
 */
const iconClasses = computed((): (string | Record<string, boolean | string>)[] => [
  {
    "h-4 w-4": props.size === "sm",
    "h-6 w-6": props.size === "md",
    "h-8 w-8": props.size === "lg",
  },
  props.class,
]);
</script>

<template>
  <NuxtIcon :name="iconName" :class="iconClasses" />
</template>
