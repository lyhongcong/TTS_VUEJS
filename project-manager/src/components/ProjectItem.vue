<template>
  <div style="padding:8px;border-bottom:1px solid #ddd;display:flex;justify-content:space-between;">
    <div>
      <div class="font-bold">{{ project.title }}</div>
      <div class="text-gray-500">{{ project.description }}</div>
    </div>
    <div style="display:flex;gap:8px;">
      <button @click="$emit('view', project.id)" class="bg-blue-500 text-white px-3 py-1 rounded">Chi tiết</button>
      <button
        v-if="isAdmin"
        @click="$emit('delete', project.id)"
        class="bg-red-500 text-white px-3 py-1 rounded"
      >Xóa</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProjectItemComponent',
  props: { project: Object },
  computed: {
    isAdmin() {
      return localStorage.getItem('role') === 'admin';
    }
  }
}
</script>