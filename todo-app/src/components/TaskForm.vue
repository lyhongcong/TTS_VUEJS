<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="task" type="text" placeholder="Nhập công việc..." />
    <button type="submit">Thêm</button>
  </form>
</template>

<script>
export default {
  props: {
    modelValue: String
  },
  emits: ['add', 'update:modelValue'],
  data() {
    return {
      task: this.modelValue || ''
    }
  },
  watch: {
    modelValue(newVal) {
      this.task = newVal
    }
  },
  methods: {
    handleSubmit() {
      const text = this.task.trim()
      if (text) {
        this.$emit('add', text)
        this.task = ''
        this.$emit('update:modelValue', '')
      }
    }
  }
}
</script>
