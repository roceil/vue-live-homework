<script lang="ts" setup>
import OrderForm from '@/containers/OrderForm.vue'
import CartList from '@/containers/CartList.vue'
import ProductList from '@/containers/ProductList.vue'
</script>

<template>
  <div class="ShopView">
    <div class="container">
      <!-- 商品列表 -->
      <ProductList />

      <!-- 購物車列表 -->
      <CartList />

      <!-- 訂單資訊 -->
      <OrderForm />
    </div>
  </div>
</template>
