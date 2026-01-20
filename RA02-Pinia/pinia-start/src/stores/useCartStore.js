import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { groupBy } from 'lodash'

export const useCartStore = defineStore('CartStore', () => {

    // STATE
    const items = ref([])

    // GETTERS
    const count = computed(() => items.value.length)
    const isEmpty = computed(() => count.value == 0)
    const grouped = computed(() => {
        const gruper = groupBy(items.value, (item) => item.name)
        const sorted = Object.keys(gruper).sort()
         let inOrder = {}
         sorted.forEach((key) => inOrder[key] = gruper[key])

         return inOrder

    })
    const total = computed(() => items.value.reduce((acumulador, elemento) => acumulador + elemento.price, 0))

    // ACTIONS
    function addToCart(contador, item) {
        const num = parseInt(contador)
        for (let i = 0; i < num; i++) {
            items.value.push(item)
        }
    }

    function $reset() {
        items.value = []
    }

    const clearItem = (itemName) => (items.value = items.value.filter((item) => item.name != itemName));

    const setItemCount = (item, count) => {
        clearItem(item.name)
        addToCart(count, item)
    }

    return { items, addToCart, count, isEmpty, grouped, $reset, total, clearItem, setItemCount }
})