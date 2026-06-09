import WebApp from '@twa-dev/sdk'

export function initTelegram() {
  WebApp.ready()
  WebApp.expand()
  WebApp.setHeaderColor('#1a0f2e')
  WebApp.setBackgroundColor('#1a0f2e')
  return WebApp
}

export function shareText(text: string) {
  const url = `https://t.me/share/url?url=${encodeURIComponent('https://t.me/Zinaidadigitaloracle_bot')}&text=${encodeURIComponent(text)}`
  WebApp.openTelegramLink(url)
}

export function openBot(start = 'miniapp') {
  WebApp.openTelegramLink(`https://t.me/Zinaidadigitaloracle_bot?start=${start}`)
}

export { WebApp }
