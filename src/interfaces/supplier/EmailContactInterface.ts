import type { EmailContactTypeEnum } from '@/enums/EmailContactTypeEnum'

export interface EmailContactInterface {
  email: string,
  type: EmailContactTypeEnum,
}
