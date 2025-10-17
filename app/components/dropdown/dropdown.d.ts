export interface DropdownProps {
  modelValue: string;
  icon?: string;
  label?: string;
  options?: DropdownOption[];
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  invalid?: boolean;
  errorMessage?: string;

  // Config
  placeholder?: string;
  updateIcon?: boolean;
}

export interface DropdownEmits {
  (e: "update:modelValue", value: string): void;
}

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
  suffix?: string;
  disabled?: boolean;
}
