import axios from "axios";
import { computed } from "vue";
import Cookie from "js-cookie";

const headers = computed(() => {
  const token = Cookie.get("hexToken");
  return {
    authorization: token,
  };
});

const API_URL = import.meta.env.VITE_ADMIN_API_URL as string;

// ====== 檢查身分是否合法 ======
export const check_identity_api = async () => {
  try {
    const res = await axios.post(`${API_URL}/api/user/check`,{}, {
      headers: headers.value,
    });
    if (res.data.success) {
      return res.data.success;
    }
  } catch (error) {
    console.error(error);
  }
};

// ====== 登入 ======
export const login_api = async (username:string,password:string) => {
  try {
    const res = await axios.post(
      `${API_URL}/admin/signin`,
      {
        username,
        password
      },
    )
    const { token, expired } = res.data
    document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
    return true // 登入成功
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
