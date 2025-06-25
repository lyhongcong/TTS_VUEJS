<template>
  <div class="product-list">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @edit="$emit('edit', product)"
      @delete="$emit('delete', product.id)"
    />
  </div>
</template>

<script setup>
import ProductItem from './ProductItem.vue'
const props = defineProps({ products: Array })
</script>

<style>
.product-list {
  margin-top: 16px;
}
</style>