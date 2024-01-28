import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const usePaginationStore = defineStore("pagination", () => {
  const total_page = ref<number>(0);
  const current_page = ref<number>(0);
  const click_page = (page: number) => {
    if (page === current_page.value) return;
    current_page.value = page;
  };
  const click_last_page = () => {
    if (current_page.value === 1) return;
    current_page.value -= 1;
  };

  const click_next_page = () => {
    if (current_page.value === total_page.value) return;
    current_page.value += 1;
  };
  const is_last_page_btn_disable = computed(() => {
    if (current_page.value === 1) return true;
    return false;
  });
  const is_next_page_btn_disable = computed(() => {
    if (current_page.value === total_page.value) return true;
    return false;
  });
  const current_page_bg = (num: number) => {
    return num === current_page.value ? "bg-blue-500" : "bg-white";
  };

  return {
    total_page,
    current_page,
    click_page,
    click_last_page,
    click_next_page,
    is_last_page_btn_disable,
    is_next_page_btn_disable,
    current_page_bg,
  };
});
