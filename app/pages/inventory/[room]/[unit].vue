<script setup lang="ts">
import Button from "@/components/button/Button.vue";

const route = useRoute();
const { getItemsFromStorageUnitCategorized } = useChester();

const room = route.params.room as string;
const unit = route.params.unit as string;

/**
 * Get the items for the current storage unit.
 */
const categorizedItems = computed(() => {
  return getItemsFromStorageUnitCategorized(unit);
});
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <div v-for="category in Object.keys(categorizedItems)" class="flex flex-row gap-x-4">
      <Button v-for="item in categorizedItems[category]" :label="item.name" />
    </div>
  </div>
</template>
