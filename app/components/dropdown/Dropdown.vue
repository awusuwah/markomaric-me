<script setup lang="ts">
import Icon from "@/components/icon/Icon.vue";
import type { DropdownEmits, DropdownProps, DropdownOption } from "./dropdown";

const emit = defineEmits<DropdownEmits>();
const props = withDefaults(defineProps<DropdownProps>(), {
  options: () => [],
  disabled: false,
  loading: false,
  clearable: true,
  searchable: true,
  invalid: false,
  updateIcon: false,
  placeholder: "Select an Option",
});

// State
const searchQuery = ref("");
const selectedIndex = ref(-1);

// Refs
const trigger = ref<HTMLButtonElement>();
const popover = ref<HTMLDivElement>();
const search = ref<HTMLInputElement>();
const optionElements = ref<HTMLButtonElement[]>([]);

/**
 * A unique identifier for this dropdown instance.
 */
const dropdownId = `dropdown-${Math.random().toString(36).substring(2, 15)}`;
const anchorName = `--${dropdownId}`;

/**
 * Select an option. This will close the popover and update the model value.
 *
 * @param option - The option which has been selected.
 */
const selectOption = (optionValue: string) => {
  emit("update:modelValue", optionValue);
  popover.value?.hidePopover();
};

/**
 * Handle the keyboard navigation.
 *
 * @param event - The event which contains the key pressed.
 */
const handleKeyboardNavigation = (event: KeyboardEvent): void => {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      if (selectedIndex.value < filteredOptions.value.length) selectedIndex.value++;
      if (selectedIndex.value === filteredOptions.value.length) selectedIndex.value = 0;
      scrollSelectedIntoView();
      break;

    case "ArrowUp":
      event.preventDefault();
      if (selectedIndex.value === -1 || selectedIndex.value === 0) selectedIndex.value = filteredOptions.value.length;
      if (selectedIndex.value > 0) selectedIndex.value--;
      scrollSelectedIntoView();
      break;

    case "Enter":
      event.preventDefault();
      if (selectedIndex.value >= 0 && selectedIndex.value < filteredOptions.value.length) {
        selectOption(filteredOptions.value[selectedIndex.value].value);
      }
      break;

    default:
      break;
  }
};

/**
 * When the popover is toggled, enable or disable the keydown event listeners.
 *
 * @param event - The event which contains the new information about the popover status.
 */
const handlePopoverToggle = (event: Event): void => {
  if ((event as any).newState === "open") {
    // The popover has been opened
    selectedIndex.value = -1;
    document.addEventListener("keydown", handleKeyboardNavigation);
  } else {
    // The popover has been closed
    searchQuery.value = "";
    document.removeEventListener("keydown", handleKeyboardNavigation);
  }
};

/**
 * Scroll the selected option into view.
 */
const scrollSelectedIntoView = (): void => {
  if (selectedIndex.value >= 0 && optionElements.value[selectedIndex.value]) {
    optionElements.value[selectedIndex.value].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

/**
 * Get the options which match the current search query. If no search query is provided, all options are
 * returned.
 */
const filteredOptions = computed((): DropdownOption[] => {
  if (!searchQuery.value || searchQuery.value.trim() === "") return props.options;

  // Filter the options based on the search query
  const query = searchQuery.value.toLowerCase();
  return props.options.filter((option) => {
    const label = option.label.toLowerCase();
    const value = option.value.toLowerCase();
    return label.includes(query) || value.includes(query);
  });
});

/**
 * Determine the icon which should be shown in the trigger.
 */
const triggerIcon = computed((): string | undefined => {
  // If the `update-icon` prop is enabled, we need to show the icon of the selected option if available
  if (props.updateIcon) {
    const currentOption = props.options?.find((option) => option.value === props.modelValue);
    if (currentOption?.icon) return currentOption.icon;
  }

  if (props.icon) return props.icon;
  return undefined;
});

/**
 * The width of the dropdown trigger.
 */
const triggerWidth = computed((): string => {
  return trigger.value?.clientWidth + "px";
});

/**
 * The classes which are applied to the wrapper element.
 */
const triggerClasses = computed(
  (): Record<string, boolean> => ({
    "anchor relative w-full h-10 rounded-md border": true,
    "focus:outline-none focus:outline-thm focus:outline-2 focus:outline-offset-2": true,

    "cursor-not-allowed opacity-50": props.disabled,

    "border-bgr-300": !props.invalid,
    "border-err": props.invalid,
  })
);

/**
 * The classes which are applied to the popover element.
 */
const popoverClasses = computed(
  (): Record<string, boolean> => ({
    "popover fixed inset-auto m-0 max-h-96 shadow-md shadow-bgr-100": true,
    "border border-bgr-300 bg-bgr text-txt rounded-md divide-y divide-bgr-300": true,
  })
);

/**
 * The styles for the positioning of the popover based on the `trigger` element.
 */
const popoverPositionStyles = computed(
  (): Record<string, string> => ({
    top: "anchor(bottom)",
    left: "anchor(left)",
    "margin-block-start": "5px",
  })
);

const optionClasses = (option: DropdownOption, index: number): Record<string, boolean> => ({
  "flex items-center gap-2 w-full h-10 px-2 text-left": true,

  "bg-bgr-200 text-thm": index === selectedIndex.value,
  "hover:bg-bgr-200 hover:text-thm": !option.disabled,

  "opacity-50 cursor-not-allowed": option.disabled ?? false,
});

/**
 * Set the selected index to the first option when the `search query` is empty.
 */
watch(searchQuery, (newQuery, oldQuery) => {
  if (newQuery !== oldQuery) {
    selectedIndex.value = 0;
    scrollSelectedIntoView();
  }
});

/**
 * When the component is unmounted, remove the keydown event listener.
 */
onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyboardNavigation);
});

