<script setup>
import { ref, computed } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const filtrePendents = ref(false)

const tasques = ref([
  { id: 1, nom: 'Tasca 1', completada: false },
  { id: 2, nom: 'Tasca 2', completada: true },
  { id: 3, nom: 'Tasca 3', completada: false },
  { id: 4, nom: 'Tasca 4', completada: true },
  { id: 5, nom: 'Tasca 5', completada: false }
])

const totalCompletades = computed(() =>
  tasques.value.filter(t => t.completada).length
)

const tasquesMostrar = computed(() =>
  filtrePendents.value ? tasques.value.filter(t => !t.completada) : tasques.value
)

const canviaEstat = (id) => {
  const tasca = tasques.value.find(t => t.id === id)
  if (tasca) tasca.completada = !tasca.completada
}

const afegirTasca = (nomTasca) => {
  if (nomTasca.trim() === '') return
  const maxId = tasques.value.length > 0 ? Math.max(...tasques.value.map(t => t.id)) : 0
  
  tasques.value.push({
    id: maxId + 1,
    nom: nomTasca,
    completada: false
  })
}

const eliminaTasca = (id) => {
  tasques.value = tasques.value.filter(t => t.id !== id)
}
</script>

<template>
  <h1>Gestor de tasques</h1>
  <div class="container">
    <!-- Formulari -->
    <TaskForm @novaTasca="afegirTasca" />

    <!-- Filtre -->
    <div class="filtres">
      <form @submit.prevent>
        <input type="checkbox" v-model="filtrePendents" />
        <label>Mostrar només pendents</label>
      </form>
    </div>

    <!-- Llista de tasques -->
    <TaskList
      :tasques="tasquesMostrar"
      @completarTasca="canviaEstat"
      @eliminarTasca="eliminaTasca"
    />

    <!-- Total -->
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

.total {
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
  color: #ffcc00;
}
</style>