import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import groupBy from 'lodash/groupBy'

export const useBuildStore = defineStore('build', () => {
  const components = useLocalStorage('pc-build', [])

  const totalPrice = computed(() =>
    components.value.reduce((sum, c) => sum + c.price, 0)
  )

  const groupedByType = computed(() => {
    const grouped = groupBy(components.value, 'type')
    // Comptar quantitats per nom
    const result = {}
    for (const type in grouped) {
      const items = grouped[type]
      const countMap = {}
      items.forEach(item => {
        if (!countMap[item.name]) {
          countMap[item.name] = { ...item, quantity: 1 }
        } else {
          countMap[item.name].quantity += 1
        }
      })
      result[type] = Object.values(countMap)
    }
    return result
  })

  function addComponent(component) {
    components.value.push(component)
  }

  function removeComponent(index, type) {
    // Ara cal trobar l’índex real dins de components.value
    const grouped = groupBy(components.value, 'type')
    const items = grouped[type] || []
    let count = 0
    for (let i = 0; i < components.value.length; i++) {
      if (components.value[i].name === items[index].name) {
        components.value.splice(i, 1)
        break
      }
    }
  }

  function checkout() {
    alert(`Compra finalitzada: ${totalPrice.value}€`)
    components.value = []
  }

  return {
    components,
    totalPrice,
    groupedByType,
    addComponent,
    removeComponent,
    checkout
  }
})
