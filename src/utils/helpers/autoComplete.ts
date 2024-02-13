import { EmailContactTypeEnum } from '@/enums/EmailContactTypeEnum'
import { PhoneContactTypeEnum } from '@/enums/PhoneContactTypeEnum'
import { SupplierGatheringEnum } from '@/enums/SupplierGatheringEnum'
import { SupplierIeIndicatorEnum } from '@/enums/SupplierIeIndicatorEnum'
import { autoCompleteInterface } from '@/interfaces/autoCompleteInterface'

export const activeComplete: autoCompleteInterface[] = [
  { title: 'Sim', value: true },
  { title: 'Não', value: false }
]

export const contactPhoneTypeComplete: autoCompleteInterface[] = [
  { title: PhoneContactTypeEnum.residential, value: PhoneContactTypeEnum._residential },
  { title: PhoneContactTypeEnum.commercial, value: PhoneContactTypeEnum._commercial },
  { title: PhoneContactTypeEnum.cellphone, value: PhoneContactTypeEnum._cellphone },
]

export const contactEmailTypeComplete: autoCompleteInterface[] = [
  { title: EmailContactTypeEnum.personal, value: EmailContactTypeEnum._personal },
  { title: EmailContactTypeEnum.commercial, value: EmailContactTypeEnum._commercial },
  { title: EmailContactTypeEnum.other, value: EmailContactTypeEnum._other },
]

export const ieIndicatorComplete: autoCompleteInterface[] = [
  { title: SupplierIeIndicatorEnum.contribuinte, value: SupplierIeIndicatorEnum._contribuinte },
  { title: SupplierIeIndicatorEnum.contribuinte_isento, value: SupplierIeIndicatorEnum._contribuinte_isento },
  { title: SupplierIeIndicatorEnum.nao_contribuinte, value: SupplierIeIndicatorEnum._nao_contribuinte },
]

export const supplierGatheringComplete: autoCompleteInterface[] = [
  { title: SupplierGatheringEnum.recolher, value: SupplierGatheringEnum._recolher },
  { title: SupplierGatheringEnum.retido, value: SupplierGatheringEnum._retido },
]
