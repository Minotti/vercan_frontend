import { Mask, type MaskOptions } from 'maska'

export function maskAny(string: string, mask: MaskOptions) {
  const obj = new Mask(mask)

  return obj.masked(string)
}
