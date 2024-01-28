<script lang="ts" setup>

defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="ModelContent">
    <h2 class="text-2xl font-bold mb-4 text-center">{{ title }}</h2>
    <slot></slot>
  </div>
</template>

