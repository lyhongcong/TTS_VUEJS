import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/tailwind.css'

const app = createApp(App)
const pinia = createPinia()

import { autoSavePlugin } from './stores/plugins'
pinia.use(autoSavePlugin)

app.use(pinia)
app.mount('#app')