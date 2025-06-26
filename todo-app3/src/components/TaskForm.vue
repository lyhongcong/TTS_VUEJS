<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ task: Object });
const emit = defineEmits(['add', 'edit']);

const title = ref('');
const completed = ref(false);
const isEdit = ref(false);

watch(
  () => props.task,
  (val) => {
    if (val && val.id !== undefined) {
      title.value = val.title;
      completed.value = val.completed;
      isEdit.value = true;
    } else {
      // Khi editingTask đổi về null, reset form
      title.value = '';
      completed.value = false;
      isEdit.value = false;
    }
  },
  { immediate: true }
);

const onSubmit = () => {
  if (!title.value.trim()) return;
  if (isEdit.value && props.task && props.task.id !== undefined) {
    emit('edit', {
      id: props.task.id,
      title: title.value,
      completed: completed.value,
      userId: props.task.userId || 1
    });
  } else {
    emit('add', {
      title: title.value,
      completed: completed.value,
      userId: 1
    });
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex gap-2 mb-4">
    <input v-model="title" placeholder="Tiêu đề công việc" required class="flex-1 p-2 border rounded" />
    <input type="checkbox" v-model="completed" class="ml-2" />
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 transition">
      {{ isEdit ? 'Cập nhật' : 'Thêm' }}
    </button>
  </form>
</template>