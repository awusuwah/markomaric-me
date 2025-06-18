<script setup lang="ts">
import Dropdown from "@/components/dropdown/Dropdown.vue";
import type { DropdownOption } from "@/components/dropdown/dropdown";

const country = ref("");
const countries = [
  { value: "hr", label: "Croatia", icon: "circle-flags:hr" },
  { value: "us", label: "United States", icon: "circle-flags:us" },
  { value: "de", label: "Germany", icon: "circle-flags:de" },
  { value: "fr", label: "France", icon: "circle-flags:fr" },
  { value: "it", label: "Italy", icon: "circle-flags:it" },
  { value: "es", label: "Spain", icon: "circle-flags:es" },
  { value: "nl", label: "Netherlands", icon: "circle-flags:nl" },
  { value: "be", label: "Belgium", icon: "circle-flags:be" },
  { value: "at", label: "Austria", icon: "circle-flags:at" },
  { value: "ch", label: "Switzerland", icon: "circle-flags:ch" },
  { value: "pl", label: "Poland", icon: "circle-flags:pl" },
  { value: "ru", label: "Russia", icon: "circle-flags:ru" },
  { value: "ua", label: "Ukraine", icon: "circle-flags:ua" },
  { value: "cz", label: "Czech Republic", icon: "circle-flags:cz" },
  { value: "sk", label: "Slovakia", icon: "circle-flags:sk" },
  { value: "se", label: "Sweden", icon: "circle-flags:se" },
  { value: "no", label: "Norway", icon: "circle-flags:no" },
  { value: "dk", label: "Denmark", icon: "circle-flags:dk" },
  { value: "fi", label: "Finland", icon: "circle-flags:fi" },
  { value: "is", label: "Iceland", icon: "circle-flags:is" },
  { value: "ie", label: "Ireland", icon: "circle-flags:ie" },
  { value: "gb", label: "United Kingdom", icon: "circle-flags:gb" },
  { value: "ca", label: "Canada", icon: "circle-flags:ca" },
  { value: "au", label: "Australia", icon: "circle-flags:au" },
  { value: "nz", label: "New Zealand", icon: "circle-flags:nz" },
  { value: "sg", label: "Singapore", icon: "circle-flags:sg" },
  { value: "hk", label: "Hong Kong", icon: "circle-flags:hk" },
  { value: "tw", label: "Taiwan", icon: "circle-flags:tw" },
  { value: "jp", label: "Japan", icon: "circle-flags:jp" },
] satisfies DropdownOption[];
</script>

<template>
  <div class="p-4">
    <div class="flex gap-x-8">
      <Dropdown v-model="country" :options="countries" label="Country" icon="global-line" update-icon />
      <Dropdown v-model="country" :options="countries" label="Country" icon="global-line" update-icon />
      <Dropdown v-model="country" :options="countries" label="Country" icon="global-line" update-icon />
      <Dropdown v-model="country" :options="countries" label="Country" update-icon invalid />
      <Dropdown v-model="country" :options="countries" label="Country" update-icon invalid />
    </div>

    <div class="flex gap-x-8 mt-16">
      <Dropdown v-model="country" :options="countries" label="Country" icon="global-line" update-icon loading />
      <Dropdown v-model="country" :options="countries" label="Country" icon="global-line" update-icon loading />
      <Dropdown v-model="country" :options="countries" label="Country" icon="global-line" update-icon loading />
      <Dropdown v-model="country" :options="countries" label="Country" icon="global-line" update-icon loading />
      <Dropdown v-model="country" :options="countries" label="Country" icon="global-line" update-icon loading />
    </div>
  </div>
</template>
