# zinaida-mini-app

Telegram Mini App for [Digital Oracle](https://github.com/YehhiAleksandra/digital-oracle) — quick horoscope and numerology **without LLM** (client-side math, same logic as [astro-core](https://github.com/YehhiAleksandra/astro-core)).

**Live:** [zinaida-mini-app.vercel.app](https://zinaida-mini-app.vercel.app/)

## Features

- ⭐ Pick zodiac sign → daily hint + share to Telegram
- 🔢 Birth date → life path, personal year, sun sign
- 🔗 Deep link to `@Zinaidadigitaloracle_bot` for full AI readings

## Stack

- React 19 + TypeScript + Vite
- [@twa-dev/sdk](https://github.com/twa-dev/sdk) — Telegram WebApp API
- Deploy: [Vercel](https://vercel.com)

## Develop

```bash
npm install
npm run dev
```

Open in Telegram via BotFather → Menu Button → Web App URL.

## Build

```bash
npm run build
npm run preview
```

## Related

- [digital-oracle](https://github.com/YehhiAleksandra/digital-oracle)
- [astro-core](https://github.com/YehhiAleksandra/astro-core)
- [oracle-gateway](https://github.com/YehhiAleksandra/oracle-gateway)

## License

MIT
