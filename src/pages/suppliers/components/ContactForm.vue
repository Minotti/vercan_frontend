<script setup lang="ts">
import { SupplierContactInterface } from '@/interfaces/supplier/SupplierContactInterface'
import PhoneContact from '@/pages/suppliers/components/PhoneContact.vue'
import EmailContact from '@/pages/suppliers/components/EmailContact.vue'
import { useErrorsStore } from '@/stores/errors/errorsStore'
import type { PropType } from 'vue'
import { provide } from 'vue'

const props = defineProps({
  contact: {
    type: Object as PropType<SupplierContactInterface>,
    required: true,
  },
  contactIndex: {
    type: Number,
    required: true
  }
})

const errorsStore = useErrorsStore()
const { errors } = storeToRefs(errorsStore)

const emit = defineEmits(['addNewContact', 'removeContact'])
provide('indexContact', props.contactIndex)
const isReading = inject('isReading', false)
</script>

<template>
  <v-row v-if="contactIndex > 0">
    <v-col cols="4" lg="6" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium label-required">
        Nome
      </v-label>
      <v-text-field
        v-model="contact.name"
        placeholder="Nome"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :error-messages="errors[`contacts.${contactIndex}.name`]"
        @update:model-value="errorsStore.clearError(`contacts.${contactIndex}.name`)"
      />
    </v-col>

    <v-col cols="4" lg="3" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium">
        Empresa
      </v-label>
      <v-text-field
        v-model="contact.business"
        placeholder="Nome"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :error-messages="errors[`contacts.${contactIndex}.business`]"
        @update:model-value="errorsStore.clearError(`contacts.${contactIndex}.business`)"
      />
    </v-col>

    <v-col cols="4" lg="3" md="4" sm="12">
      <v-label class="mb-2 font-weight-medium">
        Cargo
      </v-label>
      <v-text-field
        v-model="contact.office"
        placeholder="Nome"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :error-messages="errors[`contacts.${contactIndex}.office`]"
        @update:model-value="errorsStore.clearError(`contacts.${contactIndex}.office`)"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6" lg="6" md="6" sm="12">
      <phone-contact
        :contacts="contact.contacts.phone"
        @add-new-phone="emit('addNewContact', {contactIndex: contactIndex, key: 'phone', index: $event})"
        @remove-phone="emit('removeContact', {contactIndex: contactIndex, key: 'phone', index: $event})"
      />
    </v-col>

    <v-col cols="6" lg="6" md="6" sm="12">
      <email-contact
        :contacts="contact.contacts.email"
        @add-new-email="emit('addNewContact', {contactIndex: contactIndex, key: 'email', index: $event})"
        @remove-email="emit('removeContact', {contactIndex: contactIndex, key: 'email', index: $event})"
      />
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">

</style>
