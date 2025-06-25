<template>
  <div class="max-w-2xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-4 text-blue-600">Quản lý Kho hàng</h1>
    <ProductForm :initialData="formData" @submit="handleSubmit" />
    <ProductList
      :products="store.products"
      @edit="handleEdit"
      @delete="store.deleteProduct"
    />
    <div class="mt-4 text-sm text-gray-700 space-y-1">
      <p><strong>Tổng sản phẩm:</strong> {{ store.productCount }}</p>
      <p><strong>Tổng giá trị kho:</strong> {{ store.totalValue }} VND</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useInventoryStore } from './stores/inventory'
import ProductForm from './components/ProductForm.vue'
import ProductList from './components/ProductList.vue'

const store = useInventoryStore()
const formData = ref(null)

onMounted(() => {
  store.fetchProducts()
})

function handleEdit(product) {
  formData.value = { ...product }
}

function handleSubmit(product) {
  if (product.id) {
    store.updateProduct(product.id, product)
  } else {
    store.addProduct(product)
  }
  formData.value = null
}
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}
</style>
