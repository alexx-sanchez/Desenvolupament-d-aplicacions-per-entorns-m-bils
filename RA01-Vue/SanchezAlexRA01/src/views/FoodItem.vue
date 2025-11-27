<script setup>

const props = defineProps({
    nom: String,
    type: String,
    properties: Array,
    img: String
})

const emit = defineEmits(['seleccionarProducte'])

const seleccionarProducte = () => {
     emit('seleccionarProducte', ({name: props.nom, type: props.type, properties: props.properties, img: props.img}))
}

</script>

<template>
    <div>
        <img :src="`/img/${props.img}`" :alt="props.name">
        <div>
            <h2>{{ props.name }}</h2>
            <p><strong>Tipus: </strong>{{ props.type }}</p>
            <button @click="seleccionarProducte" >Veure detall</button>
        </div>
    </div>
</template>