<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Product } from '@/views/ProductsView.vue'
import Button from '@/components/Button.vue'

defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
  selectedProduct: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['edit_product', 'delete_product'])

const tableTitle = ['產品名稱', '原價', '售價', '是否啟用', '查看細節', '編輯']

// ====== 編輯商品 ======
const edit_product = (product: Product, product_id: string) => {
  emit('edit_product', product, product_id)
}

// ====== 刪除商品 ======
const delete_product = (product_id: string) => {
  emit('delete_product', product_id)
}
</script>

<template>
  <div class="ProductsTable">
    <div class="flex flex-col mt-3 h-full justify-between">
      <table class="w-full text-left items-center justify-center">
        <!-- 表格標題 -->
        <thead class="border-b-2 border-black mb4">
          <tr class="text-gray-600">
            <th
              class="px-4 py-2"
              v-for="title in tableTitle"
              :key="title"
            >
              <template v-if="title === '編輯'">
                <div class="text-center">
                  {{ title }}
                </div>
              </template>

              <template v-else-if="title === '查看細節'">
                <div class="text-center">
                  {{ title }}
                </div>
              </template>

              <template v-else>
                {{ title }}
              </template>
            </th>
          </tr>
        </thead>

        <!-- 表格內容 -->
        <tbody>
          <tr
            class="bg-gray-100"
            v-for="product in products"
            :key="product.id"
          >
            <td class="px-4 py-2">{{ product.title }}</td>
            <td class="px-4 py-2">NT$ {{ product.origin_price }}</td>
            <td class="px-4 py-2">NT$ {{ product.price }}</td>
            <td class="px-4 py-2">
              <span
                v-if="product.is_enabled"
                class="text-green-500"
                >啟用</span
              >
              <span v-else>未啟用</span>
            </td>
            <td class="px-4 py-2">
              <button
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                @click="selectedProduct(product.id)"
              >
                查看細節
              </button>
            </td>

            <td class="px-4 py-2 flex space-x-2">
              <Button
                text="編輯"
                @click="edit_product(product, product.id)"
              />
              <Button
                text="刪除"
                bg_color="bg-red-500"
                @click="delete_product(product.id)"
              />
            </td>
          </tr>
        </tbody>

        <!-- 共計文字 -->
        <p class="text-sm text-gray-600 mt-3">
          目前有
          <span class="font-medium text-gray-800">{{ products?.length }}</span>
          項產品
        </p>
      </table>
    </div>
  </div>
</template>
