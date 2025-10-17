<script setup lang="ts">
import Button from "@/components/button/Button.vue";
</script>

<template>
  <div class="p-4">
    <div class="flex flex-col gap-4">
      <div class="flex gap-4">
        <Button variant="brand" style-variant="solid" />
        <Button variant="brand" style-variant="outline" />
      </div>
      <div class="flex gap-4">
        <Button variant="neutral" style-variant="solid" />
        <Button variant="neutral" style-variant="outline" />
      </div>
      <div class="flex gap-4">
        <Button variant="accent" style-variant="solid" />
        <Button variant="accent" style-variant="outline" />
      </div>
    </div>
  </div>
</template>
