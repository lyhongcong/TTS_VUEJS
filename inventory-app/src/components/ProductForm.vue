<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4 bg-white p-4 shadow rounded mb-6">
    <input v-model="form.name" placeholder="Tên sản phẩm" required class="input" />
    <input v-model.number="form.price" type="number" placeholder="Giá" required class="input" />
    <input v-model.number="form.quantity" type="number" placeholder="Số lượng" required class="input" />
    <button type="submit" class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
      {{ form.id ? 'Cập nhật' : 'Thêm' }}
    </button>
  </form>
</template>

<script setup>

import { reactive, watch, toRefs } from 'vue'
const props = defineProps({ initialData: Object })
const emit = defineEmits(['submit'])

const form = reactive({ name: '', price: 0, quantity: 1, id: null })

watch(
  () => props.initialData,
  newData => {
    if (newData) Object.assign(form, newData)
  },
  { immediate: true }
)

function onSubmit() {
  emit('submit', { ...form })
  form.name = ''
  form.price = 0
  form.quantity = 1
  form.id = null
}
</script>

<style>
.input {
  @apply border border-gray-300 rounded px-3 py-2 text-sm;
}
</style>
