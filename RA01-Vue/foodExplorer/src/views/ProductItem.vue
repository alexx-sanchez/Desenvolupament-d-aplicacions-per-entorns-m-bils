<script setup>
import { inject } from 'vue';

const props = defineProps({
    id: Number,
    nom: String,
    preu: Number
});

const addToCart = inject('addToCart')

const afegirProducte = () => {
    addToCart({ id: props.id, nom: props.nom, preu: props.preu })
}
</script>

<template>
    <div class="provide-product">
        <div class="provide-product-info">
            <p> {{ nom }} </p>
            <p> {{ preu }} € </p>
        </div>
        <button @click="afegirProducte">Add to cart</button>
    </div>

</template>