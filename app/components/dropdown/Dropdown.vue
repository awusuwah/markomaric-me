<script setup lang="ts">
import Icon from "@/components/icon/Icon.vue";
import type { DropdownEmits, DropdownProps, DropdownOption } from "./dropdown";

const emit = defineEmits<DropdownEmits>();
const props = withDefaults(defineProps<DropdownProps>(), {
  options: () => [],
  disabled: false,
  loading: false,
  clearable: false,
  searchable: true,
  dirty: false,
  invalid: false,
  updateIcon: false,
});

// State
const open = ref(false);
const searchQuery = ref("");
const selectedIndex = ref(-1);

// Refs
const trigger = ref<HTMLButtonElement>();
const popover = ref<HTMLDivElement>();
const search = ref<HTMLInputElement>();
const optionElements = ref<HTMLButtonElement[]>([]);

/**
 * Generate a unique id for the dropdown and an anchor name for the popover functionality.
 */
const dropdownId = `dropdown-${useId()}`;
const anchorName = `--${dropdownId}`;

/**
 * Select an option. This will close the popover and update the model value.
 *
 * @param option - The option to select.
 */
const selectOption = (optionValue: string): void => {
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
      scrollSelectedOptionIntoView();
      break;

    case "ArrowUp":
      event.preventDefault();
      if (selectedIndex.value === -1 || selectedIndex.value === 0) selectedIndex.value = filteredOptions.value.length;
      if (selectedIndex.value > 0) selectedIndex.value--;
      scrollSelectedOptionIntoView();
      break;

    case "Enter":
      event.preventDefault();
      if (selectedIndex.value >= 0 && selectedIndex.value < filteredOptions.value.length) {
        const option = filteredOptions.value[selectedIndex.value]?.value;
        if (option) selectOption(option);
      }
      break;

    case "Home":
      event.preventDefault();
      selectedIndex.value = 0;
      scrollSelectedOptionIntoView();
      break;

    case "End":
      event.preventDefault();
      selectedIndex.value = filteredOptions.value.length;
      scrollSelectedOptionIntoView();
      break;

    case "Escape":
      event.preventDefault();
      popover.value?.hidePopover();
      trigger.value?.focus();
      break;

    case "Tab":
      popover.value?.hidePopover();
      break;

    default:
      break;
  }
};

/**
 * When the popover is toggled, enable or disable the keyboard event listeners.
 *
 * @param event - The event which contains the popover state.
 */
const handlePopoverToggle = (event: Event): void => {
  if ((event as any).newState === "open") {
    // The popover has been opened
    open.value = true;
    selectedIndex.value = 0;
    document.addEventListener("keydown", handleKeyboardNavigation);
  } else {
    // The popover has been closed
    open.value = false;
    searchQuery.value = "";
    document.removeEventListener("keydown", handleKeyboardNavigation);
  }
};

/**
 * Scroll the selected option into view.
 */
const scrollSelectedOptionIntoView = (): void => {
  if (selectedIndex.value >= 0 && optionElements.value[selectedIndex.value]) {
    optionElements.value[selectedIndex.value]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

/**
 * Get the options filtered by the search query. If no search query is provided, all options are returned.
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
 * Determine the icon which should be displayed in the trigger. If the `updateIcon` prop is true, the icon will be
 * updated to the icon of the selected option. Otherwise, the icon will be the one provided in the `icon` prop.
 */
const triggerIcon = computed((): string | undefined => {
  if (props.updateIcon) {
    const currentOption = props.options?.find((option) => option.value === props.modelValue);
    if (currentOption?.icon) return currentOption.icon;
  }

  if (props.icon) return props.icon;
  return undefined;
});

/**
 * The width of the dropdown trigger. This makes sure that the popover is always the same width as the trigger.
 */
const triggerWidth = computed((): string => trigger.value?.clientWidth + "px");

/**
 * The classes which are applied to the dropdown trigger.
 */
const triggerClasses = computed(
  (): Record<string, boolean> => ({
    "anchor relative w-full h-14 rounded-md bg-bgr text-txt border": true,
    "focus:outline-foc focus:outline-2 focus:outline-offset-2": true,
    "disabled:cursor-not-allowed disabled:opacity-50": true,

    "border-dng": props.invalid,
    "border-bor": !props.invalid,
  })
);

/**
 * The classes which are applied to the dropdown popover.
 */
const popoverClasses = computed(
  (): Record<string, boolean> => ({
    "popover fixed inset-auto m-0 max-h-96": true,
    "border border-bor rounded-md divide-y divide-bor": true,
  })
);

/**
 * The styles which are applied to the dropdown popover.
 */
const popoverStyles = computed(
  (): Record<string, string> => ({
    top: "anchor(bottom)",
    left: "anchor(left)",
    "margin-block-start": "5px",
  })
);

/**
 * The classes which are applied to the label of the dropdown trigger.
 */
const labelClasses = computed(
  (): Record<string, boolean> => ({
    "flex items-center gap-x-1 absolute text-ellipsis overflow-hidden whitespace-no-wrap select-none transition-all": true,
    "left-4 top-2 text-sm": props.modelValue !== "" && !props.icon,
    "left-4 top-4": props.modelValue === "" && !props.icon,
    "left-0 top-2 text-sm": props.modelValue !== "" && !!props.icon,
    "left-0 top-4": props.modelValue === "" && !!props.icon,
    "text-txt": props.modelValue === "",
    "text-txt-muted": props.modelValue !== "",
  })
);

/**
 * The classes which are applied to the options of the dropdown popover.
 *
 * @param index - The index of the option which is being rendered.
 */
const optionClasses = (index: number): Record<string, boolean> => ({
  "flex items-center gap-2 w-full h-10 px-2 text-left hover:bg-bgr-muted transition-colors focus:outline-none": true,
  "bg-bgr-muted text-txt-muted": index !== selectedIndex.value,
  "bg-foc text-txt": index === selectedIndex.value,
});

/**
 * Set the selected index back to the first option when the search query is empty.
 */
watch(searchQuery, (newQuery, oldQuery) => {
  if (newQuery === oldQuery) return;
  selectedIndex.value = 0;
  scrollSelectedOptionIntoView();
});

/**
 * When the dropdown is unmounted, make sure that the keyboard event listeners are removed.
 */
onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyboardNavigation);
});

