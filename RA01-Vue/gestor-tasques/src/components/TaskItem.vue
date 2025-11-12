<script setup>
const props = defineProps({
  id: Number,
  nom: String,
  completada: Boolean
})

const emit = defineEmits(['completarTasca', 'eliminarTasca'])

const marcarCompletada = () => {
  emit('completarTasca', props.id)
}

const eliminar = () => {
  const confirmacio = window.confirm(`Segur que vols eliminar la tasca "${props.nom}"?`)
  if (confirmacio) {
    emit('eliminarTasca', props.id)
  }
}
</script>

<template>
  <div class="task-item" :class="completada ? 'completada' : 'pendent'">
    <span>{{ nom }}</span>

    <div class="botons">
      <button @click="marcarCompletada">
        {{ completada ? 'Desmarcar' : 'Completar' }}
      </button>

      <button @click="eliminar">🗑️</button>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #222;
  border-radius: 5px;
  margin-bottom: 8px;
  border-left: 4px solid; /* el color depèn de la classe */
  color: #fff; /* text blanc */
}

.completada {
  border-left-color: #00ff00; /* verd al lateral */
}

.pendent {
  border-left-color: #ffcc00; /* groc al lateral */
}

.botons button {
  margin-left: 5px;
  border: none;
  border-radius: 5px;
  background-color: #ffcc00;
  color: #111;
  cursor: pointer;
  padding: 5px 10px;
  transition: background 0.2s ease;
}

.botons button:hover {
  background-color: #e6b800;
}
</style>
