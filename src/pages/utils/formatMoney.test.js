import { it, expect } from 'vitest'
import { formatMoney } from './formatMoney'

it('converts 1999 to 19.99', () => {
  expect(formatMoney(1999)).toBe('19.99')
  expect(formatMoney(100)).toBe('1.00')
})
