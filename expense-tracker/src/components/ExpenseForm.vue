<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-4 mb-4 bg-gradient-to-r from-blue-50 to-pink-50 p-6 rounded-2xl shadow-lg">
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">Tên khoản chi</label>
      <input
        v-model="formData.name"
        placeholder="Nhập tên khoản chi..."
        class="border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl w-full p-3 text-base placeholder-gray-400 transition"
      />
      <span v-if="errors.name" class="text-red-500 text-xs block mt-1">{{ errors.name }}</span>
    </div>
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">Số tiền</label>
      <input
        v-model.number="formData.amount"
        placeholder="Nhập số tiền..."
        class="border-2 border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 rounded-xl w-full p-3 text-base placeholder-gray-400 transition"
      />
      <span v-if="errors.amount" class="text-red-500 text-xs block mt-1">{{ errors.amount }}</span>
    </div>
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">Danh mục</label>
      <select
        v-model="formData.category"
        class="border-2 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl w-full p-3 text-base transition"
      >
        <option value="" disabled>Chọn danh mục</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <span v-if="errors.category" class="text-red-500 text-xs block mt-1">{{ errors.category }}</span>
    </div>
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">Ngày</label>
      <input
        v-model="formData.date"
        type="date"
        class="border-2 border-yellow-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 rounded-xl w-full p-3 text-base transition"
      />
      <span v-if="errors.date" class="text-red-500 text-xs block mt-1">{{ errors.date }}</span>
    </div>
    <div class="flex justify-end">
      <button
        :disabled="hasErrors"
        type="submit"
        class="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-8 py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-pink-600 transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Thêm
      </button>
    </div>
  </form>
</template>

<script>
import { ref, watch, computed } from 'vue';

export default {
  name: 'ExpenseForm',
  props: {
    categories: {
      type: Array,
      required: true,
    },
    initialData: {
      type: Object,
      required: false,
      default: () => ({ name: '', amount: 0, category: '', date: new Date().toISOString().split('T')[0] }),
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const formData = ref({ ...props.initialData });
    const errors = ref({ name: '', amount: '', category: '', date: '' });

    watch(() => props.initialData, (newData) => {
      formData.value = { ...newData };
    }, { deep: true });

    watch(formData, (newData) => {
      validateForm(newData);
      if (newData.amount > 1000000) {
        console.log('Cảnh báo: Số tiền vượt quá 1,000,000 VND!');
      }
    }, { deep: true });

    const validateForm = (data) => {
      errors.value.name = !data.name || data.name.length < 3 ? 'Tên phải có ít nhất 3 ký tự' : '';
      errors.value.amount = data.amount <= 0 ? 'Số tiền phải lớn hơn 0' : '';
      errors.value.category = !data.category ? 'Vui lòng chọn danh mục' : '';
      const today = new Date().toISOString().split('T')[0];
      errors.value.date = data.date > today ? 'Ngày không được trong tương lai' : '';
    };

    const hasErrors = computed(() => {
      return Object.values(errors.value).some(error => error !== '');
    });

    const submitForm = () => {
      if (!hasErrors.value) {
        emit('submit', { ...formData.value });
      }
    };

    return { formData, errors, hasErrors, submitForm };
  },
};
</script>