<template>
  <q-page class="app">
    <header class="header">
      <h1>Equips F1 2026</h1>
      <p class="subtitle">
        Explora tots els equips que competiran a la temporada 2026 de Fórmula 1.
      </p>
    </header>

    <section class="description">
      <p>
        Aquest projecte permet consultar informació detallada sobre cada equip de la F1 2026:
        nom, país, títols de constructors i logotips oficials.
      </p>
      <p>
        Fes clic al botó de sota per veure la llista completa d'equips i les seves estadístiques.
      </p>
    </section>

    <section class="cta">
      <q-btn
        to="/equips"
        class="btn"
        label="Veure equips"
        no-caps
        unelevated
      />
    </section>
  </q-page>
</template>

<script setup lang="ts">
// No logic needed for the index page
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
  min-height: calc(100vh - 60px);
}

.header h1 {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
  color: white;
}

.subtitle {
  font-size: 1.1rem;
  color: #9ca3af;
  margin-bottom: 2.5rem;
}

.description {
  max-width: 700px;
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: #d1d5db;
}

.cta {
  margin-top: 1rem;
}

.btn {
  padding: 0.9rem 2rem;
  background: #e10600 !important;
  border-radius: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: all 0.2s ease;
  color: white !important;
}

.btn:hover {
  background: #b80000 !important;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(225, 6, 0, 0.2);
}
</style>
