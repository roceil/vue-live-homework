<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
defineProps({
  has_submit_button: {
    type: Boolean,
    default: true,
  },
  submit_button_text: {
    type: String,
    default: "新增",
  },
});
const emits = defineEmits(["close", "submit"]);

const close = () => {
  emits("close");
};

const submit = () => {
  emits("submit");
};
</script>

<template>
  <teleport to="body">
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      @click="close"
    >
      <div class="bg-white px-6 py-4 rounded-lg shadow-lg w-[500px]" @click.stop>
        <slot></slot>
        <div class="flex justify-end space-x-3">
          <button
            v-if="has_submit_button"
            class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="submit"
          >
            {{ submit_button_text }}
          </button>
          <button
            class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="close"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
