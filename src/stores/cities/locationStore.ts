import { CityInterface } from '@/interfaces/common/CityInterface'
import { StateInterface } from '@/interfaces/common/StateInterface'
import { defineStore } from 'pinia'
import axios from '@/utils/axios'

export const useLocationStore = defineStore({
  id: 'locations',
  state: () => ({
    states: [] as StateInterface | [],
    cities: [] as CityInterface | [],
    loading: false,
  }),
  actions: {
    async listStates() {
      this.loading = true

      const res = await axios.get('locations/states')

      this.states = res.data.data
      this.loading = false
    },

    async listCitiesByState(state: string) {
      this.loading = true

      const res = await axios.get(`locations/states/${state}/cities`)

      this.cities = res.data.data
      this.loading = false
    },

    async getAddressByCep(cep: string) {
      this.loading = true

      if (cep.replace(/\D/g, "").length === 8) {
        const response = await fetch('https://viacep.com.br/ws/' + cep.replace(/\D/g, "") + '/json').then(response => {
          return response.json()
        })

        if (response.erro) {
          this.loading = false

          return {
            logradouro: '',
            bairro: '',
            city_id: null,
            complemento: ''
          }
        }

        const city_id = await this.listCitiesByState(response.uf).then(() => {
          return this.cities.find(city => city.name === response.localidade)?.id
        })

        return {
          ...response,
          city_id: city_id,
        }
      }

      this.loading = false

      return {
        logradouro: '',
        bairro: '',
        city_id: null,
        complemento: ''
      }
    },
  },
})
