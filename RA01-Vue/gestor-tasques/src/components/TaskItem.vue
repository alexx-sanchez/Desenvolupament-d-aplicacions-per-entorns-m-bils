<script setup>
const props = defineProps({
    id: Number,
    nom: String,
    completada: Boolean
}) // REBRE

const emit = defineEmits(['completarTasca', 'eliminarTasca']) // ENVIAR

const marcarCompletada = () => {
    emit('completarTasca', props.id)
}

const eliminar = () => {
    emit('eliminarTasca', props.id)
}
</script>

<template>
  <span :class="completada ? 'completada' : 'pendent'">{{ nom }}</span>

  <button @click="marcarCompletada">
    {{ completada ? 'Desmarcar' : 'Completar' }}
  </button>

  <button @click="eliminar">🗑️</button>
</template>

<style scoped>
.completada {
  text-decoration: line-through;
  color: #00ff00;
}

.pendent {
  color: #ffcc00;
}
</style>
