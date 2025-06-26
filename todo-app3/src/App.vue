<template>
  <div id="app" class="max-w-2xl mx-auto p-4">
    <ErrorBoundary>
      <router-view />
    </ErrorBoundary>
  </div>
</template>
<script setup>
import ErrorBoundary from './components/ErrorBoundary.vue';
</script>
<style scoped>
@import './assets/tailwind.css';
</style>