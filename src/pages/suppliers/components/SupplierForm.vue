<script setup lang="ts">
import { EmailContactTypeEnum } from '@/enums/EmailContactTypeEnum'
import { PhoneContactTypeEnum } from '@/enums/PhoneContactTypeEnum'
import { EventContactInterface } from '@/interfaces/common/EventContactInterface'
import ContactForm from '@/pages/suppliers/components/ContactForm.vue'
import SupplierAddressData from '@/pages/suppliers/components/SupplierAddressData.vue'
import SupplierPfData from '@/pages/suppliers/components/SupplierPfData.vue'
import SupplierPjData from '@/pages/suppliers/components/SupplierPjData.vue'
import { SupplierTypeEnum } from '@/enums/SupplierTypeEnum'
import { router } from '@/router'
import { useErrorsStore } from '@/stores/errors/errorsStore'
import { useSupplierStore } from '@/stores/suppliers/supplierStore'
import { FORM_ERRORS } from '@/utils/messages/general/generalMessages'
import { SUPPLIER_CREATED, SUPPLIER_UPDATED } from '@/utils/messages/supplier/supplierMessages'
import { computed } from 'vue'
import { toast } from 'vue3-toastify'

const props = defineProps({
  read: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const supplierStore = useSupplierStore()
const { supplier, loading } = storeToRefs(supplierStore)

const errorsStore = useErrorsStore()
const { errors, hasError } = storeToRefs(errorsStore)

const panels = ref(['supplier_data', 'contact', 'additional_contacts', 'address', 'observations'])

const addressData = ref()

const isReading = computed(() => route.name === 'supplier.read')

const isEditing = computed(() => {
  return !!supplier.value?.id
})

const isPF = computed(() => {
  return supplier.value?.type === SupplierTypeEnum._PF
})

const addNewContact = function (event: EventContactInterface) {
  supplier.value?.contacts[event.contactIndex].contacts[event.key].push({
    phone: '',
    type: PhoneContactTypeEnum._commercial
  })
}

const removeContact = function (event: EventContactInterface) {
  supplier.value?.contacts[event.contactIndex].contacts[event.key].splice(event.index, 1)
}

const addNewAdditionalContact = function () {
  supplier.value?.contacts.push({
    additional: true,
    name: '',
    contacts: {
      phone: [{phone: '', type: PhoneContactTypeEnum._commercial}],
      email: [{email: '', type: EmailContactTypeEnum._commercial}]
    }
  })
}

const removeAdditionalContact = function (contactIndex: number) {
  supplier.value?.contacts.splice(contactIndex, 1)
}

const save = function () {
  if (isEditing.value) {
    supplierStore.update().then(() => {
      nextTick(() => {
        router.push({ name: 'suppliers' }).then(() => {
          toast.success(SUPPLIER_UPDATED)
        })
      })
    })
  } else {
    supplierStore.store().then(() => {
      nextTick(() => {
        router.push({ name: 'suppliers' }).then(() => {
          toast.success(SUPPLIER_CREATED)
        })
      })
    })
  }
}

provide('isReading', isReading.value)

onMounted(() => {
  errorsStore.clearAll()
})

watch(() => supplier.value?.cpf_cnpj, () => {
  errorsStore.clearAll()
})

watch(() => supplier.value?.type, () => {
  errorsStore.clearAll()
})
</script>

<template>
  <v-card elevation="10">
    <v-card-text v-if="supplier">
      <v-expansion-panels v-model="panels" multiple>
        <v-expansion-panel title="Dados do Fornecedor" value="supplier_data">
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12">
                <v-radio-group
                  v-model="supplier.type"
                  inline
                  :disabled="isEditing || isReading"
                >
                  <v-radio
                    :label="SupplierTypeEnum.PJ"
                    :value="SupplierTypeEnum._PJ"
                  />
                  <v-radio
                      :label="SupplierTypeEnum.PF"
                      :value="SupplierTypeEnum._PF"
                  />
                </v-radio-group>
              </v-col>
            </v-row>

            <supplier-pf-data v-if="isPF" />
            <supplier-pj-data v-else @postcode-changed="addressData.getAddressByCep()" />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="Contato Principal" value="contact">
          <v-expansion-panel-text>
            <contact-form
              :contact="supplier.contacts[0]"
              :contact-index="0"
              @add-new-contact="addNewContact($event)"
              @remove-contact="removeContact($event)"
            />
            <p v-if="errors['contacts']" class="text-error text-xs" v-text="errors['contacts']" />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="Contatos Adicionais" value="additional_contacts">
          <v-expansion-panel-text>
            <div v-for="(contact, index) in supplier.contacts.filter((c, idx) => idx !== 0)" :key="index" :class="{'mt-5': index > 0}">
              <contact-form
                  :contact="contact"
                  :contact-index="index + 1"
                  @add-new-contact="addNewContact($event)"
                  @remove-contact="removeContact($event)"
              />

              <div class="d-flex justify-end align-center" v-if="!isReading">
                <v-divider></v-divider>
                <v-btn density="compact"
                       variant="outlined"
                       @click="removeAdditionalContact(index)"
                       color="primary"
                       class="ml-5 px-3 py-1 text-lowercase"
                       size="xs">
                  remover contato
                </v-btn>
              </div>
            </div>
            <div class="d-flex justify-center mt-5" v-if="!isReading">
              <v-btn class="primary" @click="addNewAdditionalContact">Novo contato adicional</v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="Dados do Endereço" value="address">
          <v-expansion-panel-text>
            <supplier-address-data ref="addressData" />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="Observações" value="observations">
          <v-expansion-panel-text>
            <VuetifyTiptap :disabled="isReading" v-model="supplier.observation" rounded @update:modelValue="errorsStore.clearError('observation')" />
            <p v-if="errors['observation']" class="text-error text-xs" v-text="errors['observation']" />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn v-if="read" color="primary" variant="elevated" :to="{ name: 'supplier.edit', params: { id: supplier?.id } }">
        Editar
      </v-btn>

      <v-btn v-else color="primary" variant="elevated" @click="save" :loading="loading" :disabled="loading">
        Salvar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
