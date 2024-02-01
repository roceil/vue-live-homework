<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCartStore } from '@/stores/cart'


const tableHeadItem = ['品名', '數量／單位', '單價', '']

const cartStore = useCartStore()

const remove_from_cart = (id: string) => {
  cartStore.remove_from_cart(id)
}

const clear_cart = () => {
  cartStore.clear_cart()
}


</script>

<template>
  <div class="CartList">
    <!-- 購物車無商品文字 -->
    <div
      v-if="cartStore.cart.length === 0"
      class="mt-5 flex justify-center items-center border border-dashed border-white py-5 rounded"
    >
      <p>購物車內無商品</p>
    </div>

    <Table
      class="mt-5"
      v-else
    >
      <!-- 表格標頭 -->
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="item in tableHeadItem"
            :key="item"
            >{{ item }}</TableHead
          >
        </TableRow>
      </TableHeader>

      <!-- 表格內容 -->
      <TableBody>
        <!-- 購物車內容 -->
        <TableRow
          v-for="product in cartStore.cart"
          :key="product.id"
        >
          <TableCell class="font-medium">{{ product.title }}</TableCell>
          <TableCell>{{ product.quantity }}／{{ product.unit }}</TableCell>
          <TableCell>NT＄ {{ product.price }}</TableCell>
          <TableCell class="text-center">
            <Button
              @click="remove_from_cart(product.id)"
              class="bg-red-500 hover:bg-red-600"
              >刪除商品</Button
            >
          </TableCell>
        </TableRow>

        <!-- 總價欄位 -->
        <TableRow>
          <TableCell class="font-medium"></TableCell>
          <TableCell></TableCell>
          <TableCell class="text-right">總計：</TableCell>
          <TableCell class="text-right"
            >NT＄{{ cartStore.total_price }}</TableCell
          >
        </TableRow>

        <!-- 折扣價欄位 -->
        <TableRow>
          <TableCell class="font-medium"></TableCell>
          <TableCell></TableCell>
          <TableCell class="text-right">折扣後價格：</TableCell>
          <TableCell class="text-right"
            >NT＄{{ cartStore.total_discount_price }}</TableCell
          >
        </TableRow>
      </TableBody>

      <!-- 表格尾部 -->
      <TableCaption>
        <div class="flex justify-end">
          <Button @click="clear_cart">清空購物車</Button>
        </div>
      </TableCaption>
    </Table>
  </div>
</template>
