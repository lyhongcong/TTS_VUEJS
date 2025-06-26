<template>
  <v-row justify="center" align="center" class="form-row">
    <v-col cols="12" md="12" lg="10" xl="9">
      <v-card class="pa-8 form-card" elevation="6">
        <v-card-title class="text-h5 font-weight-bold mb-4 text-center">Add / Edit Note</v-card-title>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.title"
            label="Title"
            required
            :error-messages="errors.title"
            aria-label="Note title"
            class="mb-4"
            density="comfortable"
            style="font-size: 1.15rem;"
          />
          <v-textarea
            v-model="form.content"
            label="Content"
            required
            :error-messages="errors.content"
            aria-label="Note content"
            class="mb-4"
            rows="5"
            auto-grow
            style="font-size: 1.12rem;"
          />
          <v-btn
            type="submit"
            color="primary"
            block
            class="mt-2"
            size="x-large"
            style="font-size: 1.1rem; letter-spacing: 1px;"
          >
            Save Note
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ref, watch } from 'vue';
import { useNotes } from '../composables/useNotes';

export default {
  name: 'NoteFormComponent',
  props: {
    note: { type: Object, default: null },
  },
  emits: ['save'],
  setup(props, { emit }) {
    const { addNote, updateNote } = useNotes();
    const form = ref({ title: '', content: '', id: null });
    const errors = ref({ title: '', content: '' });

    watch(() => props.note, (newNote) => {
      if (newNote) Object.assign(form.value, newNote);
      else Object.assign(form.value, { title: '', content: '', id: null });
    }, { immediate: true });

    const handleSubmit = () => {
      errors.value = { title: '', content: '' };
      if (!form.value.title) errors.value.title = 'Title is required';
      if (!form.value.content) errors.value.content = 'Content is required';
      if (errors.value.title || errors.value.content) return;

      if (form.value.id) updateNote(form.value.id, { title: form.value.title, content: form.value.content });
      else addNote({ title: form.value.title, content: form.value.content });
      emit('save');
      Object.assign(form.value, { title: '', content: '', id: null });
    };

    return { form, errors, handleSubmit };
  },
};
</script>

<style scoped>
.form-row {
  min-height: 35vh;
}
.form-card {
  max-width: 800px;
  margin: 0 auto;
}
</style>