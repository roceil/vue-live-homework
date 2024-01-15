<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import axios from "axios";
import ProductsTable from "@/components/ProductsTable.vue";
import ProductDetail from "../components/ProductDetail.vue";

const tableTitle = ["產品名稱", "原價", "售價", "是否啟用", "查看細節"];

// ====== 產品列表 ======
export type Product = {
  id: string;
  title: string;
  category: string;
  content: string;
  description: string;
  imageUrl: string;
  imagesUrl: string[];
  is_enabled: number;
  origin_price: number;
  price: number;
  unit: string;
  num: number;
};

const products = ref<Product[]>([]);

const API_URL = import.meta.env.VITE_API_URL as string;

const token = computed(() => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return token;
});

const headers = computed(() => {
  return {
    Authorization: token.value,
  };
});

const fetch_products = async () => {
  try {
    const res = await axios.get(API_URL, {
      headers: headers.value,
    });
    products.value = res.data.products;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetch_products();
});

// ====== 產品細節 ======
const product_detail = ref<Product | undefined>();

const selectedProduct = (id: string) => {
  if (!products.value) return;
  product_detail.value = products.value.find((product) => product.id === id);
};
</script>

<template>
  <div class="ProductsView">
    <div class="max-w-7xl mx-auto py-6 px-4 flex space-x-7">
      <!-- 產品總表 -->
      <div class="w-2/3">
        <h2 class="text-3xl font-bold text-gray-900 block">產品列表</h2>
        <ProductsTable
          :table-title="tableTitle"
          :products="products"
          :selected-product="selectedProduct"
        />
      </div>

      <!-- 單一產品細節 -->
      <ProductDetail :product_detail="product_detail" />
    </div>
  </div>
</template>
