import { useStorage, useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';

export function useTasks() {
  const tasks = useStorage('tasks', []);
  const addTask = useDebounceFn((task) => {
    tasks.value.push({ ...task, id: Date.now(), completed: false });
  }, 300);

  const updateTask = (id, data) => {
    const idx = tasks.value.findIndex(t => t.id === id);
    if (idx !== -1) tasks.value[idx] = { ...tasks.value[idx], ...data };
  };

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(t => t.id !== id);
  };

  return { tasks, addTask, updateTask, deleteTask };
}