<template>
  <q-page class="flex flex-center column q-pa-lg text-center">

    <h1 class="text-h4 text-white q-mb-sm">Crear compte</h1>
    <p class="text-grey-5 q-mb-lg">Registra't per accedir a tots els equips</p>

    <q-card dark style="background: #0C0F14; border: 1px solid #1e2330; width: 100%; max-width: 400px">
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">

          <q-input
            v-model="form.name"
            label="Nom d'usuari"
            dark outlined color="primary" label-color="grey-5"
            :rules="[val => !!val || 'El nom és obligatori']"
          />

          <q-input
            v-model="form.email"
            label="Correu electrònic"
            type="email"
            dark outlined color="primary" label-color="grey-5"
            :rules="[val => !!val || 'El correu és obligatori']"
          />

          <q-input
            v-model="form.password"
            label="Contrasenya"
            :type="showPassword ? 'text' : 'password'"
            dark outlined color="primary" label-color="grey-5"
            :rules="[val => val.length >= 6 || 'Mínim 6 caràcters']"
          >
            <template #append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer text-grey-5"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <q-btn
            type="submit"
            label="Registrar-se"
            color="primary"
            unelevated rounded
            class="full-width q-py-sm"
          />

          <div class="text-grey-5 text-caption">
            Ja tens compte?
            <router-link to="/login" class="text-primary" style="text-decoration: none">
              Inicia sessió
            </router-link>
          </div>

        </q-form>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({ name: '', email: '', password: '' })
const showPassword = ref(false)

const onSubmit = () => {
  console.log('Form:', form.value)
}
</script>