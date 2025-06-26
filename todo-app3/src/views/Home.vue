<template>
  <div>
    <h1 v-once class="text-3xl font-bold mb-4">Quản lý Công việc</h1>
    <router-link to="/tasks">
      <button class="bg-blue-500 text-white p-2 rounded">Đến Danh sách Công việc</button>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'HomeView'
};
</script>
<style scoped>
@import '../assets/tailwind.css';
</style>