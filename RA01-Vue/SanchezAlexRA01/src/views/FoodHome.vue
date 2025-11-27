<script setup>
import FoodList from './FoodList.vue';

const aliments = [
  {
    name: 'Salmó Atlàntic',
    type: 'Proteïna',
    properties: ['Alt Omega-3', 'Ajuda a la recuperació', 'Vitamina D'],
    img: 'salmo.jpeg'
  },
  {
    name: 'Civada integral',
    type: 'Hidrat de carboni',
    properties: ['Alliberament energètic sostingut', 'Rica en ferro', 'Fibra soluble'],
    img: 'civada.jpeg'
  },
  {
    name: 'Alvocat',
    type: 'Greix saludable',
    properties: ['Greixos monoinsaturats', 'Alt en fibra', 'Conté potassi'],
    img: 'alvocat.jpeg'
  },
  {
    name: 'Ou de gallina',
    type: 'Proteïna',
    properties: ['Alto valor biològic', 'Rics en aminoàcids essencials', 'Vitamina B12'],
    img: 'ou.jpeg'
  }
];
</script>

<template>
    <h1>Recomanador d'aliments</h1>
    <FoodList :info="aliments" />
</template>