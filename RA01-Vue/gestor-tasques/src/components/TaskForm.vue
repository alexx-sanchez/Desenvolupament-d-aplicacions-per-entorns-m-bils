<script setup>
import { ref
    
 } from 'vue';
const novaTasca = ref('')
const emit = defineEmits(['novaTasca']); // ENVIAR AL PARE (novaTasca)
const capturarNomTasca = () => {
    if (novaTasca.value.trim() === '') return

    emit('novaTasca', novaTasca.value) // Envia el nom del esdeveniment, mes la variable reactiva amb el nom

    novaTasca.value = ''
}
</script>

<template>
    <form @submit.prevent="capturarNomTasca">
        <input type="text" placeholder="Afegir tasca nova" v-model="novaTasca">
        <button type="submit">Afegir</button>
    </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ffcc00;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #ffcc00;
  color: #111;
  cursor: pointer;
  transition: background 0.2s ease;
}

button:hover {
  background-color: #e6b800;
}
</style>