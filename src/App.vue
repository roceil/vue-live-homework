<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Loading from '@/components/loading/Loading.vue'
import Header from '@/components/Header.vue'
import { useLoginStore } from '@/stores/login'

const loginStore = useLoginStore()

onMounted(() => {
  loginStore.initLoginStatus()
})
</script>

<template>
  <Header />
  <RouterView />
  <Loading />
</template>
