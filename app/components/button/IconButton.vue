<script setup lang="ts">
import Icon from "@/components/icon/Icon.vue";

const emit = defineEmits<IconButtonEmits>();
const props = withDefaults(defineProps<IconButtonProps>(), {
  modelValue: "idle",
  variant: "brand",
  noShake: false,
  disabled: false,
  ghost: false,
  circular: false,
});

const shaking = ref(false);

const buttonClasses = computed(
  (): Record<string, boolean> => ({
    "grid place-items-center h-10 w-10 transition-colors select-none": true,
    "focus:outline-none focus:ring-2": true,

    "h-10 w-10": props.size === "md",
    "h-14 w-14": props.size === "lg",

    "animate-shake": shaking.value && !props.noShake,
    "cursor-pointer": props.modelValue === "idle" && !props.disabled,
    "cursor-not-allowed opacity-50": props.disabled,
    "rounded-md": !props.circular,
    "rounded-full": props.circular,

    // Variants
    "bg-cyan-700 hover:bg-cyan-600 text-white": props.variant === "brand" && !props.ghost,
    "bg-cyan-700/70 hover:bg-cyan-600/70 text-white": props.variant === "brand" && props.ghost,

    "bg-amber-700 hover:bg-amber-600 text-white": props.variant === "accent" && !props.ghost,
    "bg-amber-700/70 hover:bg-amber-600/70 text-white": props.variant === "accent" && props.ghost,

    "bg-slate-700 hover:bg-slate-600 text-white": props.variant === "neutral" && !props.ghost,
    "bg-slate-700/70 hover:bg-slate-600/70 text-white": props.variant === "neutral" && props.ghost,
  })
);

watch(
  () => props.modelValue,
  (state) => {
    if (state === "error") shaking.value = true;
    if (state === "error" || state === "success") {
      setTimeout(() => {
        emit("update:modelValue", "idle");
        shaking.value = false;
      }, 1250);
    }
  }
);

interface IconButtonProps {
  modelValue?: ButtonState;
  variant?: "brand" | "accent" | "neutral";
  icon: string;
  size?: "md" | "lg";
  noShake?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  circular?: boolean;
}

interface IconButtonEmits {
  (e: "update:modelValue", value: ButtonState): void;
}
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled || modelValue !== 'idle'">
    <Transition name="fade-content">
      <Icon v-if="modelValue === 'idle'" :icon="icon" />
    </Transition>

    <Transition name="fade-content">
      <Icon v-if="modelValue === 'loading'" icon="loader-4-line" class="animate-spin" />
    </Transition>

    <Transition name="fade-content">
      <Icon v-if="modelValue === 'success'" icon="check-line" />
    </Transition>

    <Transition name="fade-content">
      <Icon v-if="modelValue === 'error'" icon="close-line" />
    </Transition>
  </button>
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

.animate-shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-0.75rem);
  }
  50% {
    transform: translateX(0.75rem);
  }
  75% {
    transform: translateX(-0.75rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
