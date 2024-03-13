import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

// 加入購物車

export const add_to_cart_api = async (product_id: string, qty: number) => {
  const { data } = await axios.post(`${API_URL}/${API_KEY}/cart`, {
    data: {
      product_id,
      qty,
    },
  });

  return data;
};

// 送出訂單
type OrderData = {
  name: string;
  email: string;
  tel: string;
  address: string;
  message: string;
};

export const send_order_api = async ({
  name,
  email,
  tel,
  address,
  message,
}: OrderData) => {
  const { data } = await axios.post(`${API_URL}/${API_KEY}/order`, {
    data: {
      user: {
        name,
        email,
        tel,
        address,
      },
      message,
    },
  });

  return data;
};
