<template>
  <q-layout view="hHh lpR fFf">

    <q-header>
      <NavBar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import NavBar from 'src/components/NavBar.vue'
</script>