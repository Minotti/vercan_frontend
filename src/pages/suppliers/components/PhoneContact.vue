<script setup lang="ts">
import type { PhoneContactInterface } from '@/interfaces/supplier/PhoneContactInterface'
import { useErrorsStore } from '@/stores/errors/errorsStore'
import { contactPhoneTypeComplete } from '@/utils/helpers/autoComplete'
import type { PropType } from 'vue'
import {vMaska} from "maska";
import cellphone from '@/utils/masks/cellphone'
import { inject } from 'vue'

const props = defineProps({
  contacts: {
    type: Array as PropType<PhoneContactInterface[]>,
    required: true
  }
})

const errorsStore = useErrorsStore()
const { errors } = storeToRefs(errorsStore)

const emit = defineEmits(['addNewPhone', 'removePhone'])
const maskCellphone = ref(cellphone)

const indexContact = inject('indexContact', 0)
const isReading = inject('isReading', false)
const indexMessage = (index: number, name = 'phone'): string => `contacts.${indexContact}.contacts.phone.${index}.${name}`
</script>

<template>
  <v-row
    v-for="(contact, index) in contacts"
    :key="index"
  >
    <v-col cols="6">
      <v-label class="mb-2 font-weight-medium label-required">
        Telefone
      </v-label>

      <v-text-field
        v-model="contact.phone"
        placeholder="Digite o Telefone"
        color="primary"
        v-maska:[maskCellphone]
        :error-messages="errors[indexMessage(index)]"
        @update:model-value="errorsStore.clearError(indexMessage(index))"
        hide-details="auto"
        :disabled="isReading"
      />

      <div class="d-flex">
        <a v-if="!isReading"
           href="#"
           class="text-xs"
           @click.prevent="emit('addNewPhone', index)"
        >
          Adicionar
        </a>

        <v-spacer></v-spacer>

        <a v-if="!isReading && index > 0"
           href="#"
           class="text-xs"
           @click.prevent="emit('removePhone', index)"
        >
          Remover
        </a>
      </div>
    </v-col>

    <v-col cols="6">
      <v-label class="mb-2 font-weight-medium label-required">
        Tipo
      </v-label>

      <v-select
        :items="contactPhoneTypeComplete"
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
