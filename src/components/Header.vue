<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'

const loginStore = useLoginStore()

const router = useRouter()
const goToShop = () => {
  router.push('/')
}
</script>

<template>
  <header class="w-full bg-gray-400">
    <div class="container py-4 flex justify-between items-center">
      <p class="text-xl">小平台</p>

      <template v-if="!loginStore.isLogin">
        <div class="space-x-3">
          <Button @click="goToShop">商品頁面</Button>
          <Button @click="loginStore.login">管理者登入</Button>
        </div>
      </template>

      <template v-else>
        <div class="space-x-3">
          <Button @click="goToShop">商品頁面</Button>
          <Button @click="loginStore.logout">登出</Button>
        </div>
      </template>
    </div>
  </header>
</template>
