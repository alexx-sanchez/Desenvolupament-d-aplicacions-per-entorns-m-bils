<template>
  <div class="productos-container">
    <h2>Lista de productos</h2>

    <!-- Botón para mostrar/ocultar la lista -->
    <button @click="mostrarLista = !mostrarLista">
      {{ mostrarLista ? 'Ocultar productos' : 'Mostrar productos' }}
    </button>

    <!-- Lista de productos -->
    <ul v-show="mostrarLista">
      <li v-for="producte in productes" :key="producte.id">
        {{ producte.nom }} - {{ producte.preu }}€
        <span v-if="producte.stock" style="color: green">Disponible</span>
        <span v-else style="color: red">Agotado</span>
        <!-- Botón para "comprar" -->
        <button @click="comprar(producte)" :disabled="!producte.stock">
          Comprar
        </button>
        <!-- Botón para "devolver" -->
        <button @click="devolver(producte)" :disabled="producte.stock">
          Devolver
        </button>
      </li>
    </ul>

    <!-- Computed: total de productos disponibles -->
    <p>Total disponibles: {{ totalDisponibles }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const productes = ref([
  { id: 1, nom: "Ordinador", preu: 1000, stock: true },
  { id: 2, nom: "Telèfon", preu: 600, stock: false },
  { id: 3, nom: "Tablet", preu: 300, stock: true },
  { id: 4, nom: "Monitor", preu: 200, stock: true }
])

// v-show toggle
const mostrarLista = ref(true)

// Función para "comprar"
const comprar = (producte) => {
  if(producte.stock) {
    alert(`Has comprado: ${producte.nom}`)
    producte.stock = false
  }
}

// Función para "devolver"
const devolver = (producte) => {
  if(!producte.stock) {
    alert(`Has devuelto: ${producte.nom}`)
    producte.stock = true
  }
}

// computed: total de productos disponibles
const totalDisponibles = computed(() => {
  return productes.value.filter(p => p.stock).length
})
</script>

<style scoped>
.productos-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #cce7ff;
  border-radius: 10px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #0077b6;
  color: white;
  cursor: pointer;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>
