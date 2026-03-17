<template>
  <div class="navbar-inner">

    <div class="nav-left">
      <router-link to="/" class="nav-link">🏁 Inici</router-link>
    </div>

    <div class="nav-center">
      <router-link v-if="!authStore.loggedIn" to="/login" class="nav-link">
        Iniciar sessió
      </router-link>
      <router-link v-else to="/equips" class="nav-link">
        Equips
      </router-link>
    </div>

    <div v-if="authStore.loggedIn" class="nav-right">
      <span class="nav-user">Hola, {{ authStore.user?.login }}</span>
      <q-btn flat no-caps label="Logout" class="logout-btn" @click="logout" />
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 2rem;
  background: #0C0F14;
  border-bottom: 1px solid #1F2937;
}

.nav-left,
.nav-center,
.nav-right {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.nav-link {
  text-decoration: none;
  color: #ffffff;
  font-weight: 500;
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(225, 6, 0, 0.15);
  color: #E10600;
}

.nav-user {
  color: #9ca3af;
  font-weight: 500;
}

.logout-btn {
  border: 1px solid #E10600 !important;
  color: #E10600 !important;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #E10600 !important;
  color: white !important;
}
</style>