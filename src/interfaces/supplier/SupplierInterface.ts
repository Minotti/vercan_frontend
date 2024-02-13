import { EmailContactTypeEnum } from '@/enums/EmailContactTypeEnum'
import { PhoneContactTypeEnum } from '@/enums/PhoneContactTypeEnum'
import type { SupplierGatheringEnum } from '@/enums/SupplierGatheringEnum'
import { SupplierIeIndicatorEnum } from '@/enums/SupplierIeIndicatorEnum'
import { SupplierTypeEnum } from '@/enums/SupplierTypeEnum'
import { SupplierAddressInterface } from '@/interfaces/supplier/SupplierAddressInterface'
import type { SupplierContactInterface } from '@/interfaces/supplier/SupplierContactInterface'

export interface SupplierInterface {
  id?: number,
  legal_name?: string,
  trade_name?: string,
  name?: string,
  nickname?: string,
  type: SupplierTypeEnum,
  cpf_cnpj?: string,
  rg?: string,
  active: boolean,
  ie_indicator?: SupplierIeIndicatorEnum,
  ie?: string,
  im?: string,
  gathering?: SupplierGatheringEnum,
  observation?: string,
  contacts: SupplierContactInterface[],
  address: SupplierAddressInterface
}

export const emptySupplier: SupplierInterface = {
  type: SupplierTypeEnum._PJ,
  active: true,
  contacts: [
    {
      additional: false,
      contacts: {
        phone: [{ phone: '', type: PhoneContactTypeEnum._commercial }],
        email: [{ email: '', type: EmailContactTypeEnum._commercial }]
      }
    }
  ],
  address: {
    postcode: '',
    address: '',
    district: '',
    number: '',
    info: '',
    complement: '',
    condominium: false
  }
}
