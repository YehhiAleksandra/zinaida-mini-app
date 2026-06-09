export interface BirthDate {
  day: number
  month: number
  year: number
}

export const ZODIAC_SIGNS = [
  '????',
  '?????',
  '????????',
  '???',
  '???',
  '????',
  '????',
  '????????',
  '???????',
  '???????',
  '???????',
  '????',
] as const

function sumDigits(n: number): number {
  return String(n)
    .split('')
    .reduce((acc, d) => acc + Number(d), 0)
}

function reduce(n: number, allowMaster: boolean): number {
  let x = n
  while (true) {
    if (allowMaster && (x === 11 || x === 22 || x === 33)) return x
    if (x < 10) return x
    x = sumDigits(x)
  }
}

export function lifePath(date: BirthDate): number {
  const raw = `${String(date.day).padStart(2, '0')}${String(date.month).padStart(2, '0')}${date.year}`
  const digits = raw.split('').map(Number)
  return reduce(digits.reduce((a, b) => a + b, 0), true)
}

export function personalYear(date: BirthDate, year: number): number {
  const raw = `${String(date.day).padStart(2, '0')}${String(date.month).padStart(2, '0')}${year}`
  const digits = raw.split('').map(Number)
  return reduce(digits.reduce((a, b) => a + b, 0), false)
}

export function sunSign(day: number, month: number): { index: number } {
  const idx =
    (month === 3 && day >= 21) || (month === 4 && day <= 19)
      ? 0
      : (month === 4 && day >= 20) || (month === 5 && day <= 20)
        ? 1
        : (month === 5 && day >= 21) || (month === 6 && day <= 20)
          ? 2
          : (month === 6 && day >= 21) || (month === 7 && day <= 22)
            ? 3
            : (month === 7 && day >= 23) || (month === 8 && day <= 22)
              ? 4
              : (month === 8 && day >= 23) || (month === 9 && day <= 22)
                ? 5
                : (month === 9 && day >= 23) || (month === 10 && day <= 22)
                  ? 6
                  : (month === 10 && day >= 23) || (month === 11 && day <= 21)
                    ? 7
                    : (month === 11 && day >= 22) || (month === 12 && day <= 21)
                      ? 8
                      : (month === 12 && day >= 22) || (month === 1 && day <= 19)
                        ? 9
                        : (month === 1 && day >= 20) || (month === 2 && day <= 18)
                          ? 10
                          : 11
  return { index: idx }
}
