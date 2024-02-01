<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type Product, useCartStore, type Cart } from '@/stores/cart'
import { useLoadingStore } from '@/stores/loading'
import { fetch_data_api } from '@/api/products'

const tableHeadItem = [
  { name: '圖片', class: 'w-[100px] text-white text-center' },
  { name: '商品名稱', class: 'text-white text-center' },
  { name: '價格', class: 'text-white' },
  { name: '', class: 'text-white' },
]

const cartStore = useCartStore()

const add_to_cart = (choose_product: Product) => {
  const cartItem: Cart = {
    ...choose_product,
    quantity: 1,
  }

  cartStore.add_to_cart(cartItem)
}

onMounted(() => {
  cartStore.init_cart()
})

const loadingStore = useLoadingStore()
const tableBodyItem = ref<Product[]>([])

onMounted(async () => {
  loadingStore.open_loading()
  try {
    const render_data = await fetch_data_api()
    tableBodyItem.value = render_data as unknown as Product[]
  } catch (error) {
    alert('取得商品列表失敗')
    console.error(error)
  } finally {
    loadingStore.close_loading()
  }
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
          <TableCell class="w-[150px] flex justify-center items-center">
            <img
              :src="item.imageUrl"
              :alt="item.title"
              class="w-[100px] h-[100px] bg-red-400 rounded object-cover"
            />
          </TableCell>
          <TableCell class="text-center text-lg">{{ item.title }}</TableCell>
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
