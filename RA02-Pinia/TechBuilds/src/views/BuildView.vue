<script setup>
import { useBuildStore } from '@/stores/BuildStore'
const buildStore = useBuildStore()
</script>

<template>
  <div class="build-view">
    <h2>El teu muntatge</h2>

    <p v-if="buildStore.components.length === 0">
      No has afegit cap component encara.
    </p>

    <div v-else>
      <div
        v-for="(items, type) in buildStore.groupedByType"
        :key="type"
        class="component-type"
      >
        <h3>{{ type }}</h3>
        <ul>
          <li v-for="(item, index) in items" :key="index">
            {{ item.name }} - {{ item.price }} €
            <button @click="buildStore.removeComponent(index)">❌</button>
          </li>
        </ul>
      </div>

      <div class="total">
        Total: {{ buildStore.totalPrice }} €
      </div>

      <button @click="buildStore.checkout">Checkout</button>
    </div>
  </div>
</template>

<style scoped>
.build-view {
  padding: 1rem 2rem;
  font-family: Arial, sans-serif;
}

.component-type {
  margin-bottom: 1rem;
}

.component-type ul {
  list-style: none;
  padding-left: 0;
}

.component-type li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

button {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

.total {
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: right;
}
</style>
