<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import Table from "@/components/table/Table.vue";
import type { DropdownOption } from "@/components/dropdown/dropdown";
import type { TableColumn } from "@/components/table/table";

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

const columns = [
  { id: "name", label: "Fullname", sortable: true },
  { id: "email", label: "Email Address", sortable: true },
  { id: "department", label: "Department", sortable: true },
  { id: "country", label: "Country", sortable: true },
  { id: "remote", label: "Remote", sortable: true },
  { id: "startDate", label: "Start Date", sortable: true },
] satisfies TableColumn[];
const tableData = [
  {
    name: "Marko Marić",
    email: "marko.maric@hotelplan.com",
    department: "HDEG",
    country: "ch",
    remote: false,
    startDate: "14.08.2014",
  },
  {
    name: "Cameron Weijmer",
    email: "cameron.weijmer@hotelplan.com",
    department: "HIDDI",
    country: "ch",
    remote: false,
    startDate: "14.08.2014",
  },
  {
    name: "John Doe",
    email: "john.doe@hotelplan.com",
    department: "HDEG",
    country: "ch",
    remote: true,
    startDate: "14.08.2014",
  },
  {
    name: "Jane Doe",
    email: "jane.doe@hotelplan.com",
    department: "SIEN",
    country: "ch",
    remote: true,
    startDate: "14.08.2014",
  },
] satisfies Employee[];

interface Employee {
  name: string;
  email: string;
  department: string;
  country: string;
  remote: boolean;
  startDate: string;
}
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

    <div class="flex gap-x-8 mt-16">
      <Button label="Primary" start-icon="user-line" variant="primary" />
      <Button label="Primary" start-icon="user-line" variant="primary" disabled />
      <Button label="Secondary" start-icon="user-line" variant="secondary" />
      <Button label="Secondary" start-icon="user-line" variant="secondary" disabled />
      <Button label="Neutral" start-icon="user-line" variant="neutral" />
      <Button label="Neutral" start-icon="user-line" variant="neutral" disabled />
      <Button label="Destructive" start-icon="user-line" variant="destructive" />
      <Button label="Destructive" start-icon="user-line" variant="destructive" disabled />
    </div>

    <div class="mt-16">
      <Table :data="tableData" :columns="columns" :config="{ cellPadding: 'normal', hoverable: true }">
        <template #toolbar>
          <h4>Employees</h4>

          <Button variant="primary" label="Add Employee" start-icon="user-add-line" />
        </template>
      </Table>
    </div>
  </div>
</template>
