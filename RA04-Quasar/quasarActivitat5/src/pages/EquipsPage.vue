<template>
  <q-page class="q-py-lg q-px-md">
    <div class="equips-container">

      <q-btn
        to="/admin"
        flat icon="mdi-arrow-left"
        label="Tornar a l'Administració"
        no-caps class="text-grey-5 q-mb-md"
      />

      <div class="row justify-between items-center q-mb-lg">
        <div>
          <h1 class="text-h4 text-white text-weight-bold q-mb-xs">Equips</h1>
          <p class="text-grey-6 text-caption">Gestiona els teus equips de F1</p>
        </div>
        <q-btn
          to="/crearEquip"
          icon="mdi-plus"
          label="Nou equip"
          no-caps unelevated
          class="primary-btn"
        />
      </div>

      <div v-if="equips.length" class="row q-col-gutter-md">
        <div
          v-for="equip in equips"
          :key="equip.id"
          class="col-12 col-sm-6 col-lg-4"
        >
          <q-card class="equip-card">
            <div class="equip-image-wrapper">
              <img :src="equip.photo" :alt="equip.name" class="equip-image" />
            </div>

            <q-card-section class="q-pb-sm">
              <h3 class="text-white text-weight-bold q-mb-sm">{{ equip.name }}</h3>
              <div class="row q-gutter-xs">
                <q-badge class="country-badge" :label="equip.country" />
                <q-badge outline class="champs-badge" :label="`${equip.worldChampionships} campionats`" />
              </div>
            </q-card-section>

            <q-separator dark />

            <q-card-actions class="equip-actions">
              <q-btn
                :to="`/editarEquip?id=${equip.id}`"
                label="Modifica"
                no-caps outline
                class="col edit-btn"
              />
              <q-btn
                icon="mdi-delete"
                outline
                class="delete-btn"
                @click="deleteEquip(equip.id)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <div v-else class="empty-state">
        <p class="text-grey-5 text-body1 text-weight-medium">Encara no tens equips.</p>
        <p class="text-grey-6 text-caption q-mb-md">Crea el teu primer equip per començar.</p>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'

const $q = useQuasar()
const equips = ref([])

const fetchEquips = async () => {
  const { data } = await api.get('/api/teams')
  equips.value = data
}

async function deleteEquip(id) {
  try {
    await api.delete('/api/teams', { data: { id } })
    $q.notify({ type: 'positive', message: 'Equip eliminat' })
    await fetchEquips()
  } catch {
    $q.notify({ type: 'negative', message: "Error en eliminar l'equip" })
  }
}

onMounted(fetchEquips)
</script>

<style scoped>
.equips-container { max-width: 1152px; margin: 0 auto; }
.primary-btn {
  background: #E10600 !important;
  color: white !important;
  font-weight: 500;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
}
.primary-btn:hover { background: #B80000 !important; }
.equip-card {
  background: #0C0F14;
  border: 1px solid #1F2937;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}
.equip-card:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
.equip-image-wrapper { width: 100%; height: 144px; overflow: hidden; }
.equip-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
.equip-card:hover .equip-image { transform: scale(1.05); }
.country-badge { background: #E10600 !important; color: white; font-weight: 500; padding: 4px 10px; border-radius: 6px; }
.champs-badge { background: #111827 !important; color: #d1d5db !important; border-color: #1F2937 !important; padding: 4px 10px; border-radius: 6px; }
.equip-actions { background: #050709; padding: 0.75rem 1rem; gap: 0.75rem; }
.edit-btn { border-color: #E10600 !important; color: #E10600 !important; border-radius: 8px; }
.edit-btn:hover { background: #E10600 !important; color: white !important; }
.delete-btn { border-color: #dc2626 !important; color: #dc2626 !important; border-radius: 8px; }
.delete-btn:hover { background: #dc2626 !important; color: white !important; }
.empty-state {
  text-align: center;
  padding: 5rem 0;
  background: #0C0F14;
  border-radius: 12px;
  border: 1px dashed #1F2937;
  margin-top: 2rem;
}
</style>
