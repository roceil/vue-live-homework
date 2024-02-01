<script lang="ts" setup>
type ModelItem = {
  title: string
  type: string
  name: string
  placeholder: string
  value: string | number | boolean | string[] | null
}

defineProps({
  model_items: {
    type: Array<ModelItem>,
  },
})
</script>

<template>
  <div class="addProductForm">
    <form class="flex flex-col space-y-3">
      <label
        v-for="item in model_items"
        :key="item.name"
        class="w-full flex items-center space-x-3 justify-start"
      >
        <span class="text-gray-700 inline-block flex-shrink-0 font-bold"
          >{{ item.title }}：</span
        >
        <!-- 如果是 checkbox 要額外設定 -->
        <template v-if="item.type === 'checkbox'">
          <input
            :type="item.type"
            :name="item.name"
            :placeholder="item.placeholder"
            v-model="item.value"
            class="border border-blue-500 rounded w-[20px] h-[20px]"
          />
        </template>

        <!-- 一般樣式 -->
        <template v-else>
          <input
            :type="item.type"
            :name="item.name"
            :placeholder="item.placeholder"
            v-model="item.value"
            class="border text-black border-blue-500 rounded px-3 py-2 w-full"
          />
        </template>
      </label>
    </form>
  </div>
</template>
