<script setup>
import { useUserSessionStore } from '@/stores/useUserSessionStore'
const userStore = useUserSessionStore()
</script>

<template>
  <nav class="navbar">
    <h1 class="logo">TechBuilds</h1>
    <span class="user" @click="userStore.visitGithub()">
      Usuari: {{ userStore.username }}
    </span>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e293b; /* gris fosc */
  color: white;
  padding: 1rem 2rem;
  font-family: Arial, sans-serif;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.user {
  cursor: pointer;
  text-decoration: underline;
}
</style>
