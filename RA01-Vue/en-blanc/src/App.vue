<script setup>
import CanviMissatge from './CanviMissatge.vue'
import Contador from './Contador.vue'
import DataBinding from './DataBinding.vue';
import Form from './Form.vue';
import RenderitzatBucle from './RenderitzatBucle.vue';
</script>

<template>
  <div class="app-container">
    <CanviMissatge />
    <Contador />
    <DataBinding />
    <Form />
    <RenderitzatBucle />
  </div>
</template>

<style scoped>
.app-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columnas iguales */
  gap: 20px; /* espacio moderado entre los componentes */
  padding: 30px;
  justify-items: center;
  align-items: start;
  background-color: #f5faff;
}

.app-container > * {
  width: 80%;
  height: auto;
  font-size: 20px;

}
</style>

