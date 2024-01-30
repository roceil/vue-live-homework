import { ref, computed } from "vue";
import { defineStore } from "pinia";

export interface Product {
  id: number;
  name: string;
  origin_price: number;
  price: number;
  quantity: number;
  unit: string;
}

export const useCartStore = defineStore("cart", () => {
  // 購物車清單
  const cart = ref<Product[]>([]);

  // 初始化 cart
  const init_cart = () => {
    const cart_from_localStorage = localStorage.getItem("cart");
    if (cart_from_localStorage) {
      cart.value = JSON.parse(cart_from_localStorage);
    }
  };

  // 新增商品到購物車
  const add_to_cart = (product: Product) => {
    const index = cart.value.findIndex((item) => item.id === product.id);
    if (index === -1) {
      cart.value.unshift(product);
      save_cart_to_localStorage();
      return;
    }
    cart.value[index].quantity++;
    save_cart_to_localStorage();
  };

  // 從購物車移除商品
  const remove_from_cart = (id: number) => {
    const index = cart.value.findIndex((item) => item.id === id);
    if (index === -1) return;
    cart.value[index].quantity = 1;
    cart.value.splice(index, 1);
    save_cart_to_localStorage();
  };

  // 清空購物車
  const clear_cart = () => {
    cart.value = [];
    clear_cart_from_localStorage();
  };

  // 計算總價
  const total_price = computed(() => {
    return cart.value.reduce((acc, curr) => {
      return acc + curr.origin_price * curr.quantity;
    }, 0);
  });

  // 計算總折扣價
  const total_discount_price = computed(() => {
    return cart.value.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }
    , 0);
  });

  // 將 cart 資料儲存到 localStorage
  const save_cart_to_localStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  // 清空 localStorage 的 cart 資料
  const clear_cart_from_localStorage = () => {
    localStorage.removeItem("cart");
  };

  return {
    cart,
    init_cart,
    add_to_cart,
    remove_from_cart,
    clear_cart,
    total_price,
    total_discount_price,
    save_cart_to_localStorage,
  };
});
