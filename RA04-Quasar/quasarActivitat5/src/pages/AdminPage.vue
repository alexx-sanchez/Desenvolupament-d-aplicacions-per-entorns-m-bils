<template>
  <q-page class="flex items-center justify-center q-pa-md">
    <q-card class="admin-card">
      <q-card-section>
        <h2 class="text-h5 text-white text-center q-mb-xs">
          🏁 Panell d'Administració
        </h2>
        <p class="text-center text-grey-5 text-caption q-mb-lg">
          Gestiona els equips i dades del teu projecte F1
        </p>

        <div class="q-gutter-sm column">
          <q-btn to="/crearEquip" label="Crear equip" no-caps unelevated class="full-width primary-btn" />
          <q-btn to="/equips" label="Veure equips" no-caps outline class="full-width outline-btn" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
// Protected by router guard (meta: requiresAuth)
</script>

<style scoped>
.admin-card {
  width: 100%; max-width: 448px;
  background: #0C0F14;
  border: 1px solid #1F2937;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
}
.primary-btn { background: #E10600 !important; color: white !important; font-weight: 600; padding: 0.625rem; border-radius: 8px; }
.primary-btn:hover { background: #B80000 !important; }
.outline-btn { border: 1px solid #E10600 !important; color: #E10600 !important; font-weight: 600; padding: 0.625rem; border-radius: 8px; }
.outline-btn:hover { background: #E10600 !important; color: white !important; }
</style>