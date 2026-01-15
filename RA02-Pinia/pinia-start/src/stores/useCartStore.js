import { defineStore } from 'pinia'
import { ref } from 'vue'

const items = ref([])

export const useCartStore = defineStore('CartStore', () => {

    function addToCart(contador, item) {
        const num = parseInt(contador)
        for (let i = 0; i < num; i++) {
            items.value.push(item)
        }
    }

    return { items, addToCart }
})