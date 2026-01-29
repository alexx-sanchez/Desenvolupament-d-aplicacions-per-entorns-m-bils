import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import groupBy from 'lodash/groupBy'

export const useBuildStore = defineStore('build', () => {
  // Estat: un sol item per producte
  const components = useLocalStorage('pc-build', [])

  // Total
  const totalPrice = computed(() =>
    components.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  )

  // Agrupats per tipus (CPU, GPU, RAM...)
  const groupedByType = computed(() =>
    groupBy(components.value, 'type')
  )

  // Afegir component
  function addComponent(component) {
    const existing = components.value.find(
      c => c.name === component.name
    )

    if (existing) {
      existing.quantity++
    } else {
      components.value.push({
        ...component,
        price: Number(component.price),
        quantity: 1
      })
    }
  }

  // Eliminar component
  function removeComponent(item) {
    if (item.quantity > 1) {
      item.quantity--
    } else {
      components.value = components.value.filter(
        c => c.name !== item.name
      )
    }
  }

  // Checkout
  function checkout() {
    alert(`Compra finalitzada: ${totalPrice.value}€`)
    components.value = []
  }

  return { components, totalPrice, groupedByType, addComponent, removeComponent, checkout }
})
