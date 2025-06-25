<template>
  <div>
    <ExpenseItem
      v-for="expense in sortedExpenses"
      :key="expense.id"
      :expense="expense"
      @delete="$emit('delete', $event)"
    />
    <p v-if="sortedExpenses.length === 0" class="text-pink-400 text-center py-8 text-lg font-semibold animate-pulse">
      Không có khoản chi nào.
    </p>
  </div>
</template>

<script>
import ExpenseItem from './ExpenseItem.vue';

export default {
  name: 'ExpenseList',
  components: { ExpenseItem },
  props: {
    expenses: {
      type: Array,
      required: true,
    },
  },
  emits: ['delete'],
  computed: {
    sortedExpenses() {
      return [...this.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
};
</script>