<template>
  <div v-memo="[tasks.length]" class="space-y-2">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit="$emit('edit', task)"
      @delete="$emit('delete', task.id)"
      @toggle="$emit('toggle', task.id)"
    />
  </div>
</template>
<script setup>
import TaskItem from './TaskItem.vue';
defineProps(['tasks']);
defineEmits(['edit', 'delete', 'toggle']);
</script>
<style scoped>
.task-list {
  margin-top: 16px;
}
</style>