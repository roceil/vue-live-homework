import { ref } from "vue";
import { defineStore } from "pinia";


export const useLoadingStore = defineStore("loading", () => {
  const isLoading = ref(false);

  const open_loading = () => {
    isLoading.value = true;
  };

  const close_loading = () => {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  };

  return {
    isLoading,
    open_loading,
    close_loading,
  };
});
