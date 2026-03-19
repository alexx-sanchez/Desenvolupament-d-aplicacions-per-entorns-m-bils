<template>
  <q-header elevated class="bg-dark text-white">
    <q-toolbar>

      <q-btn flat to="/" label="🏁 Inici" class="text-white" />

      <q-space />

      <q-btn v-if="!loggedIn" flat to="/login" label="Iniciar sessió" class="text-white" />
      <q-btn v-else flat to="/equips" label="Equips" class="text-white" />

      <q-space />

      <div v-if="loggedIn" class="row items-center q-gutter-sm">
        <span class="text-grey-4">Hola, {{ user?.login }}</span>
        <q-btn flat outline label="Logout" color="red" @click="logout" />
      </div>

    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const loggedIn = authStore.loggedIn
const user = authStore.user

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.bg-dark { background: #0C0F14; }
</style>