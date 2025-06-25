<template>
  <div class="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 via-white to-pink-50 border-l-4 border-blue-400 rounded-xl shadow-lg mb-4 hover:scale-[1.02] hover:shadow-xl transition-all duration-200">
    <div>
      <p class="font-semibold text-lg text-gray-800">
        {{ expense.name }}
        <span class="text-pink-600 font-bold drop-shadow">- {{ expense.amount.toLocaleString() }} VND</span>
      </p>
      <div class="text-sm text-gray-500 mt-1 flex items-center gap-2">
        <span class="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full shadow-sm">{{ expense.category }}</span>
        <span class="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{{ expense.date }}</span>
      </div>
    </div>
    <button
      @click.stop="$emit('delete', expense.id)"
      class="ml-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full shadow transition-all duration-200 font-semibold"
    >
      Xóa
    </button>
  </div>
</template>

<script>
export default {
  name: 'ExpenseItem',
  props: {
    expense: {
      type: Object,
      required: true,
      validator: (expense) => {
        return 'id' in expense && 'name' in expense && 'amount' in expense && 'category' in expense && 'date' in expense;
      },
    },
  },
  emits: ['delete'],
};
</script>