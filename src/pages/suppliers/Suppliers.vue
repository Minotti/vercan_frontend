<script setup lang="ts">
import SimpleConfirm from '@/components/SimpleConfirm.vue'
import { SupplierTypeEnum } from '@/enums/SupplierTypeEnum'
import { SupplierInterface } from '@/interfaces/supplier/SupplierInterface'
import { useSupplierStore } from '@/stores/suppliers/supplierStore'
import cpfCnpj from '@/utils/masks/cpfCnpj'
import { maskAny } from "@/utils/helpers/mask"
import { SUPPLIER_DELETED } from '@/utils/messages/supplier/supplierMessages'
import { toast } from 'vue3-toastify'

const supplierStore = useSupplierStore()
const { suppliers, loading } = storeToRefs(supplierStore)
const maskCpfCnpj = ref(cpfCnpj)

supplierStore.list()

const headers = ref([
  { title: 'Razão Social / Nome', key: 'legal_name', width: '30%' },
  { title: 'Nome Fantasia / Apelido', key: 'trade_name', width: '30%' },
  { title: 'CNPJ / CPF', key: 'cpf_cnpj', width: '15%' },
  { title: 'Ativo', key: 'active', width: '10%' },
  { title: 'Ações', key: 'actions', align: 'end', width: '15%' },
])

const dialogConfirmDelete = ref(false)
const supplierSeleted = ref()
const search = ref('')

const openDialogConfirmDelete = function (supplier: SupplierInterface) {
  supplierSeleted.value = supplier
  dialogConfirmDelete.value = true
}

const supplierName = computed(() => supplierSeleted.value ? (supplierSeleted.value.type === SupplierTypeEnum._PJ ? supplierSeleted.value.legal_name : supplierSeleted.value.name) :
    '')

const confirmDelete = function () {
  supplierStore.delete(supplierSeleted.value.id).then(() => {
    toast.success(SUPPLIER_DELETED)

    dialogConfirmDelete.value = false
    supplierSeleted.value = null
  })
}
</script>

<template>
  <div class="d-flex">
    <p class="text-2xl mb-6">
      Fornecedores <span class="text-sm text-medium-emphasis">Painel de Controle</span>
    </p>

    <v-spacer></v-spacer>

    <v-btn color="primary" prepend-icon="mdi-plus" :to="{ name: 'supplier.create' }">Cadastrar</v-btn>
  </div>
  <v-card elevation="10" :loading="loading">
    <v-card-text>
      <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" hide-details="auto" class="mb-5" placeholder="Busque por Nome, Razão Social, Apelido, CNPJ/CPF..." />

      <VDataTable items-per-page-text="Items por página" :headers="headers" :loading="loading" :items="suppliers" :search="search">
        <template #item.legal_name="{ item }">
          {{ item.raw.type === SupplierTypeEnum._PF ? item.raw.name : item.raw.legal_name }}
        </template>

        <template #item.trade_name="{ item }">
          {{ item.raw.type === SupplierTypeEnum._PF ? item.raw.nickname : item.raw.trade_name }}
        </template>

        <template #item.cpf_cnpj="{ item }">
          {{ maskAny(item.raw.cpf_cnpj, maskCpfCnpj) }}
        </template>

        <template #item.active="{ item }">
          <v-chip :color="item.raw.active ? 'success' : 'error'">
            {{ item.raw.active ? 'Sim' : 'Não' }}
          </v-chip>
        </template>

        <template #item.actions="{ item }">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-icon
                color="primary"
                v-bind="props"
                icon="mdi-menu-down"
              >
              </v-icon>
            </template>

            <v-list>
              <v-list-item :to="{ name: 'supplier.read', params: { id: item.raw.id } }">
                <v-list-item-title>Ver</v-list-item-title>
              </v-list-item>
              <v-list-item :to="{ name: 'supplier.edit', params: { id: item.raw.id } }">
                <v-list-item-title>Editar</v-list-item-title>
              </v-list-item>
              <v-list-item @click="openDialogConfirmDelete(item.raw)">
                <v-list-item-title>Excluir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </VDataTable>
    </v-card-text>

    <simple-confirm :dialog="dialogConfirmDelete"
                    @close="dialogConfirmDelete = false"
                    @confirm="confirmDelete"
                    :loading="loading"
    >
      <template #default>
        Tem certeza que deseja excluir o fornecedor <strong>{{ supplierName }}</strong>?
      </template>
    </simple-confirm>
  </v-card>
</template>