defineExpose({
  openDropdown: () => popover.value?.showPopover,
  closeDropdown: () => popover.value?.hidePopover,
});
</script>

<template>
  <div v-if="!loading" class="w-full">
    <button
      ref="trigger"
      :disabled="disabled"
      :class="triggerClasses"
      :popovertarget="dropdownId"
      role="combobox"
      :aria-controls="dropdownId"
      :aria-expanded="open"
      :aria-haspopup="true"
      :aria-activedescendant="selectedIndex >= 0 ? `${dropdownId}-option-${selectedIndex}` : undefined"
      :aria-invalid="invalid"
    >
      <div class="flex h-full">
        <!-- Icon -->
        <slot name="prefix">
          <div v-if="icon" class="grid place-items-center w-10 h-full text-txt-muted">
            <Icon :icon="triggerIcon" size="md" />
          </div>
        </slot>

        <!-- Content -->
        <div class="relative flex flex-1 flex-col justify-end">
          <label v-if="label" :class="labelClasses">{{ label }}</label>
          <span class="mb-1.5 text-left" :class="{ 'ml-0': !!icon, 'ml-4': !icon }">
            {{ options?.find((option: DropdownOption) => option.value === modelValue)?.label }}
          </span>
        </div>

        <!-- Suffix -->
        <div class="grid place-items-center w-10 h-full text-txt-muted">
          <button v-if="clearable && modelValue" class="grid place-items-center" tabindex="-1" @click.prevent="emit('update:modelValue', '')">
            <Icon icon="close-line" size="md" />
          </button>

          <Icon v-else :icon="open ? 'arrow-up-s-line' : 'arrow-down-s-line'" size="md" class="text-txt-sec" />
        </div>
      </div>
    </button>

    <!-- The options -->
    <div
      ref="popover"
      :id="dropdownId"
      :class="popoverClasses"
      :style="popoverStyles"
      role="listbox"
      :aria-label="`${label} options`"
      popover
      @beforetoggle="handlePopoverToggle"
    >
      <!-- Search field -->
      <div v-if="searchable" class="relative flex items-center gap-x-2 p-2 bg-bgr">
        <div class="relative flex items-center w-full">
          <Icon icon="search-line" class="absolute left-3 w-5 h-5 text-txt-muted" :aria-hidden="true" />
          <input
            ref="search"
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="border border-bor w-full rounded p-2 pl-10 text-txt placeholder-txt-ter focus:outline-focus focus:outline-offset-2 focus:outline-2"
            autofocus
            :aria-label="`Search ${label} options`"
          />
          <Icon
            v-if="searchQuery"
            icon="close-line"
            class="absolute right-3 h-5 w-5 text-txt-sec cursor-pointer"
            :aria-hidden="true"
            @click.stop="searchQuery = ''"
          />
        </div>
      </div>

      <!-- The actual options -->
      <button
        v-for="(option, index) in filteredOptions"
        :ref="(el) => {
        if (el) optionElements[index] = el as HTMLButtonElement;
        }"
        :class="optionClasses(index)"
        tabindex="-1"
        role="option"
        :aria-selected="option.value === modelValue"
        :id="`${dropdownId}-option-${index}`"
        @click="selectOption(option.value)"
      >
        <slot name="option" :option="option" :index="index">
          <!-- Option Icon -->
          <div v-if="option.icon" class="grid place-items-center w-6 h-full">
            <Icon :icon="option.icon" size="md" />
          </div>

          <!-- Option Content + Suffix -->
          <div class="flex flex-1 gap-4">
            <span class="flex-1">{{ option.label }}</span>
            <span v-if="option.suffix" class="text-right">{{ option.suffix }}</span>
          </div>
        </slot>
      </button>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="h-14 w-full bg-brd rounded-md animate-pulse" role="alert" aria-busy="true" :aria-label="`Loading ${label} options`" />
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
  transform: display 0.1s, opacity 0.1s ease-in, transform 0.1s ease-out;
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
