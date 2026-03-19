<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout view="hHh lpR fFf">

    <!-- Navbar -->
    <q-header elevated class="bg-black" text-color="white">
      <q-toolbar>

        <!-- Logo / Inicio -->
        <q-toolbar-title>
          <router-link to="/" class="nav-link">🏁 Equips F1 2026</router-link>
        </q-toolbar-title>

        <!-- Center Links -->
        <div class="q-toolbar__title flex justify-center gap-4">
          <router-link v-if="!auth.loggedIn" to="/login" class="nav-link">
            Iniciar sessió
          </router-link>
          <router-link v-else to="/equips" class="nav-link">
            Equips
          </router-link>
        </div>

        <!-- User / Logout -->
        <div v-if="auth.loggedIn" class="flex items-center gap-2">
          <span class="text-grey-5">Hola, {{ auth.user?.login || auth.user?.name }}</span>
          <q-btn
            flat
            rounded
            color="primary"
            text-color="white"
            @click="logout"
          >
            Logout
          </q-btn>
        </div>

      </q-toolbar>
    </q-header>

    <!-- Page Container -->
    <q-page-container class="bg-dark-page">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth'

const auth = useAuthStore()

const logout = async () => {
  await auth.logout()
}
</script>

<style>
.nav-link {
  color: white;
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.nav-link:hover {
  background: rgba(225, 6, 0, 0.15);
  color: #E10600;
}
</style>