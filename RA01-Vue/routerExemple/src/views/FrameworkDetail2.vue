<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const frameworks = ref([
    { id: 1, name: 'Vue.js', desc: 'Progressive Framework per construir interfícies web.' },
    { id: 2, name: 'React', desc: 'Biblioteca per crear interfícies d’usuari interactives.' },
    { id: 3, name: 'Angular', desc: 'Framework complet per aplicacions empresarials.' }
])

const route = useRoute()
const framework = ref(null)
  
/* Funcio per carregar framework */
const carregarFramework = (id) => {
    const newID = parseInt(id)
    framework.value = frameworks.value.find(f => f.id === newID) || null
}

carregarFramework(route.params.id)

watch(
    () => route.params.id,
    (newID) => carregarFramework(newID)
)
</script>

<template>
    <h1>{{ framework.name }}</h1>
    <h2>{{ framework.desc }}</h2>
</template>
