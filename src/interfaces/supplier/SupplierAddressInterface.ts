import { CityInterface } from '@/interfaces/common/CityInterface'

export interface SupplierAddressInterface {
  id?: number,
  city_id?: number,
  city?: CityInterface,
  postcode: string,
  address: string,
  district: string,
  number: string,
  info: string,
  complement: string,
  condominium: boolean
}
