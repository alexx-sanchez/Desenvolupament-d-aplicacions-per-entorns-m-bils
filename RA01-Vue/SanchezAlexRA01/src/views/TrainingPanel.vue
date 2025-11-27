<script setup>
import TrainingSelector from './TrainingSelector.vue';
import ActivityLog from './ActivityLog.vue';
import { provide, ref } from 'vue';

const entrenamientos = ref([
    { id: 'cardio20', title: 'Cardio 20 min', calories: 220, img: 'cardio.jpg' },
    { id: 'upperStrength', title: 'Força tren superior', calories: 320, img: 'trensuperior.jpg' },
    { id: 'hiit10', title: 'HIIT 10 min', calories: 180, img: 'hiit.jpg' },
    { id: 'stretch', title: 'Estiraments guiats', calories: 60, img: 'estiraments.jpg' }
])


const logeo = ref('')


provide('entrenamientos', entrenamientos)
provide('logeo', logeo)
</script>
<template>
    <h1>Simulador d'entrenaments</h1>
    <p>Selecciona un entrenament i registra'l per crear un historial</p>
    <p><strong>Entrenaments recomanats (Coach: Marc Ferrer)</strong></p>

    <TrainingSelector />

</template>