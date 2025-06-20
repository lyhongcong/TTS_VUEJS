<template>
  <div class="app">
    <h1>To-Do List</h1>

    <TaskForm v-model="newTask" @add="addTask" />

    <!-- BỘ LỌC -->
    <div class="filters">
      <button
        v-for="option in filterOptions"
        :key="option"
        @click="currentFilter = option"
        :class="{ active: currentFilter === option }"
      >
        {{ option }}
      </button>
    </div>

    <!-- DANH SÁCH CÔNG VIỆC ĐÃ LỌC -->
    <ul>
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @delete="deleteTask"
      />
    </ul>

    <p>Còn lại: {{ remainingTasks }} công việc</p>
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import TaskItem from './components/TaskItem.vue'

export default {
  components: { TaskForm, TaskItem },
  data() {
    return {
      tasks: [],
      newTask: '',
      currentFilter: 'Tất cả',
      filterOptions: ['Tất cả', 'Hoàn thành', 'Chưa hoàn thành']
    }
  },
  computed: {
    filteredTasks() {
      switch (this.currentFilter) {
        case 'Hoàn thành':
          return this.tasks.filter(t => t.completed)
        case 'Chưa hoàn thành':
          return this.tasks.filter(t => !t.completed)
        default:
          return this.tasks
      }
    },
    remainingTasks() {
      return this.tasks.filter(task => !task.completed).length
    }
  },
  methods: {
    addTask(title) {
      if (title.trim()) {
        this.tasks.push({
          id: Date.now(),
          title,
          completed: false
        })
        this.newTask = ''
      }
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) task.completed = !task.completed
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  },
  mounted() {
    const data = localStorage.getItem('tasks')
    if (data) this.tasks = JSON.parse(data)
  },
  watch: {
    tasks: {
      handler(newVal) {
        localStorage.setItem('tasks', JSON.stringify(newVal))
      },
      deep: true
    }
  }
}
</script>

<style>
.app {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}
ul {
  list-style: none;
  padding: 0;
}
.filters {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 16px 0;
}
.filters button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 4px;
}
.filters .active {
  background: #333;
  color: #fff;
}
</style>
