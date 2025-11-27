<script setup>
import { RouterLink, RouterView } from 'vue-router';
import FoodItem from './FoodItem.vue';
import { ref } from 'vue';

const props = defineProps({
    info: Array
})

const producte = ref('')
console.log(producte)
const producteSeleccionat = (prod) => {
    producte.value = prod
}
</script>

<template>
    <!-- name, type, properties, img -->
    <div class="food-container">
        <FoodItem v-for="p in info" :key="p.name" :nom="p.name" :type="p.type" :properties="p.properties" :img="p.img"
            @seleccionarProducte="producteSeleccionat" />
    </div>
    <div class="ali-select">
        <h1>Aliment seleccionat</h1>
        <div>
            <div>
                <img :src="`/img/${producte.img}`" :alt="producte.name">
                <div>
                    <h2>{{ producte.name }}</h2>
                    <p><strong>Tipus: </strong>{{ producte.type }}</p>
                    <ul>
                        <li v-for="cosa in producte.properties">
                            {{ cosa }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>