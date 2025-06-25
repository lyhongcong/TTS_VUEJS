<template>
  <div class="flex justify-between items-center border-b py-2">
    <div>
      <strong>{{ product.name }}</strong> - {{ product.price }} VND x {{ product.quantity }} sp
    </div>
    <div class="flex gap-2">
      <button @click="$emit('edit')" class="text-blue-600 hover:underline">Sửa</button>
      <button @click="$emit('delete')" class="text-red-600 hover:underline">Xóa</button>
    </div>
  </div>
</template>


<script setup>
const props = defineProps({ product: Object })
</script>

<style>
.product-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>