<template>
  <q-page class="flex flex-center column q-pa-lg text-center">

    <h1 class="text-h3 text-white q-mb-md">🏁 Equips F1 2026</h1>
    <p class="text-grey-5 q-mb-xl" style="max-width: 500px">
      Explora tots els equips que competiran a la temporada 2026 de Fórmula 1.
      Consulta les seves estadístiques i descobreix els pilots de cada escuderia.
    </p>

    <!-- Botons principals -->
    <div class="flex gap-4 q-mb-xl">
      <q-btn
        label="Veure equips"
        to="/equips"
        color="primary"
        unelevated
        rounded
        class="q-px-lg q-py-sm"
      />
      <q-btn
        v-if="!auth.loggedIn"
        label="Registrar-se"
        to="/register"
        outline
        rounded
        color="white"
        class="q-px-lg q-py-sm"
      />
    </div>

    <!-- Cards d'accés ràpid -->
    <div class="row q-gutter-md justify-center" style="max-width: 700px">
      <q-card
        class="col-auto cursor-pointer card-hover"
        dark
        style="background: #0C0F14; border: 1px solid #1e2330; width: 200px"
        @click="$router.push('/equips')"
      >
        <q-card-section>
          <div class="text-h4 q-mb-sm">🏎️</div>
          <div class="text-white text-weight-bold">Equips</div>
          <div class="text-grey-5 text-caption">Veure tots els equips</div>
        </q-card-section>
      </q-card>

      <q-card
        v-if="!auth.loggedIn"
        class="col-auto cursor-pointer card-hover"
        dark
        style="background: #0C0F14; border: 1px solid #1e2330; width: 200px"
        @click="$router.push('/login')"
      >
        <q-card-section>
          <div class="text-h4 q-mb-sm">🔑</div>
          <div class="text-white text-weight-bold">Iniciar sessió</div>
          <div class="text-grey-5 text-caption">Accedeix al teu compte</div>
        </q-card-section>
      </q-card>

      <q-card
        v-if="!auth.loggedIn"
        class="col-auto cursor-pointer card-hover"
        dark
        style="background: #0C0F14; border: 1px solid #1e2330; width: 200px"
        @click="$router.push('/register')"
      >
        <q-card-section>
          <div class="text-h4 q-mb-sm">📝</div>
          <div class="text-white text-weight-bold">Registrar-se</div>
          <div class="text-grey-5 text-caption">Crea un compte nou</div>
        </q-card-section>
      </q-card>

      <q-card
        v-if="auth.loggedIn"
        class="col-auto cursor-pointer card-hover"
        dark
        style="background: #0C0F14; border: 1px solid #1e2330; width: 200px"
        @click="$router.push('/equips')"
      >
        <q-card-section>
          <div class="text-h4 q-mb-sm">⭐</div>
          <div class="text-white text-weight-bold">El meu perfil</div>
          <div class="text-grey-5 text-caption">Gestiona el teu compte</div>
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth'
const auth = useAuthStore()
</script>

<style scoped>
.card-hover {
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  border-color: #E10600 !important;
}
</style>