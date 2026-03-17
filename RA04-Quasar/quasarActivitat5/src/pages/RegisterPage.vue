<template>
  <q-page class="flex items-center justify-center q-pa-md">
    <q-card class="auth-card">
      <q-card-section>
        <h1 class="text-h5 text-white text-center q-mb-lg">Register</h1>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <div>
            <label class="field-label">Nom</label>
            <q-input
              v-model="form.name"
              outlined dark dense
              :rules="[val => !!val || 'Nom és obligatori', val => val.length >= 2 || 'Mínim 2 caràcters']"
              class="form-input"
            />
          </div>
          <div>
            <label class="field-label">Email</label>
            <q-input
              v-model="form.email"
              type="email"
              outlined dark dense
              :rules="[val => !!val || 'Email és obligatori', val => /.+@.+/.test(val) || 'Email no vàlid']"
              class="form-input"
            />
          </div>
          <div>
            <label class="field-label">Password</label>
            <q-input
              v-model="form.password"
              type="password"
              outlined dark dense
              :rules="[val => !!val || 'Password és obligatori', val => val.length >= 8 || 'Mínim 8 caràcters']"
              class="form-input"
            />
          </div>

          <q-btn
            type="submit"
            label="Submit"
            no-caps unelevated
            :loading="loading"
            class="full-width submit-btn q-mt-sm"
          />
        </q-form>

        <div class="q-mt-md q-gutter-sm column">
          <q-btn
            label="Login with Github"
            no-caps outline
            class="full-width github-btn"
            @click="authStore.openInPopup('/auth/github')"
          />
          <q-btn
            to="/login"
            flat no-caps
            label="Ja tens compte? Inicia sessió"
            class="full-width text-grey-5"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()
const loading = ref(false)

const form = ref({ name: '', email: '', password: '' })

async function onSubmit() {
  loading.value = true
  try {
    await authStore.register(form.value.name, form.value.email, form.value.password)
    $q.notify({ type: 'positive', message: 'Usuari registrat correctament' })
    router.push('/login')
  } catch (error) {
    const message = error?.response?.data?.message || 'Error al registrar-se'
    $q.notify({ type: 'negative', message })
  } finally {
    loading.value = false
  }
}

watch(() => authStore.loggedIn, (val) => {
  if (val) router.push('/admin')
})
</script>

<style scoped>
.auth-card {
  width: 100%;
  max-width: 448px;
  background: #0C0F14;
  border: 1px solid #1F2937;
  border-radius: 12px;
  padding: 1.5rem;
}
.field-label {
  color: #d1d5db;
  font-size: 0.875rem;
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
}
.form-input :deep(.q-field__control) { background: #050709; border-color: #1F2937; }
.form-input :deep(.q-field__native) { color: white; }
.submit-btn {
  background: #E10600 !important;
  color: white !important;
  padding: 0.625rem;
  border-radius: 8px;
  font-weight: 600;
}
.submit-btn:hover { background: #B80000 !important; }
.github-btn {
  border-color: #1F2937 !important;
  color: white !important;
  border-radius: 8px;
}
</style>
