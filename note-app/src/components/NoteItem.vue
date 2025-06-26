<template>
  <v-card class="ma-4" elevation="4" max-width="400" min-width="280" role="article">
    <v-card-title class="text-h6">{{ note.title }}</v-card-title>
    <v-card-text>{{ note.content.length > 100 ? note.content.slice(0, 100) + '...' : note.content }}</v-card-text>
    <v-card-actions>
      <v-btn :to="'/note/' + note.id" color="primary" variant="text">
        <v-icon start>mdi-eye</v-icon> View
      </v-btn>
      <v-btn @click="$emit('edit', note)" color="secondary" variant="text">
        <v-icon start>mdi-pencil</v-icon> Edit
      </v-btn>
      <v-btn @click="$emit('delete', note.id)" color="error" variant="text" aria-label="Delete note">
        <v-icon start>mdi-delete</v-icon> Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps(['note'])
// eslint-disable-next-line no-undef
defineEmits(['edit', 'delete'])
</script>