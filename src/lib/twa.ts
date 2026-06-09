type TelegramWebApp = {
  ready: () => void
  expand: () => void
  setHeaderColor?: (color: string) => void
  setBackgroundColor?: (color: string) => void
  openTelegramLink: (url: string) => void
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp }
  }
}

function webApp(): TelegramWebApp | null {
  return window.Telegram?.WebApp ?? null
}

export function initTelegram(): TelegramWebApp | null {
  const app = webApp()
  if (!app) return null
  try {
    app.ready()
    app.expand()
    app.setHeaderColor?.('#1a0f2e')
    app.setBackgroundColor?.('#1a0f2e')
  } catch {
    // Outside Telegram or older WebApp client.
  }
  return app
}

export function shareText(text: string) {
  const url = `https://t.me/share/url?url=${encodeURIComponent('https://t.me/Zinaidadigitaloracle_bot')}&text=${encodeURIComponent(text)}`
  const app = webApp()
  if (app) app.openTelegramLink(url)
  else window.open(url, '_blank', 'noopener,noreferrer')
}

export function openBot(start = 'miniapp') {
  const link = `https://t.me/Zinaidadigitaloracle_bot?start=${start}`
  const app = webApp()
  if (app) app.openTelegramLink(link)
  else window.open(link, '_blank', 'noopener,noreferrer')
}
