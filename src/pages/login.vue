<script setup>
import { useAuthStore } from '@/stores/auth/authStore'
import { useErrorsStore } from '@/stores/errors/errorsStore'
import logo from '@images/logo.png?v=1'

const form = ref({
  email: '',
  password: '',
})

const isPasswordVisible = ref(false)
const authStore = useAuthStore()
const { loading } = storeToRefs(authStore)

const errorsStore = useErrorsStore()
const { errors } = storeToRefs(errorsStore)

const unauthorized = ref(false)
const login = async function () {
  unauthorized.value = false
  await authStore.login(form.value.email, form.value.password).catch(() => unauthorized.value = true)
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      width="450"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
              class="d-flex text-primary"
            >
              <img :src="logo" alt="Logo">
            </div>
          </div>
        </template>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Bem vindo (a)! 👋🏻
        </h5>
        <p class="mb-0">
          Preencha os dados abaixo para entrar!
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                autofocus
                placeholder="seuemail@email.com"
                :error-messages="errors['email']"
                @update:model-value="errorsStore.clearError('email')"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Senha"
                placeholder="*********"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                :error-messages="errors['password']"
                @update:model-value="errorsStore.clearError('password')"
              />

              <!-- login button -->
              <v-btn
                block
                type="submit"
                class="mt-4"
                :loading="loading"
              >
                Entrar
              </v-btn>

              <v-alert
                v-if="unauthorized"
                color="error"
                class="mt-4"
              >
                E-mail ou senha inválidos
              </v-alert>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
