<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <h1>NutriFit Coach</h1>
    <nav>
      <RouterLink to="/">Inici</RouterLink>
      <RouterLink to="/foods">Recomanador d'aliments</RouterLink>
      <RouterLink to="/training">Simulador d'entrenaments</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>