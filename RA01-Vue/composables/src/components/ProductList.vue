<script setup>
import { useFetch } from '@/composables/useFetch';
import ProductItem from './ProductItem.vue';

const { data, error, loading, fetchData } = useFetch('https://dummyjson.com/products');

</script>

<template>
    <h1>Llista de productes</h1>
    <div v-if="loading">
        Carregant...
    </div>
    <div v-else-if="error">
        {{ error }}
    </div>
    <div v-else class="container">
        <ProductItem v-for="p in data.products" 
                :key="p.id"
                :title="p.title"
                :description="p.description"
                :price="p.price"
                :thumbnail="p.thumbnail"
        />
    </div>
</template>

<style scoped>
    h1 {
        text-align: center;
    }
    h1:hover {
        color: green;
        cursor: crosshair;
    }
    .container {
        display: flex;
        flex-wrap: wrap;
    }
</style>