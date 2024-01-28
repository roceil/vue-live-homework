import axios from "axios";
import { computed } from "vue";
import { convert_Array } from "@/lib";
import type { Product } from "@/views/ProductsView.vue";

const API_URL = import.meta.env.VITE_API_URL as string;

const token = computed(() => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return token;
});

const headers = computed(() => {
  return {
    Authorization: token.value,
  };
});

// ====== 取得商品列表 ======
export const fetch_products_api = async () => {
  let result = [];
  try {
    const res = await axios.get(`${API_URL}/admin/products/all`, {
      headers: headers.value,
    });
    if (res.data.products) {
      result = convert_Array(res.data.products);
      return result;
    }
  } catch (error) {
    console.error(error);
  }
};

// ====== 新增商品 ======
export const add_product_api = async (product: Product) => {
  try {
    const res = await axios.post(
      `${API_URL}/admin/product`,
      { data: product },
      {
        headers: headers.value,
      }
    );
    if (res.data.success) {
      const refetch_data = await fetch_products_api();
      return refetch_data;
    }
  } catch (error) {
    console.error(error);
  }
};

// ====== 編輯商品 ======
export const edit_product_api = async (
  product: Product,
  product_id: string
) => {
  try {
    const res = await axios.put(
      `${API_URL}/admin/product/${product_id}`,
      { data: product },
      {
        headers: headers.value,
      }
    );
    if (res.data.success) {
      const refetch_data = await fetch_products_api();
      return refetch_data;
    }
  } catch (error) {
    console.error(error);
  }
};

// ====== 刪除商品 ======
export const delete_product_api = async (product_id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/admin/product/${product_id}`, {
      headers: headers.value,
    });
    if (res.data.success) {
      const refetch_data = await fetch_products_api();
      return refetch_data;
    }
  } catch (error) {
    console.error(error);
  }
};
