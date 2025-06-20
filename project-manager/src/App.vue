<template>
  <div style="max-width:800px;margin:0 auto;">
    <NavbarComponent />
    <router-view />
  </div>
</template>
<script>
import NavbarComponent from './components/Navbar.vue';
export default { components: { NavbarComponent } }
</script>