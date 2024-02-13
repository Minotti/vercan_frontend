<script setup lang="ts">
import { emptySupplier } from '@/interfaces/supplier/SupplierInterface'
import SupplierForm from '@/pages/suppliers/components/SupplierForm.vue'
import { useSupplierStore } from '@/stores/suppliers/supplierStore'
import _ from 'lodash'

const supplierStore = useSupplierStore()
const { supplier } = storeToRefs(supplierStore)

supplier.value = _.cloneDeep(emptySupplier)
</script>

<template>
  <div>
    <p class="text-2xl mb-6">
      Fornecedores <span class="text-sm text-medium-emphasis">Criar</span>
    </p>
  </div>
  <SupplierForm v-if="supplier" />
</template>
