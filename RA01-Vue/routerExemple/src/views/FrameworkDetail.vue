<script setup>
import { useRoute } from 'vue-router';

const frameworks = [
    { id: 1, name: 'Vue.js', desc: 'Progressive Framework per construir interfícies web.' },
    { id: 2, name: 'React', desc: 'Biblioteca per crear interfícies d’usuari interactives.' },
    { id: 3, name: 'Angular', desc: 'Framework complet per aplicacions empresarials.' }
]

const router = useRoute();
const frameID = parseInt(router.params.id) // ha de coincidir amb el que envies desde index.js (router)

const framework = frameworks.find(f => f.id === frameID)

</script>

<template>
    <div>
        <h1>
            {{ framework.name }}
        </h1>
        <h2>
            {{ framework.desc }}
        </h2>
    </div>
</template>