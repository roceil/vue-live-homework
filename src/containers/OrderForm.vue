<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/stores/cart'
import { formItems } from '@/constants'
import { add_to_cart_api, send_order_api } from '@/api/order'
import { useLoadingStore } from '@/stores/loading'

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(2, '用戶名稱至少需要 2 個字符')
      .max(50, '用戶名稱不能超過 50 個字符'),
    tel: z
      .string()
      .min(10, '電話號碼需要 10 個數字')
      .max(10, '電話號碼不能超過 10 個數字'),
    email: z.string().email('請輸入有效的電子郵件地址'),
    address: z
      .string()
      .min(10, '地址至少需要 10 個字符')
      .max(50, '地址不能超過 50 個字符'),
    message: z.string().max(200, '留言不能超過 200 個字符').optional(),
  }),
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
})

const cartStore = useCartStore()
const loadingStore = useLoadingStore()

const onSubmit = handleSubmit(async values => {
  if (!cartStore.cart.length) {
    alert('請選擇商品後再提交訂單')
    return
  }
  loadingStore.open_loading()

  const { name, email, tel, address, message = '' } = values
  try {
    await Promise.all(
      cartStore.cart.map(item => add_to_cart_api(item.id, item.quantity)),
    )
    await send_order_api({ name, email, tel, address, message })
    alert('訂單成立')
    resetForm()
    cartStore.clear_cart()
  } catch (error) {
    console.error('提交訂單過程中出錯:', error)
  } finally {
    loadingStore.close_loading()
  }
})
</script>

<template>
  <div class="OrderForm">
    <!-- 訂單資訊 -->
    <form
      class="space-y-6 border border-dashed border-white mt-5 rounded py-5 px-6 mb-10"
      @submit="onSubmit"
    >
      <FormField
        v-slot="{ componentField }"
        v-for="item in formItems"
        :key="item.name"
        :name="item.name"
      >
        <FormItem class="space-y-1">
          <FormLabel>{{ item.label }}</FormLabel>
          <FormControl>
            <Input
              :type="item.type"
              :placeholder="item.placeholder"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button
        type="submit"
        class="w-full"
        >立即購買</Button
      >
    </form>
  </div>
</template>
