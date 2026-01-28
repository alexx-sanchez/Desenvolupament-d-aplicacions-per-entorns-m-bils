<script setup>
import NavBar from '@/components/NavBar.vue'
import CurrentBuildWidget from '@/components/CurrentBuildWidget.vue'
</script>

<template>
  <NavBar />
  <CurrentBuildWidget />
  <RouterView />
</template>