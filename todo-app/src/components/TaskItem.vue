<template>
  <li :class="{ completed: task.completed }">
    <input
      type="checkbox"
      :checked="task.completed"
      @change="$emit('toggle', task.id)"
    />
    <span>{{ task.title }}</span>
    <button @click="$emit('delete', task.id)">X</button>
  </li>
</template>

<script>
export default {
  props: {
    task: Object
  },
  emits: ['toggle', 'delete']
}
</script>

<style>
li {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.completed span {
  text-decoration: line-through;
  color: #888;
}
</style>
