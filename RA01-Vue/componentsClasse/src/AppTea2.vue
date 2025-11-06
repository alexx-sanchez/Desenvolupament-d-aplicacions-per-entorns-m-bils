<script setup>
import TeaPlan2 from './components/TeaPlan2.vue'
import { ref } from 'vue'

const colores = ref(['Verds', 'Vermells', 'Negre', 'Groc'])
const planRebut = ref('')

const gestionarPlan = (color) => {
    console.log("Recibo plan")
    planRebut.value = color
}
</script>

<template>
    <div class="content">
        <h1 class="title">Subscripcions disponibles</h1>
        <h2 class="subtitle">
            Disposem dels millor tes del món
        </h2>
        <div class="plans">
            <p>Has seleccionat: <strong>{{ planRebut }}</strong></p>
            <TeaPlan2 v-for="color in colores" :key="color" :nom="color" @nomEnviat="gestionarPlan" />
        </div>
    </div>
</template>
