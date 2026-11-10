import { useEffect, useRef, useState } from 'react'
import { Globe } from './Globe.tsx'
import { idx } from './landingData.ts'
import { THELIOS } from './theliosData.ts'

function ProductIcon({ type }: { type: 'copilot' | 'analysis' | 'dataset' }) {
  if (type === 'analysis') {
    return (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 25V13M13 25V7M20 25v-9M27 25V4" />
      </svg>
    )
  }
  if (type === 'dataset') {
    return (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="5" width="22" height="8" rx="2" />
        <rect x="5" y="19" width="22" height="8" rx="2" />
        <path d="M10 9h.01M10 23h.01" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="10" />
      <path d="m12 16 3 3 6-7" />
    </svg>
  )
}

function externalProps(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {}
}

export function Bento() {
  const [tab, setTab] = useState(0)
  const current = THELIOS.products[tab]!
  return (
    <div className="lp-bento" data-reveal="fade-move">
      <div className="lp-bento-left">
        {THELIOS.products.map((product, index) => (
          index === tab ? (
            <article key={product.id} className="lp-tab-card" aria-label={product.name}>
              <span className="lp-tab-icon" aria-hidden="true"><ProductIcon type={product.icon} /></span>
              <div className="lp-tab-body">
                <span className="lp-chip">Thelios.AI / product</span>
                <h3>{current.name}</h3>
                <p className="lp-serif">{current.blurb}</p>
              </div>
              <div className="lp-tab-foot">
                <span className="lp-avatars" aria-hidden="true">
                  <i>AI</i><i>CV</i><i>+</i>
                </span>
                <a className="lp-btn" href={THELIOS.links.contact} {...externalProps(THELIOS.links.contact)}>{current.cta}</a>
              </div>
            </article>
          ) : (
            <button key={product.id} type="button" className="lp-tab" aria-expanded="false" onClick={() => setTab(index)}>
              {product.name}
            </button>
          )
        ))}
      </div>

      <div className="lp-bento-right">
        <section className="lp-metric lp-metric-wide" aria-label="Sports video analysis">
          <div>
            <p className="lp-metric-label">Sports video analysis</p>
            <p className="lp-metric-num lp-serif">Live view</p>
            <p className="lp-metric-sub">From video to structured insight</p>
          </div>
          <div className="lp-media-chart">
            <video src={THELIOS.media.volleyballVideo} autoPlay muted loop playsInline aria-label="Volleyball footage analyzed by Thelios" />
          </div>
        </section>

        <section className="lp-metric" aria-label="Visual layouts">
          <p className="lp-metric-label">Visual layouts</p>
          <p className="lp-metric-num lp-serif">Clear</p>
          <img className="lp-device-image" src={THELIOS.media.desktop} alt="Thelios desktop visual analysis dashboard" />
        </section>

        <section className="lp-metric" aria-label="Structured datasets">
          <p className="lp-metric-label">Structured datasets</p>
          <p className="lp-metric-num lp-serif">Ready</p>
          <img className="lp-device-image" src={THELIOS.media.tablet} alt="Thelios tablet visual analysis dashboard" />
        </section>
      </div>
    </div>
  )
}

export function Foundation() {
  return (
    <div>
      <h2 className="lp-h2">
        <span className="lp-mask"><span data-reveal="mask">Built for the details</span></span>
        <span className="lp-mask"><span data-reveal="mask" style={idx(1)}>that change decisions.</span></span>
      </h2>
      <div className="lp-cards3">
        {THELIOS.capabilities.map((capability, index) => (
          <article key={capability.value} className="lp-card" data-reveal="fade-move" style={idx(index)}>
            <div>
              <p className="lp-tag">{capability.value}</p>
              <h3>{capability.label}</h3>
            </div>
            <p className="lp-card-body">{capability.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

const ROTATE_MS = 6000
const RING = 2 * Math.PI * 19

export function Beliefs({ reduced }: { reduced: boolean }) {
  const [index, setIndex] = useState(0)
  const [inView, setInView] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const principle = THELIOS.principles[index]!

  useEffect(() => {
    const element = root.current
    if (!element || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), { threshold: 0.4 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !inView) return
    const timer = window.setTimeout(() => setIndex((value) => (value + 1) % THELIOS.principles.length), ROTATE_MS)
    return () => window.clearTimeout(timer)
  }, [index, inView, reduced])

  return (
    <div className="lp-bel" ref={root}>
      <Globe spinKey={index} active={inView} reduced={reduced} />
      <div className="lp-bel-left">
        <p className="lp-bel-eyebrow">The Thelios point of view</p>
        <h2 className="lp-bel-h">We believe in</h2>
      </div>
      <h3 className="lp-bel-word" aria-live="polite">
        <span className="lp-mask"><span key={principle.word} className="lp-swap">{principle.word}</span></span>
      </h3>
      <p key={principle.body} className="lp-bel-body lp-serif lp-fade">{principle.body}</p>
      <div className="lp-bel-pills" role="tablist" aria-label="Thelios principles">
        {THELIOS.principles.map((item, itemIndex) => (
          <button key={item.word} type="button" role="tab" aria-selected={itemIndex === index} aria-label={item.word} className={itemIndex === index ? 'lp-pillnum on' : 'lp-pillnum'} onClick={() => setIndex(itemIndex)}>
            {itemIndex === index && !reduced && inView && (
              <svg viewBox="0 0 44 44" aria-hidden="true">
                <circle key={index} cx="22" cy="22" r="19" className="lp-ring" style={{ strokeDasharray: RING, animationDuration: `${ROTATE_MS}ms` }} />
              </svg>
            )}
            {String(itemIndex + 1).padStart(2, '0')}
          </button>
        ))}
      </div>
    </div>
  )
}
