<script setup>
import { ref } from 'vue'
import NavDrawerComponent from './components/NavDrawer.vue'
import { useDisplay } from 'vuetify'

const drawer = ref(false)
const { smAndDown } = useDisplay()
const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-btn icon @click="toggleDrawer" class="mr-4" v-if="smAndDown" aria-label="Toggle navigation menu">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>Note Manager</v-toolbar-title>
    </v-app-bar>
    <NavDrawerComponent v-model="drawer" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}
</style>