<template>
  <div style="padding:8px;">
    <div v-if="tasks.length === 0" class="text-gray-400">Chưa có nhiệm vụ nào.</div>
    <ul>
      <li v-for="(task, idx) in tasks" :key="idx" style="border-bottom:1px solid #eee;padding:4px 0;">{{ task }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'TaskListComponent',
  props: { tasks: Array }
}
</script>