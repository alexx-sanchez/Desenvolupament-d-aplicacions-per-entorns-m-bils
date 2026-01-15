import { defineStore } from 'pinia'
import products from '@/data/products.json'
import { ref } from 'vue'

export const useProductStore = defineStore('ProductStore', () => {
    // const productRef = ref(products)

    const productRef = ref([])

    function fill() {
        productRef.value = products
    }
    

    return { productRef, fill }
})