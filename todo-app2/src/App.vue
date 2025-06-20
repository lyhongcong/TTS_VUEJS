<template>
  <div class="max-w-md mx-auto p-4 bg-white rounded shadow mt-8">
    <h1 class="text-3xl font-bold text-center mb-6">Todo App</h1>
    <TaskForm @submit="addTask" />
    <div class="flex gap-2 mb-2">
      <button
        class="px-4 py-1 rounded"
        :class="{
          'bg-blue-600 text-white': filter === 'all',
          'bg-gray-200': filter !== 'all'
        }"
        @click="filter = 'all'"
      >Tất cả</button>
      <button
        class="px-4 py-1 rounded"
        :class="{
          'bg-blue-600 text-white': filter === 'done',
          'bg-gray-200': filter !== 'done'
        }"
        @click="filter = 'done'"
      >Hoàn thành</button>
      <button
        class="px-4 py-1 rounded"
        :class="{
          'bg-blue-600 text-white': filter === 'todo',
          'bg-gray-200': filter !== 'todo'
        }"
        @click="filter = 'todo'"
      >Chưa hoàn thành</button>
    </div>
    <TaskList
      :tasks="filteredTasks"
      @toggle="toggleTask"
      @delete="deleteTask"
    />
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';

export default {
  name: 'App',
  components: { TaskForm, TaskList },
  data() {
    return {
      tasks: [],
      filter: 'all'
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === 'done') return this.tasks.filter(t => t.completed);
      if (this.filter === 'todo') return this.tasks.filter(t => !t.completed);
      return this.tasks;
    }
  },
  methods: {
    addTask(title) {
      if (!title || typeof title !== 'string') return
      this.tasks.push({ title, completed: false })
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) task.completed = !task.completed;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
  },
  mounted() {
    const saved = localStorage.getItem('tasks');
    if (saved) this.tasks = JSON.parse(saved);
  },
  watch: {
    tasks: {
      handler(val) {
        localStorage.setItem('tasks', JSON.stringify(val));
      },
      deep: true
    }
  }
};
</script>

<style>
body {
  background: #f3f4f6;
}
</style>