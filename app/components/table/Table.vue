<script setup lang="ts" generic="T">
import Button from "@/components/button/Button.vue";
import Icon from "@/components/icon/Icon.vue";
import TableRow from "./TableRow.vue";
import type { TableProps, TableSlots, TableColumn } from "./table";

const CONFIG_LOADING_ROWS = 15;

const slots = defineSlots<TableSlots>();
const props = withDefaults(defineProps<TableProps<T>>(), {
  data: () => [],
  loading: false,

  config: () => ({
    hoverable: false,
    cellPadding: "normal",
    noResultsText: "No data has been found matching your search criteria.",
    amountOfLoadingRows: CONFIG_LOADING_ROWS,
  }),
});

// State
const sortColumn = ref<string | null>(null);
const sortDirection = ref<"asc" | "desc" | null>(null);
const sortedData = ref<T[]>(props.data);

/**
 * Sort the data inside the table by the column and direction. It will automatically determine which column is being sorted
 * and in which direction.
 *
 * @param column - The column after which the data should be sorted.
 */
const sortData = (column: TableColumn): void => {
  // If the column is already being sorted, toggle the direction
  if (sortColumn.value === column.id) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column.id;
    sortDirection.value = "asc";
  }

  // Actually sort the data
  const sortKey = column.sortKey ?? column.id;
  const sortingData = [...props.data].sort((a, b) => {
    // Handle nested properties by splitting the key and then accessing the value
    const keys = sortKey.split(".");
    let sortValueA = a;
    let sortValueB = b;

    // Traverse the object using the keys
    for (const key of keys) {
      // @ts-ignore
      sortValueA = sortValueA[key];
      // @ts-ignore
      sortValueB = sortValueB[key];
    }

    if (sortValueA === undefined || sortValueB === undefined) return 0;

    if (sortDirection.value === "asc") {
      return String(sortValueA).toLowerCase() > String(sortValueB).toLowerCase() ? 1 : -1;
    } else {
      return String(sortValueA).toLowerCase() < String(sortValueB).toLowerCase() ? 1 : -1;
    }
  });

  // Update the actual source of data
  sortedData.value = sortingData;
};

/**
 * Determine what data should be rendered in the table based on things like the `loading` state and if the `sortedData`
 * contains any values at all.
 */
const renderData = computed((): any[] => {
  if (props.loading) return [];
  if (sortedData.value.length > 0) return sortedData.value;
  return props.data;
});

/**
 * Determine the classes which are applied to the table headers.
 *
 * @param column - The column which is being rendered.
 * @param index - The index of the column which is being rendered.
 */
const columnHeaderClasses = (column: TableColumn, index: number): Record<string, boolean> => ({
  "text-sm bg-bgr-muted leading-none p-2": true,
  "text-right": index === props.columns.length - 1,
  "text-left": index !== props.columns.length - 1,

  // Responsiveness
  "hidden sm:table-cell": column.responsive === "sm",
  "hidden md:table-cell": column.responsive === "md",
  "hidden lg:table-cell": column.responsive === "lg",
  "hidden xl:table-cell": column.responsive === "xl",
  "hidden 2xl:table-cell": column.responsive === "2xl",
});

defineExpose({
  sortColumn,
  sortDirection,
  sortedData,
  renderData,
  sortData,
});
</script>

<template>
  <div class="bg-bgr border-bor text-txt rounded-lg border shadow-sm transition-all overflow-hidden">
    <!-- Toolbar -->
    <div class="border-bor bg-bgr flex items-center justify-between border-b p-4">
      <slot name="toolbar" :table-loading="loading" />
    </div>

    <!-- Actual table -->
    <table class="relative w-full table-auto">
      <thead>
        <slot name="head" :config="config" :columns="columns" :table-loading="loading">
          <tr>
            <th v-if="!loading" v-for="(column, index) in columns" :class="[columnHeaderClasses(column, index), column.class]">
              <span class="flex items-center gap-x-1">
                {{ column.label }}

                <button v-if="column.sortable" @click="sortData(column)">
                  <Icon v-if="sortColumn === column.id && sortDirection === 'asc'" icon="sort-alphabet-asc" size="sm" />
                  <Icon v-else-if="sortColumn === column.id && sortDirection === 'desc'" icon="sort-alphabet-desc" size="sm" />
                  <Icon v-else icon="sort-alphabet-asc" size="sm" class="text-txt-muted" />
                </button>
              </span>
            </th>
          </tr>
        </slot>
      </thead>

      <!-- Table Content -->
      <tbody v-if="!loading && renderData.length > 0" class="divide-bor divide-y">
        <slot name="body" :config="config" :columns="columns" :render-data="renderData" :table-loading="loading">
          <TableRow v-for="row in renderData" :data="row" :columns="columns" :hoverable="config.hoverable" :cell-padding="config.cellPadding" />
        </slot>
      </tbody>

      <!-- No results state -->
      <tbody v-if="!loading && renderData.length === 0">
        <slot name="no-results" :config="config" :columns="columns">
          <tr>
            <td :colspan="columns.length" class="h-96">
              <div class="grid place-items-center space-y-4">
                <h4>{{ config.noResultsText }}</h4>
                <Button variant="secondary" label="Reset Filters" @click="filters?.resetFilters" />
              </div>
            </td>
          </tr>
        </slot>
      </tbody>

      <!-- Loading state -->
      <slot v-if="loading" name="loading" :config="config">
        <tfoot>
          <tr v-for="i in config.amountOfLoadingRows">
            <div class="bg-bgr m-2 h-10 rounded-md animate-pulse" />
          </tr>
        </tfoot>
      </slot>
    </table>
  </div>
</template>
