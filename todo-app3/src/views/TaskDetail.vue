<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getTask } from '@/api/api';

const route = useRoute();
const task = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    task.value = await getTask(route.params.id);
    error.value = null;
  } catch (err) {
    error.value = 'Không thể tải chi tiết công việc';
  }
});
</script>
<template>
  <div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="task">
      <h2 v-once class="text-2xl font-bold mb-4">{{ task.title }}</h2>
      <p>Trạng thái: <span :class="{ 'text-green-600': task.completed }">{{ task.completed ? 'Hoàn thành' : 'Chưa hoàn thành' }}</span></p>
      <router-link to="/tasks" class="text-blue-500">Quay lại</router-link>
    </div>
    <div v-else class="text-center">Đang tải...</div>
  </div>
</template>
<style scoped>
@import '../assets/tailwind.css';
</style>