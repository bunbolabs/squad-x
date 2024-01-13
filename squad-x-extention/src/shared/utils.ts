import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Dino } from '@/shared/types/dino'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decodeDinoGene<T = Dino>(gene: string) {
  const decodedString = gene
  const decodedGene = decodedString.split('@')

  return { kind: decodedGene[0], face: decodedGene[1], body: decodedGene[2] } as T
}

export function validateGene(decodedString: string): boolean {
  const pattern = /^[a-h]@\d{2}@\d{2}$/

  return pattern.test(decodedString)
}

export function formatAddress(address: string, length = 6) {
  return `${address.slice(0, length)}...${address.slice(-length)}`
}

export function computeBalance(balance: number) {
  // round balance to 3 digits after dot and fixed 3 digits

  return Math.round(balance * 1000) / 1000
}
