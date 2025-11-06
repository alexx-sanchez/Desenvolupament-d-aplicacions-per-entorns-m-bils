<script setup>
import TeaPlan from './components/TeaPlan.vue';
import { ref } from 'vue';

const colores = ref(['Verds', 'Vermells', 'Negre', 'Groc']);
</script>

<template>
    <div class="content">
        <h1 class="title">Subscripcions disponibles</h1>
        <h2 class="subtitle">
            Disposem dels millor tes del món
        </h2>

        <div class="plans">
            <TeaPlan v-for="color in colores" :key="color" :nom="color" />
        </div>
    </div>
</template>