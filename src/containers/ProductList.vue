<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type Product, useCartStore } from '@/stores/cart'
import axios from 'axios'

const tableHeadItem = [
  { name: '圖片', class: 'w-[100px] text-white text-center' },
  { name: '商品名稱', class: 'text-white text-center' },
  { name: '價格', class: 'text-white' },
  { name: '', class: 'text-white' },
]

const tableBodyItem = ref<Product[]>([
  {
    id: 1,
    name: '測試商品1',
    origin_price: 200,
    price: 100,
    quantity: 1,
    unit: '個',
  },
  {
    id: 2,
    name: '測試商品2',
    origin_price: 300,
    price: 200,
    quantity: 1,
    unit: '個',
  },
  {
    id: 3,
    name: '測試商品3',
    origin_price: 400,
    price: 300,
    quantity: 1,
    unit: '包',
  },
  {
    id: 4,
    name: '測試商品4',
    origin_price: 500,
    price: 400,
    quantity: 1,
    unit: '片',
  },
])

const cartStore = useCartStore()

const add_to_cart = (choose_product: Product) => {
  cartStore.add_to_cart(choose_product)
}

onMounted(() => {
  cartStore.init_cart()
})

const API_URL = import.meta.env.VITE_API_URL as string

const token = computed(() => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )
  return token
})

const headers = computed(() => {
  return {
    Authorization: token.value,
  }
})

const fetch_data = async () => {
  const { data } = await axios.get(`${API_URL}/products`, {
    headers: headers.value,
  })
  console.log(data)
}

onMounted(() => {
  fetch_data()
})
</script>

<template>
  <div class="ProductList">
    <Table class="bg-gray-600 mt-10 rounded">
      <!-- 表格標頭 -->
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="item in tableHeadItem"
            :key="item.name"
            :class="item.class"
          >
            {{ item.name }}
          </TableHead>
        </TableRow>
      </TableHeader>

      <!-- 表格內容 -->
      <TableBody>
        <TableRow
          v-for="item in tableBodyItem"
          :key="item.id"
        >
          <TableCell class="font-medium">
            <div class="w-[100px] h-[100px] bg-red-400 rounded"></div>
          </TableCell>
          <TableCell class="text-center text-lg">{{ item.name }}</TableCell>
          <TableCell class="text-lg"
            >NT$ {{ item.price }}／{{ item.unit }}</TableCell
          >
          <TableCell>
            <Button @click="add_to_cart(item)">加入購物車</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
