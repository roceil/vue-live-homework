import { ref } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  const modal_isShow = ref(false);
  const modal_title = ref("");
  const modal_submit_btn_text = ref('新增');

  const modal_close = () => {
    modal_isShow.value = false;
  };

  const modal_open = () => {
    modal_isShow.value = true;
  };

  return {
    modal_isShow,
    modal_title,
    modal_submit_btn_text,
    modal_close,
    modal_open
  };
});
