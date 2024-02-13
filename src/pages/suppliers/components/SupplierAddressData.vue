<script setup lang="ts">
import { useLocationStore } from '@/stores/cities/locationStore'
import {vMaska} from "maska";
import postcode from '@/utils/masks/postcode'
import { useErrorsStore } from "@/stores/errors/errorsStore"
import { useSupplierStore } from '@/stores/suppliers/supplierStore'
import { makeAutocomplete } from '@/utils/helpers/makeAutocomplete'
import { onMounted } from 'vue'

const supplierStore = useSupplierStore()
const { supplier } = storeToRefs(supplierStore)

const locationStore = useLocationStore()
const { states, cities, loading } = storeToRefs(locationStore)

const errorsStore = useErrorsStore()
const { errors } = storeToRefs(errorsStore)
const maskPostcode = ref(postcode)

const selectedState = ref()

const isReading = inject('isReading', false)

locationStore.listStates()

onMounted(() => {
  selectedState.value = supplier.value.address.city?.state.uf

  if (selectedState.value) {
    listCities()
  }
})

const listCities = function () {
  locationStore.listCitiesByState(selectedState.value)
}

const getAddressByCep = function () {
  locationStore.getAddressByCep(supplier.value.address.postcode).then(data => {
    supplier.value.address.address = data.logradouro
    supplier.value.address.district = data.bairro
    supplier.value.address.city_id = data.city_id
    supplier.value.address.complement = data.complemento
    selectedState.value = data.uf

    errorsStore.clearError(['address.postcode', 'address.address', 'address.number', 'address.district', 'address.city_id'])
  })
}

defineExpose({
  getAddressByCep
})
</script>

<template>
  <v-row v-if="supplier">
    <v-progress-linear indeterminate v-if="loading" />

    <v-col cols="3" lg="3" md="3" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        CEP
      </v-label>
      <v-text-field
        v-model="supplier.address.postcode"
        placeholder="CEP"
        color="primary"
        v-maska:[maskPostcode]
        hide-details="auto"
        :disabled="isReading"
        @focusout.stop="getAddressByCep"
        :error-messages="errors['address.postcode']"
        @update:model-value="errorsStore.clearError('address.postcode')"
      />
    </v-col>

    <v-col cols="3" lg="3" md="3" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        Logradouro
      </v-label>
      <v-text-field
        v-model="supplier.address.address"
        placeholder="Seu endereço. Ex:. Rua ..."
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :error-messages="errors['address.address']"
        @update:model-value="errorsStore.clearError('address.address')"
      />
    </v-col>

    <v-col cols="3" lg="3" md="3" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        Número
      </v-label>
      <v-text-field
        v-model="supplier.address.number"
        placeholder="Número"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :error-messages="errors['address.number']"
        @update:model-value="errorsStore.clearError('address.number')"
      />
    </v-col>

    <v-col cols="3" lg="3" md="3" sm="12">
      <v-label class="mb-2 font-weight-medium">
        Complemento
      </v-label>
      <v-text-field
        v-model="supplier.address.complement"
        placeholder="Complemento"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :error-messages="errors['address.complement']"
        @update:model-value="errorsStore.clearError('address.complement')"
      />
    </v-col>

    <v-col cols="3" lg="3" md="3" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        Bairro
      </v-label>
      <v-text-field
        v-model="supplier.address.district"
        placeholder="Bairro"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :error-messages="errors['address.district']"
        @update:model-value="errorsStore.clearError('address.district')"
      />
    </v-col>

    <v-col cols="3" lg="3" md="3" sm="12">
      <v-label class="mb-2 font-weight-medium">
        Ponto de Referência
      </v-label>
      <v-text-field
        v-model="supplier.address.info"
        placeholder="Ponto de Referência"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :error-messages="errors['address.info']"
        @update:model-value="errorsStore.clearError('address.info')"
      />
    </v-col>

    <v-col cols="3" lg="3" md="3" sm="12">
      <v-label class="mb-2 font-weight-medium">
        UF
      </v-label>
      <v-autocomplete
        v-model="selectedState"
        :items="makeAutocomplete(states, 'uf', 'uf')"
        @update:modelValue="listCities"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
      />
    </v-col>

    <v-col cols="3" lg="3" md="3" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        Cidade
      </v-label>
      <v-autocomplete
        :loading="loading"
        v-model="supplier.address.city_id"
        no-data-text="Selecione um estado"
        :items="makeAutocomplete(cities, 'id', 'name')"
        :error-messages="errors['address.city_id']"
        @update:model-value="errorsStore.clearError('address.city_id')"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
      />
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">

</style>
