<script setup lang="ts">
import Icon from "@/components/icon/Icon.vue";

const emit = defineEmits<TextEmits>();
const props = withDefaults(defineProps<TextProps>(), {
  variant: "default",
});

const handleInputChange = (event: any): void => {
  emit("update:model-value", event.target?.value as string);
};

const wrapperClasses = computed(
  (): Record<string, boolean> => ({
    "rounded-md w-full h-14 flex flex-row p-1": true,
    "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2": true,

    "bg-bgr-dark focus-within:outline-cyan-600": props.variant === "default",
    "bg-emerald-900/30 focus-within:outline-emerald-600": props.variant === "success",
    "bg-red-900/30 focus-within:outline-red-600": props.variant === "danger",
    "bg-yellow-900/30 focus-within:outline-yellow-600": props.variant === "warning",
    "bg-blue-900/30 focus-within:outline-blue-600": props.variant === "info",
  })
);

interface TextProps {
  modelValue: string;
  label: string;
  placeholder?: string;
  icon?: string;
  variant?: "default" | "success" | "danger" | "warning" | "info";
  errorMessage?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week";
}

interface TextEmits {
  (e: "update:model-value", value: string): void;
}
</script>

<template>
  <div :class="wrapperClasses">
    <div v-if="icon" class="grid place-items-center h-12 aspect-square">
      <Icon :icon="icon" class="text-3xl text-txt-muted" />
    </div>
    <div class="flex flex-col w-full px-1 relative">
      <label class="text-txt-muted text-sm absolute top-1 left-2 flex gap-2 items-center justify-between w-full">
        {{ label }}
        <span v-if="errorMessage" class="text-red-700 text-xs pr-5">{{ errorMessage }}</span>
      </label>
      <input :value="modelValue" :placeholder="placeholder" :type="type" class="pl-1 pt-4 h-12 text-txt focus:outline-none" @input="handleInputChange" />
    </div>
  </div>
</template>
