<script setup>
import { inject } from 'vue'

const cart = inject('cart')
const clearCart = inject('clearCart')
const preuTotal = inject('preuTotal')
const totalArticles = inject('totalArticles')
</script>

<template>
  <div class="cart-container">
    <div class="cart-header">
      <h1>Carrito</h1>
      <button @click="clearCart">Buidar carrito</button>
    </div>

    <div v-for="prod in cart" :key="prod.id">
      <p>{{ prod.nom }} - {{ prod.preu }} €</p>
    </div>

    <p><strong>Total d’articles:</strong> {{ totalArticles }}</p>

    <div class="cart-footer">
      Total - {{ preuTotal }} €
    </div>
  </div>
</template>