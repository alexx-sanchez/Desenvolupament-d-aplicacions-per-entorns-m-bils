<script setup>
defineProps({
  component: { type: Object, required: true }
})
const emit = defineEmits(['add'])
</script>

<template>
  <div class="card">
    <img :src="component.image" alt="" class="card-img" />
    <h3>{{ component.name }}</h3>
    <p>Tipus: {{ component.type }}</p>
    <p>Preu: {{ component.price }} €</p>
    <button @click="emit('add', component)">Afegir</button>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 200px;
  text-align: center;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.1);
}

.card-img {
  width: 100%;
  height: 120px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2563eb;
}
</style>
