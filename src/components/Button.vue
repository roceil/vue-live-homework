<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  bg_color: {
    type: String,
    default: 'bg-blue-500',
  },
  click_event: {
    type: Function,
  },
})

// 生成 hover 狀態的背景類別名
const hoverBgColor = computed(() => {
  const color = props.bg_color
  const colorName = color.split('-')[1]
  return `hover:bg-${colorName}-600`
})
</script>

<template>
  <div class="Button">
    <button
      class="text-white px-4 py-2 rounded focus:outline-none"
      :class="[props.bg_color, hoverBgColor]"
      @click="props.click_event"
    >
      {{ text }}
    </button>
  </div>
</template>
