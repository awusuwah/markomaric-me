<script setup lang="ts" generic="T">
import type { TableRowEmits, TableRowProps, TableColumn } from "./table";

const emit = defineEmits<TableRowEmits>();
const props = withDefaults(defineProps<TableRowProps<T>>(), {
  cellPadding: "normal",
  hoverable: false,
});

/**
 * The row has been clicked. If a link is provided, navigate to it. If no link is provided, emit an event to the parent.
 */
const rowClicked = (): void => {
  if (props.to) navigateTo(props.to);
  else emit("click", props.data);
};

/**
 * The classes which are applied to the row.
 */
const rowClasses = computed(
  (): Record<string, boolean> => ({
    "bg-bgr": true,
    "hover:bg-bgr-muted": props.hoverable,
  })
);

/**
 * Determine the classes for the row based on the props and column configuration.
 *
 * @param column - The column in which the cell is being rendered.
 */
const cellClasses = (column: TableColumn): Record<string, boolean> => ({
  "relative text-txt align-middle": true,
  "cursor-pointer": props.hoverable,

  // Cell padding
  "p-4": props.cellPadding === "normal",
  "p-2": props.cellPadding === "compact",
  "p-0": props.cellPadding === "none",

  // Responsive classes
  "hidden sm:table-cell": column.responsive === "sm",
  "hidden md:table-cell": column.responsive === "md",
  "hidden lg:table-cell": column.responsive === "lg",
  "hidden xl:table-cell": column.responsive === "xl",
  "hidden 2xl:table-cell": column.responsive === "2xl",
});
</script>

<template>
  <tr :class="rowClasses" @click.native="rowClicked">
    <td v-for="column in columns" :class="cellClasses(column)">
      <slot :name="column.id" :data="data" :column="column">
        {{ data[column.id as keyof T] }}
      </slot>
    </td>
  </tr>
</template>
