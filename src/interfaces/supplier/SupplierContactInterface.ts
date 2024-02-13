import type { EmailContactInterface } from '@/interfaces/supplier/EmailContactInterface'
import type { PhoneContactInterface } from '@/interfaces/supplier/PhoneContactInterface'

interface contactInterface {
  phone: PhoneContactInterface[],
  email: EmailContactInterface[]
}

export interface SupplierContactInterface {
  id?: number,
  name?: string,
  additional: boolean,
  business?: string,
  office?: string,
  contacts: contactInterface
}
