<script setup>
import { inject } from 'vue';

const entrenamientos = inject('entrenamientos')

</script>

<template>
    <section v-for="entrena in entrenamientos">
        <img :src="`/img/${entrena.img}`">
        <p>{{ entrena.title }}</p>
        <p>{{ entrena.calories }}</p>
        <p>{{ entrena.id }}</p>
    </section>
</template>