<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";
import { useProductStore } from "./stores/useProductStore.js";
import { useCartStore } from "./stores/useCartStore.js";

const ProductStore = useProductStore()
const CartStore = useCartStore()
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in ProductStore.products"
        :key="product.name"
        :product="product"
        @addToCart="CartStore.items.push(product)"
      />
    </ul>
  </div>
</template>