<template>
  <transition name="taskitem" appear>
    <li
      class="flex justify-between items-center p-2 border-b hover:bg-gray-100 animate__animated animate__fadeIn"
      :class="{ 'line-through text-gray-500': task.completed }"
      :style="{ backgroundColor: task.completed ? '#f0f0f0' : 'white' }"
    >
      <div class="flex items-center">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="$emit('toggle', task.id)"
          class="mr-2"
        />
        <span>{{ task.title }}</span>
      </div>
      <button @click="$emit('delete', task.id)" class="text-red-500 hover:text-red-700">Xóa</button>
    </li>
  </transition>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: { type: Object, required: true }
  }
};
</script>

<style scoped>
.taskitem-enter-active {
  transition: all 0.3s;
}
.taskitem-enter-from {
  transform: scale(0.8);
  opacity: 0;
}
.taskitem-leave-active {
  transition: all 0.3s;
  opacity: 0;
  transform: scale(0.8);
}
li {
  transition: all 0.3s ease;
}
</style>