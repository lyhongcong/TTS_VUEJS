<template>
  <nav style="display:flex;gap:16px;padding:16px;background:#1976d2;color:white;">
    <router-link to="/" style="color:white;">Home</router-link>
    <router-link to="/projects" style="color:white;">Projects</router-link>
    <router-link to="/projects/new" style="color:white;">Add Project</router-link>
    <button @click="logout" style="margin-left:auto;background:white;color:#1976d2;padding:4px 12px;border-radius:4px;">Logout</button>
  </nav>
</template>
<script>
export default {
  name: 'NavbarComponent',
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('role');
      this.$router.push('/');
    }
  }
}
</script>