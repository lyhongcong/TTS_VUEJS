<template>
  <div class="text-center mt-16">
    <h1 class="text-3xl font-bold mb-4">Chào mừng đến với Quản lý Dự án!</h1>
    <button @click="goProjects" class="bg-blue-600 text-white px-6 py-2 rounded">Xem danh sách dự án</button>
    <div class="mt-8">
      <button @click="fakeLogin('admin')" class="bg-green-500 text-white px-4 py-1 rounded mr-2">Đăng nhập Admin</button>
      <button @click="fakeLogin('user')" class="bg-gray-500 text-white px-4 py-1 rounded">Đăng nhập User</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeView',
  methods: {
    goProjects() {
      this.$router.push('/projects');
    },
    fakeLogin(role) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', role);
      this.$router.push('/projects');
    }
  }
}
</script>