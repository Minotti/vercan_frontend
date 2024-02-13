import { StateInterface } from '@/interfaces/common/StateInterface'

export interface CityInterface {
  id: number,
  name: string,
  state_id: number,
  state: StateInterface
}
