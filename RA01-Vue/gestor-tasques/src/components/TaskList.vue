<script setup>
import TaskItem from './TaskItem.vue'

// Rebem la llista de tasques
const props = defineProps({
  tasques: {
    type: Array,
    required: true
  }
})

// Declarem els esdeveniments que reemitirem al pare (App.vue)
const emit = defineEmits(['completarTasca', 'eliminarTasca'])
</script>

<template>
  <ul v-if="props.tasques.length > 0">
    <li v-for="tasca in props.tasques" :key="tasca.id">
      <TaskItem
        :id="tasca.id"
        :nom="tasca.nom"
        :completada="tasca.completada"
        @completarTasca="emit('completarTasca', tasca.id)"
        @eliminarTasca="emit('eliminarTasca', tasca.id)"
      />
    </li>
  </ul>

  <p v-else>No hi ha tasques</p>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
}
</style>