<script setup>
import CanviMissatge from './CanviMissatge.vue'
import Contador from './Contador.vue'
import DataBinding from './DataBinding.vue';
</script>

<template>
  <div class="app-container">
    <CanviMissatge />
    <Contador />
    <DataBinding />
  </div>
</template>

<style scoped>
.app-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas iguales */
  gap: 20px; /* espacio entre los componentes */
  justify-items: center; /* centra los elementos en cada columna */
  align-items: start; /* alinea al inicio verticalmente */
  padding: 20px;
}

</style>
