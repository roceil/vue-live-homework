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

const formSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(2, '用戶名稱至少需要 2 個字符')
      .max(50, '用戶名稱不能超過 50 個字符'),
    phone: z
      .string()
      .min(10, '電話號碼需要 10 個數字')
      .max(10, '電話號碼不能超過 10 個數字'),
    email: z.string().email('請輸入有效的電子郵件地址'),
    address: z
      .string()
      .min(10, '地址至少需要 10 個字符')
      .max(50, '地址不能超過 50 個字符'),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(values => {
  console.log('values', values)
})

const formItems = [
  {
    name: 'username',
    label: '收件人姓名',
    placeholder: '請輸入姓名',
    type: 'text',
  },
  {
    name: 'email',
    label: '收件人信箱',
    placeholder: '請輸入信箱',
    type: 'email',
  },
  {
    name: 'phone',
    label: '收件人電話',
    placeholder: '請輸入聯絡電話',
    type: 'tel',
  },
  {
    name: 'address',
    label: '收件人地址',
    placeholder: '請輸入地址',
    type: 'text',
  },
  {
    name: 'note',
    label: '備註',
    placeholder: '請輸入備註',
    type: 'text',
  },
]
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
