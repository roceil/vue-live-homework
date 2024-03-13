<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import { login_api } from '@/api/auth'

const loginStore = useLoginStore()
const router = useRouter()

const toDashboard = () => {
  router.push('/admin')
}

const loginForm = ref([
  {
    type: 'email',
    id: 'username',
    placeholder: ' Email address',
    required: true,
    inputValue: '',
  },
  {
    type: 'password',
    id: 'password',
    placeholder: 'Password',
    required: true,
    inputValue: '',
  },
])

const handleSubmit = async () => {
  if (!loginForm.value[0].inputValue || !loginForm.value[1].inputValue) {
    alert('請輸入帳號密碼')
    return
  }
  try {
    const loginSuccess = await login_api(
      loginForm.value[0].inputValue,
      loginForm.value[1].inputValue,
    )
    if (loginSuccess) {
      loginStore.isLogin = true
      toDashboard()
      alert('登入成功')
    }
  } catch (error) {
    console.error(error)
    alert(error)
  }
}
</script>

<template>
  <div class="HomeView">
    <div
      class="container h-[calc(100vh-72px)] w-screen flex flex-col justify-center items-center"
    >
      <div class="">
        <h1 class="text-2xl font-bold text-center">請先登入</h1>

        <!-- 登入表單 -->
        <form
          id="form"
          class="mt-4 space-y-3 text-black"
        >
          <label
            class="flex"
            v-for="item in loginForm"
            :key="item.placeholder"
          >
            <input
              :type="item.type"
              class="border px-2 py-4 rounded placeholder:text-black"
              :id="item.id"
              :placeholder="item.placeholder"
              :required="item.required"
              v-model="item.inputValue"
              autofocus
            />
          </label>
          <button
            class="border w-full py-2 bg-blue-500 text-white font-bold hover:bg-white rounded hover:text-blue-500 duration-300 ease-in-out"
            type="submit"
            @click.prevent="handleSubmit"
          >
            登入
          </button>
        </form>
      </div>

      <p class="mt-3">&copy; 2021~∞ - 六角學院</p>
    </div>
  </div>
</template>
