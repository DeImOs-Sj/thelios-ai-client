import { useCallback, useEffect, useState, type MouseEvent } from 'react'
import { HeroStage } from './HeroStage.tsx'
import { Lines } from './motion.tsx'
import { Beliefs, Bento, Foundation } from './Sections.tsx'
import { THELIOS } from './theliosData.ts'
import './landing.css'

function externalProps(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {}
}

export function Landing() {
  const [scrolled, setScrolled] = useState(false)
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [open, setOpenState] = useState(reduced)
  const [instant, setInstant] = useState(false)
  const setOpen = useCallback((value: boolean, now = false) => {
    if (now) {
      setInstant(true)
      window.setTimeout(() => setInstant(false), 80)
    }
    setOpenState(value)
  }, [])

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.lp [data-reveal]')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const target = entry.target as HTMLElement
          if (target.getAttribute('data-reveal') === 'mask') target.classList.add('in')
          else target.querySelectorAll(':scope > [data-reveal]').forEach((child) => child.classList.add('in'))
          target.classList.add('in')
          observer.unobserve(target)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -6% 0px' },
    )
    const seen = new Set<Element>()
    elements.forEach((element) => {
      const target = element.getAttribute('data-reveal') === 'mask' ? element.parentElement! : element
      if (seen.has(target)) return
      seen.add(target)
      observer.observe(target)
    })
    return () => observer.disconnect()
  }, [])

  const contact = (e: MouseEvent) => {
    if (!THELIOS.links.contact) e.preventDefault()
  }

  return (
    <div className="lp">
      <a className="lp-skip" href="#main">Skip to main content</a>

      <header className={`lp-nav${open ? '' : ' lp-nav--over'}${scrolled && open ? ' scrolled' : ''}${instant ? ' is-instant' : ''}`}>
        <a className="lp-logo" href="/" aria-label={`${THELIOS.brand} home`}>
          <img className="lp-logo-image" src={THELIOS.media.logo} alt={THELIOS.brand} />
        </a>
        <nav aria-label="Primary" className="lp-links">
          {THELIOS.nav.map((item) => (
            <a key={item.label} href={item.href} {...externalProps(item.href)}>{item.label}</a>
          ))}
        </nav>
        <a className={open ? 'lp-pill lp-pill-dark' : 'lp-pill lp-pill-light'} href={THELIOS.links.contact} onClick={contact} {...externalProps(THELIOS.links.contact)}>
          Contact Us
        </a>
      </header>

      <main id="main">
        <HeroStage open={open} reduced={reduced} setOpen={setOpen} instant={instant} />

        <div className="lp-ticker" aria-label="Thelios capabilities">
          <div className="lp-ticker-track">
            {[0, 1, 2].map((copy) => (
              <ul key={copy} aria-hidden={copy > 0 ? 'true' : undefined}>
                {THELIOS.ticker.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ))}
          </div>
        </div>

        <section className="lp-section" id="solutions">
          <div className="lp-wrap">
            <h2 className="lp-h2"><Lines lines={['See the game', 'with more clarity.']} /></h2>
            <div className="lp-cards3">
              {THELIOS.features.map((feature, index) => (
                <article className="lp-card" data-reveal="fade-move" style={{ '--i': index } as React.CSSProperties} key={feature.title}>
                  <div>
                    <p className="lp-tag">{feature.tag}</p>
                    <h3>{feature.title}</h3>
                  </div>
                  <div>
                    <p className="lp-card-body">{feature.body}</p>
                    <a href={feature.href}>Explore <span aria-hidden="true">→</span></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-tight" id="products">
          <div className="lp-wrap">
            <p className="lp-eyebrow dark">The product</p>
            <h2 className="lp-h2"><Lines lines={['A Visual Copilot', 'for better decisions.']} /></h2>
            <p className="lp-sub">Our SaaS-based, no-code, highly configurable solution makes it easy to analyze video and derive unique insights.</p>
            <Bento />
          </div>
        </section>

        <section className="lp-section lp-found-sec" id="industries">
          <div className="lp-wrap">
            <Foundation />
            <p className="lp-fine lp-dark-fine">Thelios focuses on sports analytics today, with a Visual Copilot that can pinpoint and track small objects, motion, and interactions in real time.</p>
          </div>
        </section>

        <section className="lp-section" id="how">
          <div className="lp-wrap lp-how">
            <div>
              <p className="lp-eyebrow dark">How it works</p>
              <h2 className="lp-h2"><Lines lines={['From video', 'to decisions.']} /></h2>
              <p className="lp-sub">A clear workflow for turning visual data into insights your team can act on.</p>
              <ol className="lp-steps">
                {THELIOS.steps.map((step, index) => (
                  <li key={step.number} data-reveal="fade-move" style={{ '--i': index } as React.CSSProperties}>
                    <span>{step.number}</span>
                    <div><h3>{step.title}</h3><p>{step.body}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lp-video-frame" data-reveal="fade-move">
              <video src={THELIOS.media.sportsVideo} autoPlay muted loop playsInline controls={false} aria-label="Sports footage analyzed by Thelios" />
              <span className="lp-video-label">Visual Copilot / live analysis</span>
            </div>
          </div>
        </section>

        <section className="lp-section lp-bel-sec" id="company">
          <div className="lp-wrap"><Beliefs reduced={reduced} /></div>
        </section>

        <section className="lp-section lp-roadmap" id="roadmap">
          <div className="lp-wrap lp-roadmap-grid">
            <div>
              <p className="lp-eyebrow dark">Coming soon</p>
              <h2 className="lp-h2"><Lines lines={['Game-changing', 'Baseball Analytics.']} /></h2>
              <p className="lp-sub">The next chapter of Thelios is being built for the diamond, with the same focus on small objects, motion, and interactions.</p>
              <a className="lp-pill lp-pill-dark lp-pill-inline" href={THELIOS.links.contact} {...externalProps(THELIOS.links.contact)}>Talk to Thelios</a>
            </div>
            <div className="lp-roadmap-media">
              <video src={THELIOS.media.sportsVideo} autoPlay muted loop playsInline aria-label="Sports footage for upcoming baseball analytics" />
            </div>
          </div>
        </section>

        <section className="lp-cta">
          <div className="lp-wrap">
            <h2 className="lp-h2 light"><Lines lines={['Make better decisions', 'from what you see.']} /></h2>
            <p className="lp-sub light" data-reveal="rise">Talk to Thelios about a Visual Copilot for your team, your sport, and your next decision.</p>
            <a className="lp-pill lp-pill-light lp-pill-lg" href={THELIOS.links.contact} {...externalProps(THELIOS.links.contact)}>Contact Us</a>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-wrap lp-foot-grid">
          <div>
            <a className="lp-logo" href="/" aria-label={`${THELIOS.brand} home`}>
              <img className="lp-logo-image" src={THELIOS.media.logo} alt={THELIOS.brand} />
            </a>
            <p className="lp-foot-note">{THELIOS.footer.description}</p>
          </div>
          {THELIOS.footer.groups.map((group) => (
            <div key={group.title}>
              <h4>{group.title}</h4>
              {group.links.map((item) => <a key={item.label} href={item.href} {...externalProps(item.href)}>{item.label}</a>)}
            </div>
          ))}
        </div>
        <div className="lp-wrap lp-foot-bottom">
          <span>© 2026 {THELIOS.brand}</span>
          <span>{THELIOS.footer.legal.map((item, index) => <span key={item.label}>{index > 0 ? ' · ' : ''}<a href={item.href} {...externalProps(item.href)}>{item.label}</a></span>)}</span>
        </div>
      </footer>
    </div>
  )
}
