<script setup lang="ts">
import SupplierForm from '@/pages/suppliers/components/SupplierForm.vue'
import { useSupplierStore } from '@/stores/suppliers/supplierStore'

const route = useRoute()
const supplierStore = useSupplierStore()
const { supplier } = storeToRefs(supplierStore)

supplierStore.find(route.params.id)
</script>

<template>
  <div>
    <p class="text-2xl mb-6">
      Fornecedores <span class="text-sm text-medium-emphasis">Ver</span>
    </p>
  </div>
  <SupplierForm v-if="supplier" read />
</template>
