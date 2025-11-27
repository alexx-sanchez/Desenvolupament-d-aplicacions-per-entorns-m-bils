<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="home-container">
    <div class="home-bienvenida">
      <h1>Benvolguts a la nostra pàgina de receptes</h1>
      <p>Descobreix plats deliciosos, senzills i perfectes per a qualsevol ocasió.</p>
      <RouterLink to="/receptes" class="home-btn">Veure receptes</RouterLink>
    </div>
  </section>

  <section class="home-info">
    <h2>Què trobaràs aquí?</h2>
    <p>
      T’oferim una selecció de receptes variades amb ingredients senzills, fotos
      apetitoses i explicacions pas a pas perquè puguis cuinar plats increïbles.
    </p>
  </section>
</template>