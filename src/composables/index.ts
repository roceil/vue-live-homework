import { ref } from "vue";

type ModalItem = {
  title: string;
  type: string;
  name: string;
  placeholder: string;
  value: string | number | boolean | string[] | null;
};

export const modal_items = ref<ModalItem[]>([
  {
    title: "商品名稱",
    type: "text",
    name: "title",
    placeholder: "請輸入商品名稱",
    value: "",
  },
  {
    title: "商品分類",
    type: "text",
    name: "category",
    placeholder: "請輸入商品分類",
    value: "",
  },
  {
    title: "商品原價",
    type: "number",
    name: "origin_price",
    placeholder: "請輸入商品原價",
    value: null,
  },
  {
    title: "商品售價",
    type: "number",
    name: "price",
    placeholder: "請輸入商品售價",
    value: null,
  },
  {
    title: "商品單位",
    type: "text",
    name: "unit",
    placeholder: "請輸入商品單位<個/件/台>",
    value: "",
  },
  {
    title: "商品描述",
    type: "text",
    name: "description",
    placeholder: "請輸入商品描述",
    value: "",
  },
  {
    title: "商品內容",
    type: "text",
    name: "content",
    placeholder: "請輸入商品內容",
    value: "",
  },
  {
    title: "是否啟用",
    type: "checkbox",
    name: "is_enabled",
    placeholder: "請輸入是否啟用<0/1>",
    value: "",
  },
  {
    title: "主要圖片",
    type: "text",
    name: "imageUrl",
    placeholder: "請輸入主要圖片的網址",
    value: "",
  },
  // {
  //   title: "其他圖片",
  //   type: "text",
  //   name: "imagesUrl",
  //   placeholder: "請輸入其他圖片的網址",
  //   value: [],
  // },
]);
