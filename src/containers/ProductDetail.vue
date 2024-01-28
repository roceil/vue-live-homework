<script lang="ts" setup>
import type { PropType } from "vue";
import type { Product } from "../views/ProductsView.vue";
defineProps({
  product_detail: {
    type: Object as PropType<Product>,
    required: true,
  },
});
</script>

<template>
  <div class="ProductView mt-4 w-1/3">
    <h3 class="text-xl font-semibold text-gray-900">單一產品細節</h3>

    <!-- 產品細節 -->
    <div v-if="product_detail" class="bg-white shadow overflow-hidden mt-4">
      <img
        :src="product_detail.imageUrl"
        :alt="product_detail.title"
        class="rounded-t-lg"
      />
      <div class="px-4 py-5 sm:px-6 flex space-x-3">
        <h4 class="text-lg leading-6 font-medium text-gray-900">
          {{ product_detail.title }}
        </h4>
        <p class="text-sm font-bold px-2 py-1 rounded bg-blue-500 text-white">
          {{ product_detail.category }}
        </p>
      </div>

      <!-- 庫存表格 -->
      <div class="border-t border-gray-200">
        <dl>
          <!-- 原價 -->
          <div class="bg-gray-50 px-4 py-5">
            <dt class="text-sm font-medium text-gray-500">原價</dt>
            <dd class="mt-1 text-sm text-gray-900">
              NT$ {{ product_detail.origin_price }}
            </dd>
          </div>

          <!-- 售價 -->
          <div class="bg-white px-4 py-5">
            <dt class="text-sm font-medium text-gray-500">售價</dt>
            <dd class="mt-1 text-sm text-gray-900">NT$ {{ product_detail.price }}</dd>
          </div>

          <!-- 庫存 -->
          <div class="bg-gray-50 px-4 py-5">
            <dt class="text-sm font-medium text-gray-500">是否啟用</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <span v-if="product_detail.is_enabled" class="text-green-500">啟用</span>
              <span v-else>未啟用</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- 預設文字 -->
    <p v-else class="text-sm text-gray-500">請選擇一個商品查看</p>
  </div>
</template>
