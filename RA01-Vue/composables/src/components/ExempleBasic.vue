<script setup>
import { useCounter } from '@/composables/useCounter';

const { count, increment, decrement } = useCounter()
</script>

<template>
    <div class="counter">
        <h1>Exemple</h1>
        <p class="count">Compte: {{ count }}</p>
        <div class="buttons">
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
        </div>
    </div>
</template>

<style scoped>
.counter {
    max-width: 200px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid #4caf50;
    border-radius: 10px;
    text-align: center;
    background-color: #f0fff0;
    font-family: Arial, sans-serif;
}

.count {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #333;
}

.buttons button {
    width: 40px;
    height: 40px;
    margin: 0 5px;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
}

.buttons button:hover {
    background-color: #45a049;
}
</style>
