export type Locale = 'ru' | 'en'
export type Tab = 'horoscope' | 'numerology'

export const LOCALE_KEY = 'zinaida.mini.locale'

export const SIGNS_EN = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
] as const

export const HINTS_EN: Record<number, string> = {
  0: 'A day of action — do not fear the petty, or the victories.',
  1: 'Taurus: lock the decision in slowly.',
  2: 'Gemini — flexibility in speech matters more than being right.',
  3: 'Cancer — home and the close ones give the ground.',
  4: 'Leo shines — show character.',
  5: 'Virgo — detail and health in focus.',
  6: 'Libra — harmony in relations and in work.',
  7: 'Scorpio — a deep repair, and honesty with yourself.',
  8: 'Sagittarius — a journey, or a new view.',
  9: 'Capricorn — discipline and order in affairs.',
  10: 'Aquarius — ideas and freedom matter more than rules.',
  11: 'Pisces — intuition will point the true step.',
}

export const copy = {
  ru: {
    lead: 'Гороскоп и нумерология — сразу, без ожидания.',
    horo: 'Гороскоп',
    nums: 'Числа',
    signTitle: 'Знак зодиака',
    birthTitle: 'Дата рождения',
    birthPh: 'ДД.ММ.ГГГГ',
    birthErr: 'Формат: 17.05.1994',
    lifePath: 'Число пути',
    master: 'мастер-число',
    personalYear: (year: number) => `Личный год ${year}`,
    sun: 'Солнце',
    disclaimer: 'Развлекательный формат · не замена консультации специалиста',
    share: 'Поделиться',
    fullHoro: 'Полный гороскоп в боте',
    fullNum: 'Полная расшифровка в боте',
    by: 'Aleksandra Yehhi · Минск',
    langAria: 'Язык',
    shareHoro: (sign: string, hint: string) =>
      `${sign} — ${hint}\n\nПолный расклад в @Zinaidadigitaloracle_bot`,
    shareNum: (lifePath: number, year: number, sun: string) =>
      `Число пути ${lifePath}, год ${year}\nСолнце ${sun}\n\nDigital Oracle: @Zinaidadigitaloracle_bot`,
  },
  en: {
    lead: 'Horoscope and numerology — at once, without waiting.',
    horo: 'Horoscope',
    nums: 'Numbers',
    signTitle: 'Zodiac sign',
    birthTitle: 'Date of birth',
    birthPh: 'DD.MM.YYYY',
    birthErr: 'Format: 17.05.1994',
    lifePath: 'Life path',
    master: 'master number',
    personalYear: (year: number) => `Personal year ${year}`,
    sun: 'Sun',
    disclaimer: 'Entertainment only · not a substitute for professional advice',
    share: 'Share',
    fullHoro: 'Full horoscope in the bot',
    fullNum: 'Full reading in the bot',
    by: 'Aleksandra Yehhi · Minsk',
    langAria: 'Language',
    shareHoro: (sign: string, hint: string) =>
      `${sign} — ${hint}\n\nFull reading at @Zinaidadigitaloracle_bot`,
    shareNum: (lifePath: number, year: number, sun: string) =>
      `Life path ${lifePath}, year ${year}\nSun ${sun}\n\nDigital Oracle: @Zinaidadigitaloracle_bot`,
  },
} as const

export function readLocale(): Locale {
  try {
    const stored = localStorage.getItem(LOCALE_KEY)
    if (stored === 'en' || stored === 'ru') return stored
  } catch {
    // Private mode / Mini App without storage.
  }
  return 'ru'
}

export function writeLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_KEY, locale)
  } catch {
    // Ignore quota / private mode.
  }
}
