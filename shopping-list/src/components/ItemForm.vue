<!-- src/components/ItemForm.vue -->
<template>
  <div class="flex gap-2 mb-4">
    <input
      v-model="formData.name"
      type="text"
      placeholder="Tên mặt hàng"
      class="border p-2 rounded flex-1"
    />
    <input
      v-model.number="formData.quantity"
      type="number"
      min="1"
      class="border p-2 rounded w-20"
    />
    <button
      class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      @click="$emit('submit', { ...formData })"
    >
      {{ initialData ? 'Cập nhật' : 'Thêm' }}
    </button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'ItemForm',
  props: {
    initialData: {
      type: Object,
      required: false,
      default: () => ({ name: '', quantity: 1, purchased: false }),
    },
  },
  emits: ['submit'],
  setup(props) {
    const formData = ref({ ...props.initialData });

    watch(() => props.initialData, (newData) => {
      formData.value = { ...newData };
    }, { deep: true });

    return { formData };
  },
};
</script>