<script setup>
import { ref } from 'vue'

const nomUsuari = ref('')
const selected = ref('')
const texte = ref('')
</script>

<template>
  <div class="contenedor">
    <h2>Formulari d'Usuari</h2>

    <!-- Input -->
    <p>Nom de l'usuari: {{ nomUsuari }}</p>
    <input v-model="nomUsuari" placeholder="Escriu el teu nom" />

    <!-- Select -->
    <p>Opció seleccionada: {{ selected }}</p>
    <select v-model="selected">
      <option disabled value="">Selecciona una opció</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>

    <!-- Textarea -->
    <p>Text introduït: {{ texte }}</p>
    <textarea v-model="texte" placeholder="Escriu aquí..."></textarea>
  </div>
</template>

<style scoped>
.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  padding: 20px;
  background-color: #cce7ff;
  border-radius: 10px;
  text-align: center;
}

h2 {
  margin-bottom: 15px;
  color: #004aad;
}

p {
  font-size: 20px;
  margin: 10px 0;
}

input,
select,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #0077b6;
  border-radius: 5px;
  font-size: 1rem;
  font-family: inherit;
}

textarea {
  min-height: 60px;
  resize: none;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #0096c7;
  box-shadow: 0 0 4px #0096c7;
}
</style>
