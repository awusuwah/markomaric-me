<script setup lang="ts">
import Icon from "@/components/icon/Icon.vue";
import type { ButtonEmits, ButtonProps } from "./button";

const CONFIG_CONFIRMATION_TIME = 1000;

const emit = defineEmits<ButtonEmits>();
const props = withDefaults(defineProps<ButtonProps>(), {
  modelValue: "idle",
  variant: "primary",
});

/**
 * The classes which are applied to the button.
 */
const buttonClasses = computed(
  (): Record<string, boolean> => ({
    "relative inline-flex items-center justify-center rounded-md font-medium text-sm px-4 py-2 cursor-pointer transition-colors": true,
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring": true,
    "disabled:cursor-not-allowed disabled:opacity-50": true,

    // Variants
    "bg-pri text-pri-contrast hover:not-disabled:bg-pri-hover active:not-disabled:bg-pri-active": props.variant === "primary",
    "bg-sec text-sec-contrast hover:not-disabled:bg-sec-hover active:not-disabled:bg-sec-active": props.variant === "secondary",
    "bg-neu text-neu-contrast hover:not-disabled:bg-neu-hover active:not-disabled:bg-neu-active": props.variant === "neutral",
    "bg-des text-des-contrast hover:not-disabled:bg-des-hover active:not-disabled:bg-des-active": props.variant === "destructive",
  })
);

/**
 * Watch for changes in the button's state (model-value). When the state switches to either `success` or `error`, a
 * timeout is set to switch the state back to `idle` after a short amount of time.
 */
watch(
  () => props.modelValue,
  (state) => {
    if (state === "error" || state === "success") {
      setTimeout(() => {
        emit("update:modelValue", "idle");
      }, CONFIG_CONFIRMATION_TIME);
    }
  },
  { immediate: true }
);
</script>

<template>
  <component :is="to ? 'NuxtLink' : 'button'" :to="to" :disabled="disabled || modelValue !== 'idle'" :class="buttonClasses">
    <!-- Keep a copy of the element in the DOM to make sure the button's width doesn't change when the state changes -->
    <span class="invisible">
      <div class="flex flex-row items-center justify-center gap-x-2">
        <Icon v-if="startIcon" :icon="startIcon" size="sm" />
        <span>{{ label }}</span>
        <Icon v-if="endIcon" :icon="endIcon" size="sm" />
      </div>
    </span>

    <Transition name="fade-content">
      <Icon v-if="modelValue === 'error'" icon="check-line" size="md" class="absolute" />
    </Transition>

    <Transition name="fade-content">
      <Icon v-if="modelValue === 'success'" icon="check-line" size="md" class="absolute" />
    </Transition>

    <Transition name="fade-content">
      <div v-if="modelValue === 'idle'" class="absolute flex flex-row items-center justify-center gap-x-2">
        <Icon v-if="startIcon" :icon="startIcon" size="sm" />
        <span v-if="label" class="shrink">{{ label }}</span>
        <Icon v-if="endIcon" :icon="endIcon" size="sm" />
      </div>
    </Transition>
  </component>
</template>

<style scoped>
.fade-content-enter-active,
.fade-content-leave-active {
  transition: all 0.25s ease;
}

.fade-content-enter-from,
.fade-content-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
