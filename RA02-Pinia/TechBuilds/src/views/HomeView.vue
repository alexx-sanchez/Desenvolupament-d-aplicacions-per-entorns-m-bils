<script setup>
import { onMounted } from 'vue'
import { useHardwareStore } from '@/stores/HardwareStore'
import { useBuildStore } from '@/stores/BuildStore'
import ComponentCard from '@/components/ComponentCard.vue'

const hardwareStore = useHardwareStore()
const buildStore = useBuildStore()

onMounted(() => {
  hardwareStore.loadHardware()
})
</script>

<template>
  <div class="home">
    <h2>Catàleg de components</h2>

    <p v-if="hardwareStore.loading">Carregant...</p>

    <div class="catalog">
      <ComponentCard
        v-for="component in hardwareStore.hardware"
        :key="component.name"
        :component="component"
        @add="buildStore.addComponent"
      />
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 1rem 2rem;
  font-family: Arial, sans-serif;
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
