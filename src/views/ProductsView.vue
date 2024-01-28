<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ProductsTable from '@/containers/ProductsTable.vue'
import ProductDetail from '@/containers/ProductDetail.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/modal/Modal.vue'
import ModelContent from '@/components/modal/ModelContent.vue'
import addProductForm from '@/components/modal/addProductForm.vue'
import { useModalStore } from '@/stores/modal'
import { modal_items } from '@/composables'
import {
  fetch_products_api,
  add_product_api,
  edit_product_api,
  delete_product_api,
} from '@/api/products'
import { check_identity_api } from '@/api/auth'
import router from '@/router'

// ====== 檢查身分 ======
const check_identity = async () => {
  try {
    const fetch_data = await check_identity_api()
    if (!fetch_data) {
      alert('請重新登入')
      router.push('/')
    }
  } catch (error) {
    console.error(error)
    alert(error)
  }
}

onMounted(() => {
  check_identity()
})
// ====== 產品列表 ======
export type Product = {
  id: string
  title: string
  category: string
  content: string
  description: string
  imageUrl: string
  imagesUrl: string[]
  is_enabled: number
  origin_price: number
  price: number
  unit: string
  num?: number
}

const products = ref<Product[]>([])

onMounted(async () => {
  const fetch_data = await fetch_products_api()
  products.value = fetch_data as Product[]
})

// ====== 產品細節 ======
const product_detail = ref<Product | null>(null)

// ====== 查看商品細節 ======
const selectedProduct = (id: string) => {
  if (!products.value) return
  product_detail.value = products.value.find(product => product.id === id)!
}

// ====== 新增商品 ======
const add_product = () => {
  modal_store.modal_title = '新增商品'
  modal_store.modal_submit_btn_text = '新增'
  modal_open()
}

// ====== 編輯商品 ======
const product_id = ref<string>('')
const edit_product = (product: Product, edit_product_id: string) => {
  product_id.value = edit_product_id
  const product_keys = Object.keys(product) as Array<keyof Product>
  modal_items.value.map(item => {
    product_keys.map(key => {
      if (item.name === key) {
        item.value = product[key] as string | number | boolean | string[] | null
      }
      if (item.name === key && key === 'is_enabled' && product[key] === 1) {
        item.value = true
      }
    })
  })

  modal_store.modal_title = '編輯商品'
  modal_store.modal_submit_btn_text = '更新'
  modal_store.modal_open()
}

// ====== 刪除商品 ======
const delete_product = async (product_id: string) => {
  try {
    const refetch_data = await delete_product_api(product_id)
    products.value = refetch_data as Product[]
    alert('刪除成功')
  } catch (error) {
    console.error(error)
    alert(error)
  }
}

// ====== Modal ======
const modal_store = useModalStore()

const modal_close = () => {
  modal_items.value.map(item => {
    item.value = ''
  })
  modal_store.modal_close()
}

const modal_open = () => {
  modal_store.modal_title = '新增商品'
  modal_store.modal_open()
}

const modal_submit = async () => {
  // 新增商品
  if (modal_store.modal_title === '新增商品') {
    const product: any = {}
    for (const item of modal_items.value) {
      if (!item.value && item.name !== 'is_enabled') {
        alert('請輸入完整資料')
        return
      }
      product[item.name] = item.value
    }

    const refetch_data = await add_product_api(product)
    products.value = refetch_data as Product[]
    modal_close()
    return
  }

  // 編輯商品
  if (modal_store.modal_title === '編輯商品') {
    const product: any = {}
    for (const item of modal_items.value) {
      if (!item.value && item.name !== 'is_enabled') {
        alert('請輸入完整資料')
        return
      }
      product[item.name] = item.value
    }

    const refetch_data = await edit_product_api(product, product_id.value)
    products.value = refetch_data as Product[]
    modal_close()
  }
}
</script>

<template>
  <div class="ProductsView">
    <div class="max-w-7xl mx-auto py-6 px-4 flex space-x-7">
      <!-- 產品總表 -->
      <div class="w-2/3">
        <div class="flex justify-between">
          <h2 class="text-3xl font-bold text-gray-900 block">產品列表</h2>
          <Button
            text="新增商品"
            :click_event="add_product"
          />
        </div>
        <ProductsTable
          :products="products"
          :selected-product="selectedProduct"
          @edit_product="edit_product"
          @delete_product="delete_product"
        />
      </div>

      <!-- 單一產品細節 -->
      <ProductDetail
        v-if="product_detail"
        :product_detail="product_detail"
      />
    </div>

    <!-- Modal -->
    <Modal
      v-if="modal_store.modal_isShow"
      :submit_button_text="modal_store.modal_submit_btn_text"
      @close="modal_close"
      @submit="modal_submit"
    >
      <ModelContent :title="modal_store.modal_title">
        <addProductForm :model_items="modal_items" />
      </ModelContent>
    </Modal>
  </div>
</template>
