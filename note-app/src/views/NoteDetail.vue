<template>
  <v-container v-if="note" class="pa-4">
    <v-card role="article">
      <v-card-title>{{ note.title }}</v-card-title>
      <v-card-subtitle>{{ new Date(note.createdAt).toLocaleString() }}</v-card-subtitle>
      <v-card-text>{{ note.content }}</v-card-text>
      <v-card-actions>
        <v-btn :to="{ path: '/notes' }" color="primary">Back to Notes</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-alert type="error">Note not found.</v-alert>
  </v-container>
</template>

<script>
import { useNotes } from '../composables/useNotes';
import { useRoute } from 'vue-router';

export default {
  name: 'NoteDetailView',
  setup() {
    const route = useRoute();
    const { getNoteById } = useNotes();
    const note = getNoteById(parseInt(route.params.id));

    return { note };
  },
};
</script>