import { defineStore } from 'pinia'
import { router } from '@/router'
import axios from '@/utils/axios'
import type { UserInterface } from '@/interfaces/users/UserInterface'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    returnUrl: null as null | string,
    user: null as null | UserInterface,
    token: null as null | string,
    loading: false,
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true

      await axios.post('auth/login', {
        email,
        password,
      }).then(response => {
        this.user = response.data.user
        this.token = response.data.access_token

        router.push(this.returnUrl || '/dashboard')
      }).catch(_ => {
        this.loading = false
      })

      this.loading = false
    },
    async logout(expiredToken: boolean = false) {
      if (expiredToken) {
        this.clearCredentials()
        return
      }

      await axios.post('auth/logout').then(() => {
        this.clearCredentials()
      })
    },
    clearCredentials() {
      this.user = null
      this.token = null

      this.returnUrl = router.currentRoute.value.path
      router.push({ name: 'login' })
    }
  },
  persist: true,
})