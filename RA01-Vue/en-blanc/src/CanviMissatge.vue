<script setup>
import { ref } from 'vue'

const missatge = ref('Hola, món!')
const canviarMissatge = () => {
  missatge.value = 'Hola, Vue'
}
</script>

<template>
  <div>
    <h1>{{ missatge }}</h1>
    <button @click="canviarMissatge">Canvia el missatge</button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #cce7ff; /* fondo suave */
  border-radius: 10px;
  text-align: center;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #222;
}

button {
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #0077b6;
  color: white;
}

button:hover {
  background-color: #0096c7;
}
</style>
