<template>
  <div class="q-pa-md">
    <q-toggle
      v-model="value"
      color="primary"
      keep-color
    />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      value: ref(false)
    }
  }
}
</script>
