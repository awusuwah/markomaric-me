<script setup lang="ts">
import Icon from "@/components/icon/Icon.vue";

const navigation = [
  { label: "Inventory", to: "/inventory", icon: "store-2-line" },
  { label: "Search", to: "/search", icon: "search-2-line" },
  { label: "Settings", to: "/settings", icon: "settings-2-line" },
];

const navItemClasses = computed(() => ({
  "flex items-center gap-x-2 hover:bg-blue-500/50 px-5 py-2 rounded-lg transition-colors": true,
}));

const activeNavItemClasses = computed(() => ({
  "bg-blue-500/50": true,
}));
</script>

<template>
  <header class="grid place-items-center bg-gradient-to-r from-cyan-600 to-cyan-800 text-white h-14 w-full">
    <div class="flex items-center gap-x-4 w-full lg:w-[80%] 2xl:w-[70%] h-full">
      <NuxtLink v-for="item in navigation" :to="item.to" :class="navItemClasses" active-class="bg-blue-600/70 hover:bg-blue-600/70">
        <Icon :icon="item.icon" />
        {{ item.label }}
      </NuxtLink>
    </div>
  </header>
</template>
