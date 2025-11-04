<script setup>
const prop = defineProps({
    nom: String
})
</script>

<template>
    <div class="plan">
        <div class="description">
            <span class="title"> {{ nom }}</span>
        </div>
    </div>

</template>