<script setup lang="ts">
import type { EmailContactInterface } from '@/interfaces/supplier/EmailContactInterface'
import { useErrorsStore } from '@/stores/errors/errorsStore'
import { contactEmailTypeComplete } from '@/utils/helpers/autoComplete'
import { inject } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  contacts: {
    type: Array as PropType<EmailContactInterface[]>,
    required: true
  }
})

const emit = defineEmits(['addNewEmail', 'removeEmail'])

const errorsStore = useErrorsStore()
const { errors } = storeToRefs(errorsStore)

const indexContact = inject('indexContact', 0)
const isReading = inject('isReading', false)
const indexMessage = (index: number, name = 'email'): string => `contacts.${indexContact}.contacts.email.${index}.${name}`
</script>

<template>
  <v-row
    v-for="(contact, index) in contacts"
    :key="index"
  >
    <v-col cols="6">
      <v-label class="mb-2 font-weight-medium">
        E-mail
      </v-label>

      <v-text-field
        v-model="contact.email"
        type="email"
        placeholder="Digite o E-mail"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :error-messages="errors[indexMessage(index)]"
        @update:model-value="errorsStore.clearError(indexMessage(index))"
      />

      <div class="d-flex">
        <a v-if="!isReading"
           href="#"
           class="text-xs"
           @click.prevent="emit('addNewEmail', index)"
        >
          Adicionar
        </a>

        <v-spacer></v-spacer>

        <a v-if="!isReading && index > 0"
           href="#"
           class="text-xs"
           @click.prevent="emit('removeEmail', index)"
        >
          Remover
        </a>
      </div>
    </v-col>

    <v-col cols="6">
      <v-label class="mb-2 font-weight-medium">
        Tipo
      </v-label>

      <v-select
        :items="contactEmailTypeComplete"
        v-model="contact.type"
        color="primary"
        hide-details="auto"
        :disabled="isReading"
        :error-messages="errors[indexMessage(index, 'type')]"
        @update:model-value="errorsStore.clearError(indexMessage(index, 'type'))"
      />
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">

</style>
