<script setup>
import CategoryList from './CategoryList.vue';
import Cart from './Cart.vue';

import { provide, ref, computed } from 'vue'

const productos = [
    {
        id: 1,
        nom: "Auriculars Pro 🎧",
        preu: 50
    },
    {
        id: 2,
        nom: "Smartwatch Ultra ⌚",
        preu: 120
    },
    {
        id: 3,
        nom: "Teclat Mecànic RGB ⌨️",
        preu: 80
    },
    {
        id: 4,
        nom: "Altaveu Bluetooth Boom 🔊",
        preu: 60
    }
]


provide('productos', productos)

const cart = ref([])

const addToCart = (producte) => {
    cart.value.push(producte)
}

const clearCart = () => {
  cart.value = []
}

const preuTotal = computed(() =>
  cart.value.reduce((total, prod) => total + prod.preu, 0)
)

const totalArticles = computed(() => cart.value.length)

provide('cart', cart)
provide('addToCart', addToCart)
provide('clearCart', clearCart)
provide('preuTotal', preuTotal)
provide('totalArticles', totalArticles)

</script>

<template>
    <h1>Botiga de Gadgets</h1>
    <div class="provide-container">
        <CategoryList />
        <Cart />
    </div>
</template>