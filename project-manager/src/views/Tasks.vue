<template>
  <div style="padding:8px;">
    <h3 class="text-lg font-bold mb-2">Nhiệm vụ</h3>
    <TaskList :tasks="tasks" />
  </div>
</template>
<script>
import TaskList from '../components/TaskList.vue';
export default {
  name: 'TasksView',
  props: ['id'],
  components: { TaskList },
  data() {
    return { tasks: [] };
  },
  mounted() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = projects.find(p => p.id == this.id);
    this.tasks = project ? project.tasks || [] : [];
  }
}
</script>