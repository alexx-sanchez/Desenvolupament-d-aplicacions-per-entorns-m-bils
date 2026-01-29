<script setup>
import { ref } from 'vue'
import { useBuildStore } from '@/stores/useBuildStore'

const buildStore = useBuildStore()
const actiu = ref(false)

function checkoutAndClose() {
  buildStore.checkout()
  actiu.value = false
}
</script>

<template>
  <div class="container">
    <button class="build-button" @click="actiu = true">
      🖥️ Build ({{ buildStore.totalPrice }} €)
    </button>

    <div v-if="actiu" class="modal">
      <div class="modal-content">
        <div v-for="(items, type) in buildStore.groupedByType" :key="type">
          <h3>{{ type }}</h3>
          <ul>
            <li v-for="item in items" :key="item.name">
              {{ item.name }}
              <span v-if="item.quantity > 1"> x{{ item.quantity }}</span>
              {{ item.price * item.quantity }}€
              <button @click="buildStore.removeComponent(item)">❌</button>
            </li>
          </ul>
        </div>

        <div class="total">
          Total: {{ buildStore.totalPrice }} €
        </div>

        <button class="checkout-button" @click="checkoutAndClose">Checkout</button>
        <button class="close-button" @click="actiu = false">Tancar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  top: 10%;
  right: 1rem;
  z-index: 999;
}


/* Botó Build principal */
.build-button {
  background-color: #3b82f6; /* blau principal de la app */
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
}

.build-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.5);
}

/* Modal fosc */
.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(30, 30, 30, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

/* Contingut del modal */
.modal-content {
  background-color: #ffffff;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 2rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  position: relative;
}

/* Titols de tipus de component */
.modal-content h3 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b; /* gris fosc consistent amb la app */
  border-bottom: 1px solid #e5e7eb; /* gris clar */
  padding-bottom: 0.2rem;
}

/* Llista de components */
.modal-content ul {
  list-style: none;
  padding-left: 0;
  margin: 0.5rem 0 1.5rem 0;
}

.modal-content li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.8rem;
  margin-bottom: 0.4rem;
  border-radius: 6px;
  background-color: #f9fafb; /* gris molt clar */
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* Botó de eliminar component */
.modal-content li button {
  background-color: #fd8e8e;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.modal-content li button:hover {
  background-color: #b91c1c;
}

/* Total */
.modal-content .total {
  font-size: 1.15rem;
  font-weight: 600;
  text-align: right;
  margin-bottom: 1rem;
  color: #1e293b;
}

/* Botons modal */
.modal-content .checkout-button,
.modal-content .close-button {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: all 0.2s ease;
}

.checkout-button {
  background-color: #10b981; /* verd coherent amb accions positives */
  color: white;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4);
}

.checkout-button:hover {
  background-color: #059669;
  transform: scale(1.03);
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.5);
}

.close-button {
  background-color: #e5e7eb; /* gris clar consistent amb UI */
  color: #1e293b;
}

.close-button:hover {
  background-color: #d1d5db;
  transform: scale(1.02);
}
</style>
