export interface ButtonProps {
  modelValue?: ButtonState;
  label?: string;
  variant?: "primary" | "secondary" | "destructive" | "neutral";
  to?: string;
  startIcon?: string;
  endIcon?: string;
  disabled?: boolean;
}

export interface ButtonEmits {
  (e: "update:modelValue", value: ButtonState): void;
}

export type ButtonState = "idle" | "loading" | "success" | "error";
