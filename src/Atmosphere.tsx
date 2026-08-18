import { useEffect, useRef } from 'react'

type AtmosphereProps = {
  reduceMotion: boolean
}

const POSTER = './media/ritual-poster.webp'

export function Atmosphere({ reduceMotion }: AtmosphereProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (reduceMotion) return
    const el = ref.current
    if (!el) return

    const tryPlay = () => {
      void el.play().catch(() => {
        // Autoplay blocked: the poster still stays visible.
      })
    }

    tryPlay()

    const onVis = () => {
      if (document.hidden) el.pause()
      else tryPlay()
    }

    document.addEventListener('visibilitychange', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      el.pause()
    }
  }, [reduceMotion])

  return (
    <figure className="ritual" aria-hidden="true">
      <div className="ritual-still" style={{ backgroundImage: `url("${POSTER}")` }} />
      {!reduceMotion && (
        <video
          ref={ref}
          className="ritual-video"
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
        >
          <source src="./media/ritual.webm" type="video/webm" />
          <source src="./media/ritual.mp4" type="video/mp4" />
        </video>
      )}
    </figure>
  )
}
