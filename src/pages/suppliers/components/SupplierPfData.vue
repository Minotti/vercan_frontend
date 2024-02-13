<script setup lang="ts">
import { useErrorsStore } from "@/stores/errors/errorsStore"
import { useSupplierStore } from '@/stores/suppliers/supplierStore'
import { activeComplete } from '@/utils/helpers/autoComplete'
import cpf from "@/utils/masks/cpf"
import {vMaska} from "maska";

const supplierStore = useSupplierStore()
const { supplier } = storeToRefs(supplierStore)

const errorsStore = useErrorsStore()
const { errors } = storeToRefs(errorsStore)

const maskCpf = ref(cpf)

const isReading = inject('isReading', false)
</script>

<template>
  <v-row v-if="supplier">
    <v-col cols="4" lg="4" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        CPF
      </v-label>
      <v-text-field
        v-model="supplier.cpf_cnpj"
        placeholder="Informe o CPF"
        color="primary"
        v-maska:[maskCpf]
        hide-details="auto"
        :disabled="isReading"
        :readonly="isReading"
        :error-messages="errors.cpf_cnpj"
        @update:model-value="errorsStore.clearError('cpf_cnpj')"
      />
    </v-col>

    <v-col cols="4" lg="4" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        Nome
      </v-label>
      <v-text-field
        v-model="supplier.name"
        placeholder="Digite seu nome"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :readonly="isReading"
        :error-messages="errors.name"
        @update:model-value="errorsStore.clearError('name')"
      />
    </v-col>

    <v-col cols="4" lg="4" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        Apelido
      </v-label>
      <v-text-field
        v-model="supplier.nickname"
        placeholder="Digite seu apelido"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :readonly="isReading"
        :error-messages="errors.nickname"
        @update:model-value="errorsStore.clearError('nickname')"
      />
    </v-col>

    <v-col cols="4" lg="4" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        RG
      </v-label>
      <v-text-field
        v-model="supplier.rg"
        placeholder="Informe seu RG"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :readonly="isReading"
        :error-messages="errors.rg"
        @update:model-value="errorsStore.clearError('rg')"
      />
    </v-col>

    <v-col cols="4" lg="4" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        Ativo
      </v-label>
      <v-select
        v-model="supplier.active"
        :items="activeComplete"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :readonly="isReading"
        :error-messages="errors.active"
        @update:model-value="errorsStore.clearError('active')"
      />
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">

</style>