defineExpose({
  openDropdown: popover.value?.showPopover,
  closeDropdown: popover.value?.hidePopover,
});
</script>

<template>
  <div v-if="!loading" class="w-full">
    <button ref="trigger" :disabled="disabled" :class="triggerClasses" :popovertarget="dropdownId">
      <label v-if="label" class="text-txt bg-bgr absolute left-4 top-[-11px] px-2 text-sm">{{ label }}</label>
      <span v-if="errorMessage && invalid" class="text-err bg-bgr absolute bottom-[-10px] left-4 px-2 text-sm">{{ errorMessage }}</span>

      <!-- Content of the Button -->
      <div class="flex h-full">
        <div class="flex h-full flex-1 items-center gap-2 px-2">
          <Icon v-if="icon" :icon="triggerIcon" />
          <span v-if="modelValue">{{ options?.find((option) => option.value === modelValue)?.label }}</span>
          <span v-else class="text-txt-dim">{{ placeholder }}</span>
        </div>
        <div class="grid h-full w-10 place-items-center">
          <button v-if="clearable && modelValue" class="grid place-items-center" tabindex="-1" @click.prevent="emit('update:modelValue', '')">
            <Icon icon="close-line" class="text-txt-dim" size="md" />
          </button>
          <Icon v-else icon="arrow-down-s-line" class="text-txt-dim" size="md" />
        </div>
      </div>
    </button>

    <!-- The options -->
    <div ref="popover" :id="dropdownId" :class="popoverClasses" :style="popoverPositionStyles" popover @beforetoggle="handlePopoverToggle">
      <!-- Search field -->
      <div v-if="searchable" class="text-txt relative flex items-center gap-x-2 p-2">
        <div class="relative flex w-full items-center">
          <Icon icon="search-line" class="text-txt-400 absolute left-3 h-5 w-5" />
          <input
            ref="search"
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="bg-bgr border-bgr-300 text-txt focus:ring-thm w-full rounded border p-2 pl-10 focus:outline-none focus:ring-2"
            autofocus
          />
          <Icon v-if="searchQuery" icon="close-line" class="text-txt-400 absolute right-3 h-5 w-5 cursor-pointer" @click.stop="searchQuery = ''" />
        </div>
      </div>

      <!-- Actual options -->
      <button
        v-for="(option, index) in filteredOptions"
        :ref="
          (el) => {
            if (el) optionElements[index] = el as HTMLButtonElement;
          }
        "
        :class="optionClasses(option, index)"
        @click="!option.disabled && selectOption(option.value)"
      >
        <!-- Icon -->
        <div v-if="option.icon" class="grid h-full w-6 place-items-center">
          <Icon :icon="option.icon" size="md" />
        </div>

        <!-- Content + Suffix -->
        <div class="flex flex-1 gap-4">
          <span class="flex-1">{{ option.label }}</span>
          <span v-if="option.suffix" class="text-right">{{ option.suffix }}</span>
        </div>
      </button>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="skeleton h-10 w-full"></div>
</template>

<style scoped>
.anchor {
  anchor-name: v-bind(anchorName);
}

.popover {
  position-anchor: v-bind(anchorName);
  position-try-fallbacks: flip-block;
  min-width: v-bind(triggerWidth);

  opacity: 0;
  transition: display 0.1s, opacity 0.1s ease-in, transform 0.1s ease-out;
  transition-behavior: allow-discrete;
  transform: translateY(-0.25rem);

  &:popover-open {
    opacity: 1;
    transform: translateY(0);
    @starting-style {
      opacity: 0;
      transform: translateY(-0.25rem);
    }
  }
}
</style>
