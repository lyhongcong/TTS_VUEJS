<!-- src/components/FilterTabs.vue -->
<template>
  <div class="flex gap-2 mb-4">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="[
        'p-2',
        activeFilter === tab.value ? 'font-bold border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700',
      ]"
      @click="$emit('change-filter', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterTabs',
  props: {
    activeFilter: {
      type: String,
      default: 'all',
    },
  },
  emits: ['change-filter'],
  setup() {
    const tabs = [
      { label: 'Tất cả', value: 'all' },
      { label: 'Đã mua', value: 'purchased' },
      { label: 'Chưa mua', value: 'not-purchased' },
    ];
    return { tabs };
  },
};
</script>