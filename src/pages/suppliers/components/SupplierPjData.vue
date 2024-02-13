<script setup lang="ts">
import { SupplierIeIndicatorEnum } from '@/enums/SupplierIeIndicatorEnum'
import { useErrorsStore } from "@/stores/errors/errorsStore"
import { useSupplierStore } from '@/stores/suppliers/supplierStore'
import axios from '@/utils/axios'
import { activeComplete, ieIndicatorComplete, supplierGatheringComplete } from '@/utils/helpers/autoComplete'
import cnpj from "@/utils/masks/cnpj"
import {vMaska} from "maska";

const emit = defineEmits(['postcodeChanged'])

const supplierStore = useSupplierStore()
const { supplier } = storeToRefs(supplierStore)

const errorsStore = useErrorsStore()
const { errors } = storeToRefs(errorsStore)

const maskCnpj = ref(cnpj)
const cnpjStatus = ref()
const lastFetchCnpj = ref()

const cleanCnpj = computed(() => {
  return supplier.value.cpf_cnpj.match(/\d+/g).join('')
})

const fetchingData = ref(false)

const isReading = inject('isReading', false)

const fetchDataCnpj = async function () {
  if (lastFetchCnpj.value !== cleanCnpj.value) {
    fetchingData.value = true

    await axios.get(`consulta/cnpj/${cleanCnpj.value}`).then(res => {
      cnpjStatus.value = res.data.situacao

      if (supplier.value) {
        supplier.value.legal_name = res.data.nome
        supplier.value.trade_name = res.data.fantasia

        if (res.data.cep !== supplier.value.address.postcode) {
          supplier.value.address.postcode = res.data.cep
          emit('postcodeChanged')
        }
      }

      lastFetchCnpj.value = cleanCnpj.value
      fetchingData.value = false
    }).catch(() => {
      fetchingData.value = false
    })
  }
}
</script>

<template>
  <v-row v-if="supplier">
    <v-progress-linear indeterminate v-if="fetchingData" />

    <v-col cols="4" lg="3" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        CNPJ
      </v-label>
      <v-text-field
          v-model="supplier.cpf_cnpj"
          @focusout="fetchDataCnpj"
          placeholder="Informe o CNPJ"
          color="primary"
          v-maska:[maskCnpj]
          hide-details="auto"
          :disabled="isReading"
          :error-messages="errors.cpf_cnpj"
          @update:model-value="errorsStore.clearError('cpf_cnpj')"
      />
    </v-col>

    <v-col cols="4" lg="6" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        Razão Social
      </v-label>
      <v-text-field
          v-model="supplier.legal_name"
          placeholder="Digite a Razão Social"
          color="primary"
          hide-details="auto"
          :disabled="isReading"
          :error-messages="errors.legal_name"
          @update:model-value="errorsStore.clearError('legal_name')"
      />
    </v-col>

    <v-col cols="4" lg="3" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        Nome Fantasia
      </v-label>
      <v-text-field
          v-model="supplier.trade_name"
          placeholder="Digite o Nome Fantasia"
          color="primary"
          hide-details="auto"
          :disabled="isReading"
          :error-messages="errors.trade_name"
          @update:model-value="errorsStore.clearError('trade_name')"
      />
    </v-col>

    <v-col cols="4" lg="3" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        Indicador de Inscrição Estadual
      </v-label>
      <v-select
          v-model="supplier.ie_indicator"
          :items="ieIndicatorComplete"
          color="primary"
          hide-details="auto"
          :disabled="isReading"
          :error-messages="errors.ie_indicator"
          @update:model-value="errorsStore.clearError(['ie_indicator', 'ie'])"
      />
    </v-col>

    <v-col cols="4" lg="3" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium" :class="{'label-required': supplier.ie_indicator !== SupplierIeIndicatorEnum._nao_contribuinte}">
        Inscrição Estadual
      </v-label>
      <v-text-field
          v-model="supplier.ie"
          :disabled="supplier.ie_indicator === SupplierIeIndicatorEnum._nao_contribuinte || isReading"
          placeholder="Digite a Inscrição Estadual"
          color="primary"
          hide-details="auto"
          :error-messages="errors.ie"
          @update:model-value="errorsStore.clearError('ie')"
      />
    </v-col>

    <v-col cols="4" lg="3" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium">
        Inscrição Municipal
      </v-label>
      <v-text-field
          v-model="supplier.im"
          placeholder="Digite a Inscrição Municipal"
          color="primary"
          hide-details="auto"
          :disabled="isReading"
          :error-messages="errors.im"
          @update:model-value="errorsStore.clearError('im')"
      />
    </v-col>

    <v-col cols="4" lg="3" md="4" sm="12" v-if="!supplier.id">
      <v-label class="mb-2 font-weight-medium">
        Situação CNPJ
      </v-label>
      <v-text-field
          v-model="cnpjStatus"
          disabled
          readonly
          color="primary"
          hide-details="auto"
      />
    </v-col>

    <v-col cols="4" lg="3" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        Recolhimento
      </v-label>
      <v-select
          v-model="supplier.gathering"
          :items="supplierGatheringComplete"
          color="primary"
          hide-details="auto"
          :disabled="isReading"
          :error-messages="errors.gathering"
          @update:model-value="errorsStore.clearError('gathering')"
      />
    </v-col>

    <v-col cols="4" lg="3" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium">
        Ativo
      </v-label>
      <v-select
          v-model="supplier.active"
          :items="activeComplete"
          color="primary"
          hide-details="auto"
          :disabled="isReading"
          :error-messages="errors.active"
          @update:model-value="errorsStore.clearError('active')"
      />
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">

</style>
