import { useEffect, useMemo, useState } from 'react'
import {
  HOROSCOPE_HINTS,
  numerologySummary,
  parseBirthDate,
  zodiacSummary,
  ZODIAC_SIGNS,
} from './lib/astro'
import { initTelegram, openBot, shareText } from './lib/twa'
import './App.css'

type Tab = 'horoscope' | 'numerology'

function App() {
  const [tab, setTab] = useState<Tab>('horoscope')
  const [signIdx, setSignIdx] = useState(1)
  const [birthInput, setBirthInput] = useState('17.05.1994')
  const year = new Date().getFullYear()

  useEffect(() => {
    initTelegram()
  }, [])

  const parsed = useMemo(() => parseBirthDate(birthInput), [birthInput])
  const nums = parsed ? numerologySummary(parsed, year) : null
  const zodiac = parsed ? zodiacSummary(parsed) : null

  const shareHoroscope = () => {
    const sign = ZODIAC_SIGNS[signIdx]
    shareText(`⭐ ${sign} — ${HOROSCOPE_HINTS[signIdx]}\n\n🔮 Полный расклад в @Zinaidadigitaloracle_bot`)
  }

  const shareNumerology = () => {
    if (!nums || !zodiac) return
    shareText(
      `🔢 Число пути ${nums.lifePath}, год ${nums.personalYear}\n☀️ ${zodiac.name}\n\n🔮 Digital Oracle: @Zinaidadigitaloracle_bot`,
    )
  }

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">Digital Oracle</p>
        <h1>Зинаида</h1>
        <p className="subtitle">Мини-приложение — быстрый гороскоп и нумерология без LLM</p>
      </header>

      <nav className="tabs">
        <button type="button" className={tab === 'horoscope' ? 'active' : ''} onClick={() => setTab('horoscope')}>
          ⭐ Гороскоп
        </button>
        <button type="button" className={tab === 'numerology' ? 'active' : ''} onClick={() => setTab('numerology')}>
          🔢 Числа
        </button>
      </nav>

      {tab === 'horoscope' && (
        <section className="card">
          <h2>Знак зодиака</h2>
          <div className="sign-grid">
            {ZODIAC_SIGNS.map((sign, i) => (
              <button
                key={sign}
                type="button"
                className={i === signIdx ? 'sign active' : 'sign'}
                onClick={() => setSignIdx(i)}
              >
                {sign}
              </button>
            ))}
          </div>
          <p className="hint">{HOROSCOPE_HINTS[signIdx]}</p>
          <div className="actions">
            <button type="button" className="primary" onClick={shareHoroscope}>
              Поделиться
            </button>
            <button type="button" className="ghost" onClick={() => openBot('horo')}>
              Полный гороскоп в боте
            </button>
          </div>
        </section>
      )}

      {tab === 'numerology' && (
        <section className="card">
          <h2>Дата рождения</h2>
          <input
            className="input"
            value={birthInput}
            onChange={(e) => setBirthInput(e.target.value)}
            placeholder="ДД.ММ.ГГГГ"
            inputMode="numeric"
          />
          {!parsed && <p className="error">Формат: 17.05.1994</p>}
          {parsed && nums && zodiac && (
            <div className="stats">
              <div>
                <span>Число пути</span>
                <strong>{nums.lifePath}</strong>
                {nums.isMaster && <em>мастер-число</em>}
              </div>
              <div>
                <span>Личный год {year}</span>
                <strong>{nums.personalYear}</strong>
              </div>
              <div>
                <span>Солнце</span>
                <strong>{zodiac.name}</strong>
              </div>
            </div>
          )}
          <p className="disclaimer">Развлекательный формат · не замена консультации специалиста</p>
          <div className="actions">
            <button type="button" className="primary" disabled={!nums} onClick={shareNumerology}>
              Поделиться
            </button>
            <button type="button" className="ghost" onClick={() => openBot('num')}>
              Полная расшифровка в боте
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

export default App
