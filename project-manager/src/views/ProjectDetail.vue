<template>
  <div>
    <div v-if="project">
      <h2 class="text-2xl font-bold mb-2">{{ project.title }}</h2>
      <div class="mb-4">{{ project.description }}</div>
      <!-- Chỉ admin mới thấy nút Chỉnh sửa -->
      <router-link
        v-if="isAdmin"
        :to="{ name: 'project-edit', params: { id: project.id } }"
        class="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
      >Chỉnh sửa</router-link>
      <router-link
        :to="{ name: 'project-tasks', params: { id: project.id } }"
        class="bg-green-500 text-white px-3 py-1 rounded"
      >Nhiệm vụ</router-link>
      <router-view :project="project" />
    </div>
    <div v-else class="text-gray-500">Không tìm thấy dự án.</div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetailView',
  data() {
    return { project: null };
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('role') === 'admin';
    }
  },
  mounted() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    this.project = projects.find(p => p.id == this.$route.params.id);
    if (this.$route.query.tab === 'tasks' && this.project) {
      this.$router.replace({ name: 'project-tasks', params: { id: this.project.id } });
    }
  }
}
</script>