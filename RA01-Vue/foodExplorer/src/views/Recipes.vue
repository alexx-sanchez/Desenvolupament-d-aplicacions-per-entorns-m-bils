<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const receptes = ref([
    {
        id: 1,
        nom: 'Pizza Margarita',
        descripcio: 'Pizza italiana clàssica amb tomàquet, mozzarella i alfàbrega.',
        foto: "https://www.annarecetasfaciles.com/files/pizza-margarita-1-scaled.jpg"
    },
    {
        id: 2,
        nom: 'Amanida César',
        descripcio: 'Amanida clàssica amb enciam, crostons, parmesà i salsa César.',
        foto: "https://gourmet.iprospect.cl/wp-content/uploads/2016/09/EnsaladaCesar2.webp"
    },
    {
        id: 3,
        nom: 'Brownie de xocolata',
        descripcio: 'Brownie americà esponjós i intens de xocolata.',
        foto: "https://hips.hearstapps.com/hmg-prod/images/brownie-chocolate-helado-elle-gourmet-64d48f5ba8668.jpg?crop=0.9655555555555556xw:1xh;center,top&resize=1200:*"
    }
]);
</script>

<template>
  <h1 class="recipes-title">Les nostres receptes</h1>

  <div class="recipes-grid">
    <section v-for="recepta in receptes" :key="recepta.id" class="recipe-card">
      <img :src="recepta.foto" :alt="recepta.nom" class="recipe-img" />
      <h3 class="recipe-name">{{ recepta.nom }}</h3>
      <p class="recipe-desc">{{ recepta.descripcio }}</p>
      <RouterLink :to="`/receptes/${recepta.id}`" class="recipe-btn">Veure detall</RouterLink>
    </section>
  </div>
</template>