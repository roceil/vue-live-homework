import axios from "axios";
import { computed } from "vue";

const token = computed(() => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return token;
});

const headers = computed(() => {
  return {
    authorization: token.value,
  };
});

// ====== 檢查身分是否合法 ======
export const check_identity_api = async () => {
  try {
    const res = await axios.post(`https://ec-course-api.hexschool.io/v2/api/user/check`,{}, {
      headers: headers.value,
    });
    if (res.data.success) {
      return res.data.success;
    }
  } catch (error) {
    console.error(error);
  }
};
