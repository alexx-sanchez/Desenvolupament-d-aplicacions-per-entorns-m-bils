<script setup>
/*
    Camps a agafar: title, description, price, thumbnail
*/

const props = defineProps({
    title: String,
    description: String,
    price: Number,
    thumbnail: String
})
</script>

<template>
    <div class="product-card">
        <img :src="thumbnail" :alt="title" class="product-image">
        <h3 class="product-title">{{ title }}</h3>
        <p class="product-description">{{ description }}</p>
        <p class="product-price">${{ price }}</p>
    </div>
</template>

<style scoped>
.product-card {
    max-width: 250px;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    margin: 10px;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
}

.product-title {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 5px;
}

.product-description {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 10px;
}

.product-price {
    font-size: 1.1rem;
    font-weight: bold;
    color: #4caf50;
}
</style>
