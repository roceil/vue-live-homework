<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { usePaginationStore } from '@/stores/pagination'

const paginationStore = usePaginationStore()
</script>

<template>
  <div class="container">
    <ul class="flex">
      <li class="ring-1 ring-blue-500">
        <button
          @click="paginationStore.click_last_page"
          :disabled="paginationStore.is_last_page_btn_disable"
          class="py-2 px-3 disabled:bg-gray-300"
        >
          &lt;
        </button>
      </li>
      <li
        class="ring-1 ring-blue-500"
        v-for="num in paginationStore.total_page"
        :key="num"
      >
        <button
          @click="paginationStore.click_page(num)"
          class="py-2 px-3 hover:bg-blue-500 hover:text-white"
          :class="paginationStore.current_page_bg(num)"
        >
          {{ num }}
        </button>
      </li>
      <li class="ring-1 ring-blue-500">
        <button
          @click="paginationStore.click_next_page"
          :disabled="paginationStore.is_next_page_btn_disable"
          class="py-2 px-3 disabled:bg-gray-300"
        >
          &gt;
        </button>
      </li>
    </ul>
  </div>
</template>
