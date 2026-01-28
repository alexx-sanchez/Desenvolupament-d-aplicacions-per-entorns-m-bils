import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHardwareStore = defineStore('hardware', () => {
  const hardware = ref([])
  const loading = ref(false)

  async function loadHardware() {
    loading.value = true
    const data = await import('@/data/hardware.json')
    hardware.value = data.default
    loading.value = false
  }

  return {
    hardware,
    loading,
    loadHardware
  }
})
