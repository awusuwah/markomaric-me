<script setup lang="ts">
const slots = defineSlots<ToastSlots>();
const props = withDefaults(defineProps<ToastProps>(), {
  variant: "success",
});

const toastIcon = computed((): string => {
  if (props.icon) return props.icon;

  switch (props.variant) {
    case "success":
      return "check-line";
    case "danger":
      return "close-line";
    case "warning":
      return "alert-line";
    case "info":
      return "info-i";
    default:
      return "check-line";
  }
});

const wrapperClasses = computed(
  (): Record<string, boolean> => ({
    "relative flex flex-row items-center gap-2 w-96 min-h-20 rounded-2xl p-2 overflow-hidden": true,

    // Variants
    "bg-emerald-500 text-white": props.variant === "success",
    "bg-red-500 text-white": props.variant === "danger",
    "bg-yellow-600 text-white": props.variant === "warning",
    "bg-blue-500 text-white": props.variant === "info",
  })
);

const bubbleClasses = computed(
  (): Record<string, boolean> => ({
    "bg-emerald-700 text-white": props.variant === "success",
    "bg-red-800 text-white": props.variant === "danger",
    "bg-yellow-800 text-white": props.variant === "warning",
    "bg-blue-800 text-white": props.variant === "info",
  })
);

interface ToastProps {
  title: string;
  message: string;
  icon?: string;
  variant?: "success" | "danger" | "warning" | "info";
}

interface ToastSlots {
  default(props: { title: string; message: string }): any;
}
</script>

<template>
  <div class="relative">
    <div :class="wrapperClasses">
      <div :class="bubbleClasses" class="absolute -bottom-24 -left-12 w-32 h-32 rounded-full"></div>
      <div :class="bubbleClasses" class="absolute left-11 bottom-7 w-2 h-2 rounded-full"></div>
      <div :class="bubbleClasses" class="absolute left-2 bottom-6 w-3 h-3 rounded-full"></div>
      <div :class="bubbleClasses" class="absolute left-5 bottom-12 w-1 h-1 rounded-full"></div>
      <div :class="bubbleClasses" class="absolute left-10 bottom-11 w-1 h-1 rounded-full"></div>
      <div :class="bubbleClasses" class="absolute top-4 left-12 w-1 h-1 rounded-full"></div>

      <div class="flex flex-col ml-14">
        <slot :title="title" :message="message">
          <h3 class="text-lg font-bold">{{ title }}</h3>
          <p class="text-sm">{{ message }}</p>
        </slot>
      </div>
    </div>

    <div :class="bubbleClasses" class="absolute -top-3 left-3 flex items-center gap-2 rounded-full p-2">
      <Icon :icon="toastIcon" />
    </div>
  </div>
</template>
