<template>
  <div class="flex items-center justify-between p-2 border-b">
    <div class="flex items-center gap-2">
      <input type="checkbox" :checked="task.completed" @change="$emit('toggle')" />
      <span :class="{ 'line-through text-gray-400': task.completed }">{{ task.title }}</span>
    </div>
    <div class="flex gap-2">
      <button @click="$emit('edit', task)" class="text-blue-500 hover:underline">Sửa</button>
      <button @click="$emit('delete')" class="text-red-500 hover:underline">Xóa</button>
    </div>
  </div>
</template>
<script setup>
defineProps(['task']);
defineEmits(['edit', 'delete', 'toggle']);
</script>
<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.done {
  text-decoration: line-through;
  color: #888;
}
@media (max-width: 640px) {
  .task-item {
    flex-direction: column;
    gap: 8px;
  }
  .task-item div {
    width: 100%;
  }
  .task-item button {
    width: 100%;
    margin-top: 4px;
  }
}
</style>