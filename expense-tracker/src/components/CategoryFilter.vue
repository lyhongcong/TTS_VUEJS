<template>
  <div class="mb-4">
    <select
      :value="selectedCategory"
      @change="$emit('update:category', $event.target.value)"
      class="border-2 border-blue-300 p-2 rounded-full w-full md:w-auto focus:ring-2 focus:ring-pink-400 shadow transition"
    >
      <option value="all">Tất cả</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CategoryFilter',
  props: {
    categories: {
      type: Array,
      required: true,
    },
    selectedCategory: {
      type: String,
      required: true,
    },
  },
  emits: ['update:category'],
};
</script>