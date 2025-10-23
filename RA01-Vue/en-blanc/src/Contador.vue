<script setup>
import { ref } from 'vue'

const contador = ref(0)

const incrementar = () => {
  contador.value++
}

const decrementar = () => {
  contador.value--
}
</script>

<template>
  <div class="contador-container">
    <p>El contador es: {{ contador }}</p>
    <div class="botones">
      <button @click="decrementar">-</button>
      <button @click="incrementar">+</button>
    </div>
  </div>
</template>

<style scoped>
.contador-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #cce7ff;
  border-radius: 10px;
}

p {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.botones {
  display: flex;
  gap: 10px;
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
