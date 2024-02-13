import { defineStore } from 'pinia'
import { isEmpty } from 'lodash'

export const useErrorsStore = defineStore({
  id: 'errors',
  state: () => ({
    errors: {} as any,
  }),
  actions: {
    setErrors(data: []) {
      this.errors = data
    },
    clearError(key: string | string[]) {
      if (typeof key === 'string') {
        delete this.errors[key]
      } else {
        key.map(k => delete this.errors[k])
      }
    },
    clearAll() {
      this.errors = {}
    },
  },
  getters: {
    hasError: state => !isEmpty(state.errors),
  },
})
