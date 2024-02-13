import { defineStore } from 'pinia'
import type { SupplierInterface } from '@/interfaces/supplier/SupplierInterface'
import axios from '@/utils/axios'

export const useSupplierStore = defineStore({
  id: 'supplier',
  state: () => ({
    suppliers: [] as SupplierInterface[],
    supplier: null as SupplierInterface | null,
    loading: false,
  }),
  actions: {
    async list() {
      this.loading = true

      const res = await axios.get('suppliers')

      this.suppliers = res.data.data
      this.loading = false
    },
    async find(supplierId: any) {
      this.loading = true

      this.supplier = this.suppliers.find(s => s.id === parseInt(supplierId)) ?? null

      // TODO COLOCAR REDIRECT /DASHBOARD SE O RESOURCE NAO FOR ENCONTRADO (FORÇAR URL COM ID ERRADO)
      if (!this.supplier) {
        await axios(`suppliers/${supplierId}`).then(res => {
          this.supplier = res.data.data
        }).catch(() => {
          this.loading = false
        })
      }

      this.loading = false
    },
    async store() {
      this.loading = true

      await axios.post('suppliers', this.supplier).catch(() => {
        this.loading = false
        return Promise.reject()
      })

      this.loading = false
    },
    async update() {
      this.loading = true

      await axios.put(`suppliers/${this.supplier?.id}`, this.supplier).catch(() => {
        this.loading = false
        return Promise.reject()
      })

      this.loading = false
    },
    async delete(supplierId: number) {
      this.loading = true

      await axios.delete(`suppliers/${supplierId}`).then(async () => {
        await this.list()
      }).catch(() => {
        this.loading = false
        return Promise.reject()
      })

      this.loading = false
    },

  },
})
