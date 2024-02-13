import { FORM_ERRORS } from '@/utils/messages/general/generalMessages'
import axios from 'axios'
import { router } from '@/router'
import { useAuthStore } from '@/stores/auth/authStore'
import { useErrorsStore } from '@/stores/errors/errorsStore'
import { toast } from 'vue3-toastify'

const baseUrl = `${import.meta.env.VITE_API_URL}`

const axiosServices = axios.create({
  baseURL: baseUrl,
})

axiosServices.interceptors.response.use(response => response, error => {
  const skipRoute = ['login'].includes(<string> router.currentRoute.value.name)
  const authStore = useAuthStore()

  if (error.response.status === 404) {
    router.push({ name: '404' })
  }

  if (error.response.data.message === 'Unauthorized' && [401, 403].includes(error.response.status) && !skipRoute)
    authStore.logout(true)

  if (error.response.status === 422) {
    const errorsStore = useErrorsStore()

    errorsStore.setErrors(error.response.data.data)

    toast.error(FORM_ERRORS)
  }

  return Promise.reject(error)
})

axiosServices.interceptors.request.use(request => {
  const token = window.localStorage.auth_teste_vercan ? JSON.parse(window.localStorage.auth_teste_vercan).token : null

  if (token)
    request.headers.Authorization = `Bearer ${token}`

  return request
})

export default axiosServices
