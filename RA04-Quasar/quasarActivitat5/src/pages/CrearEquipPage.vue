<template>
  <q-page class="flex items-center justify-center q-pa-md">
    <q-card class="form-card">
      <q-card-section>
        <h1 class="text-h5 text-white text-center q-mb-xs">Crear Equip</h1>
        <p class="text-center text-grey-5 text-caption q-mb-lg">
          Afegeix un nou equip al teu projecte F1
        </p>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <div>
            <label class="field-label">Nom</label>
            <q-input v-model="form.name" outlined dark dense class="form-input"
              :rules="[val => !!val || 'Obligatori', val => val.length >= 2 || 'Mínim 2 caràcters']" />
          </div>
          <div>
            <label class="field-label">País</label>
            <q-input v-model="form.country" outlined dark dense class="form-input"
              :rules="[val => !!val || 'Obligatori', val => val.length >= 2 || 'Mínim 2 caràcters']" />
          </div>
          <div>
            <label class="field-label">Campeonats del món</label>
            <q-input v-model.number="form.worldChampionships" type="number" outlined dark dense class="form-input"
              :rules="[val => val >= 0 || 'Ha de ser 0 o més']" />
          </div>
          <div>
            <label class="field-label">Foto (URL)</label>
            <q-input v-model="form.photo" outlined dark dense class="form-input"
              :rules="[val => !!val || 'Obligatori', val => isValidUrl(val) || 'Ha de ser una URL vàlida']" />
          </div>

          <q-btn
            type="submit" label="Crear equip"
            no-caps unelevated :loading="loading"
            class="full-width submit-btn q-mt-sm"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'

const router = useRouter()
const $q = useQuasar()
const loading = ref(false)

const form = ref({ name: '', country: '', worldChampionships: 0, photo: '' })

const isValidUrl = (url) => { try { new URL(url); return true } catch { return false } }

async function onSubmit() {
  loading.value = true
  try {
    await api.post('/api/teams', form.value)
    $q.notify({ type: 'positive', message: 'Equip creat correctament' })
    router.push('/equips')
  } catch (error) {
    const message = error?.response?.data?.message || "Error al crear l'equip"
    $q.notify({ type: 'negative', message })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-card {
  width: 100%; max-width: 448px;
  background: #0C0F14;
  border: 1px solid #1F2937;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
}
.field-label { color: #d1d5db; font-size: 0.875rem; font-weight: 500; display: block; margin-bottom: 4px; }
.form-input :deep(.q-field__control) { background: #050709; border-color: #1F2937; }
.form-input :deep(.q-field__native) { color: white; }
.submit-btn { background: #E10600 !important; color: white !important; padding: 0.625rem; border-radius: 8px; font-weight: 600; }
.submit-btn:hover { background: #B80000 !important; }
</style>
