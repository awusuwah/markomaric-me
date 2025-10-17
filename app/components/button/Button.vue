<script setup lang="ts">
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "brand",
  styleVariant: "solid",
});

const classes = computed(
  (): Record<string, boolean> => ({
    "px-8 py-2 rounded-sm cursor-pointer transition-colors duration-100 font-semibold": true,

    // Variants
    "bg-teal-700 hover:bg-teal-600 text-white": props.variant === "brand" && props.styleVariant === "solid",
    "border-[1px] border-teal-500 text-teal-500 hover:bg-teal-500/20": props.variant === "brand" && props.styleVariant === "outline",

    "bg-amber-700 hover:bg-amber-600 text-white": props.variant === "accent" && props.styleVariant === "solid",
    "border-[1px] border-amber-500 text-amber-500 hover:bg-amber-500/20": props.variant === "accent" && props.styleVariant === "outline",

    "bg-slate-700 hover:bg-slate-600 text-white": props.variant === "neutral" && props.styleVariant === "solid",
    "border-[1px] border-slate-500 text-slate-500 hover:bg-slate-500/20": props.variant === "neutral" && props.styleVariant === "outline",
  })
);

interface ButtonProps {
  label?: string;
  variant?: "brand" | "accent" | "neutral";
  styleVariant?: "solid" | "outline";
}
</script>

<template>
  <button :class="classes">Button</button>
</template>
