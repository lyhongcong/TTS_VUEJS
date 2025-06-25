<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-100 via-pink-50 to-yellow-100 flex flex-col items-center justify-center py-10">
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
      <h1
        class="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 drop-shadow-lg">
        Quản lý Chi tiêu Cá nhân
      </h1>
      <div class="flex flex-col md:flex-row md:items-end gap-4 mb-8">
        <div class="flex-1">
          <CategoryFilter :categories="categories" :selectedCategory="selectedCategory"
            @update:category="selectedCategory = $event" />
        </div>
        <div class="flex-[2]">
          <ExpenseForm :categories="categories" :initial-data="editingExpense" @submit="handleSubmit" />
        </div>
      </div>
      <div class="divide-y divide-blue-100">
        <ExpenseList :expenses="filteredExpenses" @delete="deleteExpense" />
      </div>
      <div v-if="filteredExpenses.length === 0"
        class="text-pink-400 text-center py-8 text-lg font-semibold animate-pulse">
        Không có khoản chi nào.
      </div>
      <div class="mt-8 text-right text-2xl font-bold text-green-600 drop-shadow">
        Tổng chi tiêu: <span class="text-pink-500">{{ totalAmount.toLocaleString() }}</span> VND
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import ExpenseForm from './components/ExpenseForm.vue';
import ExpenseList from './components/ExpenseList.vue';
import CategoryFilter from './components/CategoryFilter.vue';

export default {
  name: 'App',
  components: { ExpenseForm, ExpenseList, CategoryFilter },
  setup() {
    const expenses = ref([
      { id: Date.now(), name: 'Ăn sáng', amount: 50000, category: 'Food', date: '2025-06-18' },
      { id: Date.now() + 1, name: 'Đi xe buýt', amount: 15000, category: 'Transport', date: '2025-06-18' },
    ]);
    const categories = ['Food', 'Transport', 'Entertainment'];
    const selectedCategory = ref('all');
    const editingExpense = ref(null);

    const filteredExpenses = computed(() => {
      if (selectedCategory.value === 'all') return expenses.value;
      return expenses.value.filter(exp => exp.category === selectedCategory.value);
    });

    const totalAmount = computed(() => {
      return filteredExpenses.value.reduce((sum, exp) => sum + exp.amount, 0);
    });

    const handleSubmit = (expenseData) => {
      if (editingExpense.value) {
        const index = expenses.value.findIndex(exp => exp.id === editingExpense.value.id);
        if (index !== -1) {
          expenses.value[index] = { ...expenseData, id: editingExpense.value.id };
        }
        editingExpense.value = null;
      } else {
        expenses.value.push({ ...expenseData, id: Date.now() });
      }
    };

    const deleteExpense = (id) => {
      expenses.value = expenses.value.filter(exp => exp.id !== id);
    };

    watch(expenses, (newExpenses) => {
      localStorage.setItem('expenses', JSON.stringify(newExpenses));
    }, { deep: true });

    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      expenses.value = JSON.parse(savedExpenses);
    }

    return { expenses, categories, selectedCategory, editingExpense, filteredExpenses, totalAmount, handleSubmit, deleteExpense };
  },
};
</script>