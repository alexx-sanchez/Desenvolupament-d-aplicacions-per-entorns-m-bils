import { defineStore } from 'pinia'
import { watch } from 'vue'

const items = []

export const useCartStore = defineStore('CartStore', () => {
    return { items }
})