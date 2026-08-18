import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  HOROSCOPE_HINTS,
  numerologySummary,
  parseBirthDate,
  zodiacSummary,
  ZODIAC_SIGNS,
} from './lib/astro'
import { copy, HINTS_EN, readLocale, SIGNS_EN, writeLocale } from './lib/copy'
import type { Locale, Tab } from './lib/copy'
import { Atmosphere } from './Atmosphere'
import { coverData, posterData } from './assets/sphere'
import { initTelegram, openBot, shareText } from './lib/twa'
import './App.css'

function App() {
  const [tab, setTab] = useState<Tab>('horoscope')
  const [locale, setLocale] = useState<Locale>(readLocale)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [signIdx, setSignIdx] = useState(1)
  const [birthInput, setBirthInput] = useState('17.05.1994')
  const year = new Date().getFullYear()
  const t = copy[locale]
  const signs = locale === 'en' ? SIGNS_EN : ZODIAC_SIGNS
  const hint = locale === 'en' ? HINTS_EN[signIdx] : HOROSCOPE_HINTS[signIdx]
  const still = reduceMotion ? coverData : posterData

  useEffect(() => {
    initTelegram()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    writeLocale(locale)
  }, [locale])

  const parsed = useMemo(() => parseBirthDate(birthInput), [birthInput])
  const nums = parsed ? numerologySummary(parsed, year) : null
  const zodiac = parsed ? zodiacSummary(parsed) : null
  const sunName = zodiac ? signs[zodiac.index] : ''

  const shareHoroscope = () => {
    shareText(t.shareHoro(signs[signIdx], hint))
  }

  const shareNumerology = () => {
    if (!nums || !zodiac) return
    shareText(t.shareNum(nums.lifePath, nums.personalYear, sunName))
  }

  let panel: ReactNode
  switch (tab) {
    case 'horoscope':
      panel = (
        <section className="card">
          <p className="kicker">01</p>
          <h2>{t.signTitle}</h2>
          <div className="sign-grid">
            {signs.map((sign, i) => (
              <button
                key={ZODIAC_SIGNS[i]}
                type="button"
                className={i === signIdx ? 'sign is-on' : 'sign'}
                onClick={() => setSignIdx(i)}
              >
                {sign}
              </button>
            ))}
          </div>
          <p className="oracle">{hint}</p>
          <div className="actions">
            <button type="button" className="btn" onClick={shareHoroscope}>
              {t.share}
            </button>
            <button type="button" className="btn ghost" onClick={() => openBot('horo')}>
              {t.fullHoro}
            </button>
          </div>
        </section>
      )
      break
    case 'numerology':
      panel = (
        <section className="card">
          <p className="kicker">02</p>
          <h2>{t.birthTitle}</h2>
          <input
            className="field"
            value={birthInput}
            onChange={(e) => setBirthInput(e.target.value)}
            placeholder={t.birthPh}
            inputMode="numeric"
            autoComplete="bday"
          />
          {!parsed && <p className="error">{t.birthErr}</p>}
          {parsed && nums && zodiac && (
            <div className="stats">
              <div>
                <span>{t.lifePath}</span>
                <strong>{nums.lifePath}</strong>
                {nums.isMaster && <em>{t.master}</em>}
              </div>
              <div>
                <span>{t.personalYear(year)}</span>
                <strong>{nums.personalYear}</strong>
              </div>
              <div>
                <span>{t.sun}</span>
                <strong>{sunName}</strong>
              </div>
            </div>
          )}
          <p className="disclaimer">{t.disclaimer}</p>
          <div className="actions">
            <button type="button" className="btn" disabled={!nums} onClick={shareNumerology}>
              {t.share}
            </button>
            <button type="button" className="btn ghost" onClick={() => openBot('num')}>
              {t.fullNum}
            </button>
          </div>
        </section>
      )
      break
    default: {
      const _exhaustive: never = tab
      throw new Error(`Unhandled tab: ${_exhaustive}`)
    }
  }

  return (
    <>
      <div className="stage" aria-hidden="true">
        <div className="stage-poster" style={{ backgroundImage: `url("${still}")` }} />
        <div className="vignette" />
        <div className="corner" />
      </div>

      <div className="app">
        <header className="chrome">
          <p className="mark">Digital Oracle</p>
          <div className="locale" role="group" aria-label={t.langAria}>
            <button
              type="button"
              className={locale === 'ru' ? 'is-on' : ''}
              aria-pressed={locale === 'ru'}
              onClick={() => setLocale('ru')}
            >
              RU
            </button>
            <button
              type="button"
              className={locale === 'en' ? 'is-on' : ''}
              aria-pressed={locale === 'en'}
              onClick={() => setLocale('en')}
            >
              EN
            </button>
          </div>
        </header>

        <header className="hero">
          <h1>Зинаида</h1>
          <p className="lead">{t.lead}</p>
        </header>

        <nav className="tabs" aria-label="Digital Oracle">
          <button
            type="button"
            className={tab === 'horoscope' ? 'is-on' : ''}
            onClick={() => setTab('horoscope')}
          >
            {t.horo}
          </button>
          <button
            type="button"
            className={tab === 'numerology' ? 'is-on' : ''}
            onClick={() => setTab('numerology')}
          >
            {t.nums}
          </button>
        </nav>

        <Atmosphere reduceMotion={reduceMotion} />

        {panel}

        <footer className="by">{t.by}</footer>
      </div>
    </>
  )
}

export default App
