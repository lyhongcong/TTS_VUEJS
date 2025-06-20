<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Danh sách dự án</h2>
    <ProjectItem
      v-for="project in projects"
      :key="project.id"
      :project="project"
      @view="viewDetail"
      @delete="deleteProject"
    />
    <div v-if="projects.length === 0" class="text-gray-500">Chưa có dự án nào.</div>
  </div>
</template>
<script>
import ProjectItem from '../components/ProjectItem.vue';
export default {
  name: 'ProjectsView',
  components: { ProjectItem },
  data() {
    return { projects: [] };
  },
  mounted() {
    this.loadProjects();
  },
  methods: {
    loadProjects() {
      const saved = localStorage.getItem('projects');
      this.projects = saved ? JSON.parse(saved) : [];
    },
    viewDetail(id) {
      this.$router.push({ name: 'project-detail', params: { id } });
    },
    deleteProject(id) {
      let projects = JSON.parse(localStorage.getItem('projects') || '[]');
      projects = projects.filter(p => p.id !== id);
      localStorage.setItem('projects', JSON.stringify(projects));
      this.loadProjects();
    }
  },
  watch: {
    // Khi route thay đổi (ví dụ: quay lại từ form), reload lại danh sách
    $route() {
      this.loadProjects();
    }
  }
}
</script>