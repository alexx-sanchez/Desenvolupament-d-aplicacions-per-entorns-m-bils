<script setup>
import { ref, computed } from 'vue'
import TaskForm from './components/TaskForm.vue'

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
  return filtrePendents.value 
    ? tasques.value.filter(t => !t.completada)
    : tasques.value
})

const canviaEstat = (tasca) => {
  tasca.completada = !tasca.completada
}

const afegirTasca = (nomTasca) => {
  if (nomTasca.trim() === '') return

  const maxId = tasques.value.length > 0 
    ? Math.max(...tasques.value.map(t => t.id)) 
    : 0

  const tasca = {
    id: maxId + 1,
    nom: nomTasca,
    completada: false
  }

  tasques.value.push(tasca)
}

const eliminaTasca = (id) => {
  const index = tasques.value.findIndex(t => t.id === id)
  if (index !== -1) {
    tasques.value.splice(index, 1)
  }
}
</script>

<template>
  <h1>Gestor de tasques</h1>
  <div class="container">

    <!-- Formulari de creació -->
    <TaskForm @novaTasca="afegirTasca" />

    <!-- Filtre -->
    <div class="filtres">
      <form @submit.prevent>
        <input type="checkbox" v-model="filtrePendents">
        <label>Mostrar només pendents</label>
      </form>
    </div>

    <!-- Llista de tasques -->
    <div class="task-container">
      <ul v-if="tasquesMostrar.length > 0">
        <li v-for="tasca in tasquesMostrar" :key="tasca.id" :class="tasca.completada ? 'completada' : 'pendent'">
          {{ tasca.nom }}

          <button @click="canviaEstat(tasca)">
            {{ tasca.completada ? 'Desmarcar' : 'Completar' }}
          </button>

          <button @click="eliminaTasca(tasca.id)">🗑️</button>
        </li>
      </ul>
      <p v-else>No hi ha tasques</p>
    </div>

    <!-- Total tasques -->
    <div class="total">
      Total: {{ tasques.length }} | Completades: {{ totalCompletades }}
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  background-color: #111;
  border-radius: 10px;
  color: #fff;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #ffcc00;
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
  border-left: 5px solid;
}

.task-container li.completada {
  border-color: #00ff00;
  text-decoration: line-through;
}

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