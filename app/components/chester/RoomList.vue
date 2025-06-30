<script setup lang="ts">
const { warehouses } = useChester();

const openRooms = ref<string[]>([]);
const openStorageUnits = ref<string[]>([]);

/**
 * Toggle a single room to be open or closed.
 *
 * @param roomId - The ID of the room to toggle between open and closed.
 */
const toggleRoom = (roomId: string): void => {
  if (openRooms.value.includes(roomId)) {
    openRooms.value = openRooms.value.filter((id) => id !== roomId);
  } else {
    openRooms.value.push(roomId);
  }
};

/**
 * Toggle a single storage unit to be open or closed.
 *
 * @param storageUnitId - The ID of the storage unit to toggle between open and closed.
 */
const toggleStorageUnit = (storageUnitId: string): void => {
  if (openStorageUnits.value.includes(storageUnitId)) {
    openStorageUnits.value = openStorageUnits.value.filter((id) => id !== storageUnitId);
  } else {
    openStorageUnits.value.push(storageUnitId);
  }
};
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div v-for="room in warehouses" class="border border-bor p-4 rounded-lg">
      <!-- Room header (Closed state) -->
      <button class="flex items-center w-full justify-between cursor-pointer" @click="toggleRoom(room.id)">
        <h5 class="flex items-center gap-x-2">
          <Icon :icon="room.icon" size="md" class="text-blue-500" />
          {{ room.name }}
        </h5>

        <Icon :icon="openRooms.includes(room.id) ? 'arrow-up-s-line' : 'arrow-down-s-line'" />
      </button>

      <!-- Room content -->
      <div v-if="openRooms.includes(room.id)" class="p-2 text-left">
        <div class="flex flex-row gap-x-2">
          <div v-for="unit in room.storageUnits" class="border border-bor rounded-md p-2">
            <NuxtLink class="h6 flex items-center gap-x-2" :to="`/inventory/${room.id}/${unit.id}`">
              <Icon icon="box-1-line" size="sm" class="text-blue-500" />
              {{ unit.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <pre>
    {{ openRooms }}
  </pre>
</template>
