<script setup>
defineProps({
    listId: {
        required: true,
        type: String
    }
})
</script>

<template>
    listId: {{ listId }}
    <ul>
        <li>a</li>
        <li>b</li>
        <li>c</li>
    </ul>
</template>