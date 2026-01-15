<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";
import { useProductStore } from "./stores/useProductStore.js";
import { useCartStore } from "./stores/useCartStore.js";
import { storeToRefs } from "pinia";

const ProductStore = useProductStore()
ProductStore.fill()
const CartStore = useCartStore()
const { productRef } = storeToRefs(useProductStore())


</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard 
        v-for="product in productRef" 
        :key="product.name" 
        :product="product"
        @addToCart="CartStore.addToCart($event, product)"
      />
    </ul>
  </div>
</template>