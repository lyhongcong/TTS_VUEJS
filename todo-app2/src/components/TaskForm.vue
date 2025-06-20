<template>
  <transition name="form" appear>
    <form @submit.prevent="submit" class="flex gap-2 mb-4 animate__animated animate__bounceIn">
      <input
        v-model="title"
        placeholder="Thêm một công việc mới"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': !isValid && title.length > 0 }"
        required
      />
      <button
        type="submit"
        :class="{ 'bg-green-500': isValid, 'bg-gray-300': !isValid }"
        class="p-2 text-white rounded hover:bg-green-600"
        :disabled="!isValid"
      >
        Thêm
      </button>
    </form>
  </transition>
</template>

<script>
export default {
  name: 'TaskForm',
  data() {
    return { title: '' };
  },
  computed: {
    isValid() {
      return this.title.trim().length > 0;
    }
  },
  methods: {
    submit() {
      if (this.isValid) {
        this.$emit('submit', this.title.trim());
        this.title = '';
      }
    }
  }
};
</script>

<style scoped>
.form-enter-active,
.form-leave-active {
  transition: opacity 0.3s;
}
.form-enter-from,
.form-leave-to {
  opacity: 0;
}
</style>