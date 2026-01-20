import { defineStore } from 'pinia'
import products from '@/data/products.json'
import { ref } from 'vue'

export const useProductStore = defineStore('ProductStore', () => {
    const productRef = ref([])
    // STATE

    // GETTERS

    // ACTIONS
    function fill() {
        productRef.value = products
    }


    return { productRef, fill }
})