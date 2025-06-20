// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import Navbar from './components/Navbar.vue';
import './index.css';

const app = createApp(App);
app.component('AppNavbar', Navbar);
app.mount('#app');