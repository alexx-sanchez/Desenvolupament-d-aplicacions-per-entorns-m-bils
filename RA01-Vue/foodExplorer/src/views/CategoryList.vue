<script setup>
import ProductItem from './ProductItem.vue';

import { inject } from 'vue';

const productos = inject('productos')
</script>

<template>
    <div class="provide-list-container">
        <h2>Productes</h2>
        <ProductItem 
            v-for="prod in productos" :key="prod.id" 
            :nom="prod.nom" 
            :preu="prod.preu" 
            :id="prod.id" 
        />
    </div>
</template>