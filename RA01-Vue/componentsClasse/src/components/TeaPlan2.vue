<script setup>
const props = defineProps({
  nom: String
}); // REBRE

const emit = defineEmits(['nomEnviat']); // ENVIAR AL PARE (nomEnviat)

const enviarPlan = () => {
  emit('nomEnviat', props.nom)
}
</script>

<template>
  <div class="plan" @click="enviarPlan">
    <div class="description">
      <span class="title">{{ props.nom }}</span>
    </div>
  </div>
</template>