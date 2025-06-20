<!-- src/components/ShoppingItem.vue -->
<template>
  <div class="flex justify-between items-center p-2 border-b border-gray-200" :class="{ 'line-through text-gray-500': item.purchased }">
    <div class="flex items-center gap-2">
      <input type="checkbox" :checked="item.purchased" @change="$emit('toggle', item.id)" />
      <span>{{ item.name }} ({{ item.quantity }})</span>
    </div>
    <div class="flex gap-2">
      <button class="text-blue-500 hover:underline" @click="$emit('edit', item)">Chỉnh sửa</button>
      <button class="text-red-500 hover:underline" @click="$emit('delete', item.id)">Xóa</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingItem',
  props: {
    item: {
      type: Object,
      required: true,
      validator: (item) => {
        return 'id' in item && 'name' in item && 'quantity' in item && 'purchased' in item;
      },
    },
  },
  emits: ['toggle', 'edit', 'delete'],
};
</script>