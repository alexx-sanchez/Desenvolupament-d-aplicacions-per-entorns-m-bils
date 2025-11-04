<template>
  <p>Estat del filter: {{ filtrePendents }}</p>
  <h1>Gestor de tasques</h1>
  <div class="container">

    <!-- FORMULARI CREACIO -->
    <form @submit.prevent="afegirTasca">
      <input type="text" placeholder="Afegir tasca nova" v-model="novaTasca">
      <button type="submit">Afegir</button>
    </form>

    <!-- FILTRE -->
    <div class="filtres">
      <form @submit.prevent>
        <input type="checkbox" v-model="filtrePendents">
        <label>Mostrar només pendents</label>
      </form>
    </div>

    <!-- TASQUES -->
    <div class="task-container">
      <ul v-if="tasquesMostrar.length > 0">
        <li v-for="tasca in tasquesMostrar" :key="tasca.id" :class="tasca.completada ? 'completada' : 'pendent'">
          {{ tasca.nom }}

          <!-- Botons completada -->
          <button @click="canviaEstat(tasca)">
            {{ tasca.completada ? 'Desmarcar' : 'Completar' }}
          </button>

          <!-- Boto eliminar -->
          <button @click="eliminaTasca(tasca.id)">🗑️</button>
        </li>
      </ul>
      <p v-else>No hi ha tasques</p>
    </div>

    <!-- COMPUT TOTAL -->
    <div class="total">
      Total: {{ tasques.length }} | Completades: {{ totalCompletades }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const novaTasca = ref('')
const filtrePendents = ref(false)

const tasques = ref([
  { id: 1, nom: 'Tasca 1', completada: false },
  { id: 2, nom: 'Tasca 2', completada: true },
  { id: 3, nom: 'Tasca 3', completada: false },
  { id: 4, nom: 'Tasca 4', completada: true },
  { id: 5, nom: 'Tasca 5', completada: false }
])

const totalCompletades = computed(() => {
  return tasques.value.filter(t => t.completada).length
})

const tasquesMostrar = computed(() => {
  if (filtrePendents.value) {
    return tasques.value.filter(t => !t.completada)
  } else {
    return tasques.value
  }
})

const canviaEstat = (tasca) => {
  tasca.completada = !tasca.completada
}

const afegirTasca = () => {
  if (novaTasca.value.trim() === '') return

  const maxId = tasques.value.length > 0 ? Math.max(...tasques.value.map(t => t.id)) : 0

  const tasca = {
    id: maxId + 1,
    nom: novaTasca.value,
    completada: false
  }

  tasques.value.push(tasca)
  novaTasca.value = ''
}

const eliminaTasca = (id) => {
  const index = tasques.value.findIndex(t => t.id === id)
  if (index !== -1) {
    tasques.value.splice(index, 1)
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  background-color: #111; /* fons negre */
  border-radius: 10px;
  color: #fff;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #ffcc00; /* groc */
}

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

.filtres {
  margin-bottom: 20px;
}

.task-container ul {
  list-style: none;
  padding: 0;
}

.task-container li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
  border-left: 5px solid; /* línia lateral segons estat */
}

/* Línia lateral verda per completades */
.task-container li.completada {
  border-color: #00ff00;
  text-decoration: line-through;
}

/* Línia lateral groga per pendents */
.task-container li.pendent {
  border-color: #ffcc00;
}

.task-container li button {
  margin-left: 5px;
}

.total {
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
  color: #ffcc00;
}
</style>
