<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { watch, computed } from 'vue'
import { useLoadingStore } from '@/stores/loading'
import gear from '@/assets/gear.svg'

const loadingStore = useLoadingStore()
const loading = computed(() => loadingStore.isLoading)

watch(loading, newValue => {
  if (newValue) {
    document.body.classList.add('overflow-y-hidden')
  } else {
    document.body.classList.remove('overflow-y-hidden')
  }
})
</script>

<template>
  <Transition>
    <div
      v-if="loadingStore.isLoading"
      class="w-screen h-screen bg-black fixed top-0 left-0 opacity-70 flex justify-center items-center"
    >
      <img
        :src="gear"
        alt="loading"
        class=""
      />
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
