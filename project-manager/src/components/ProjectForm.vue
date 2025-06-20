<template>
  <div class="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow p-8">
    <h2 class="text-2xl font-bold mb-6 text-blue-700 text-center">
      {{ isEdit ? 'Chỉnh sửa dự án' : 'Thêm dự án mới' }}
    </h2>
    <form @submit.prevent="submitForm" class="flex flex-col gap-4">
      <div>
        <label class="block text-gray-700 font-semibold mb-1">Tiêu đề dự án</label>
        <input
          v-model="title"
          type="text"
          placeholder="Nhập tiêu đề dự án"
          class="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-1">Mô tả dự án</label>
        <textarea
          v-model="description"
          placeholder="Nhập mô tả dự án"
          class="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          rows="4"
        ></textarea>
      </div>
      <div v-if="error" class="text-red-600 font-semibold text-center">
        {{ error }}
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
      >
        {{ isEdit ? 'Lưu' : 'Thêm dự án' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProjectFormComponent',
  props: ['id'],
  data() {
    return {
      title: '',
      description: '',
      isEdit: false,
      error: ''
    };
  },
  mounted() {
    if (this.id) {
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      const project = projects.find(p => p.id == this.id);
      if (project) {
        this.title = project.title;
        this.description = project.description;
        this.isEdit = true;
      }
      // Chỉ admin mới được chỉnh sửa
      const role = localStorage.getItem('role');
      if (this.id && role !== 'admin') {
        this.error = 'Bạn không có quyền chỉnh sửa dự án này!';
      }
    }
  },
  methods: {
    submitForm() {
      if (this.error) return;
      if (!this.title || !this.description) {
        this.error = 'Vui lòng nhập đầy đủ thông tin!';
        return;
      }
      let projects = JSON.parse(localStorage.getItem('projects') || '[]');
      if (this.isEdit) {
        const idx = projects.findIndex(p => p.id == this.id);
        if (idx !== -1) {
          projects[idx].title = this.title;
          projects[idx].description = this.description;
        }
      } else {
        projects.push({
          id: Date.now().toString(),
          title: this.title,
          description: this.description,
          tasks: []
        });
      }
      localStorage.setItem('projects', JSON.stringify(projects));
      this.$router.push('/projects');
    }
  }
}
</script>