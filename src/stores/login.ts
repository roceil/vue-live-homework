import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import Cookie from 'js-cookie'


export const useLoginStore = defineStore('login', () => {
 const isLogin = ref(false)


 const router = useRouter()
 
  const login = () => {
    router.push('/admin/login')
  }

  
  // 清除 cookie
  const clearCookie = () => {
    Cookie.remove('hexToken')
  }

  const logout = () => {
    isLogin.value = false
    clearCookie()
    alert('登出成功')
    router.push('/')
  }


  // 檢查 cookie 是否有登入資訊
  const initLoginStatus = () => {
    const hexToken = Cookie.get('hexToken')
    if (hexToken) {
      isLogin.value = true
    }
  }




  return {
    isLogin,
    login,
    logout,
    initLoginStatus
  }
})
