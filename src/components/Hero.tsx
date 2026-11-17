import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { whatsappLink } from '../config/social'
import mdbHeroArtwork from '../projetos/mdb3.webp'

const campaignEndsAt = new Date('2026-11-30T00:00:00-03:00').getTime()

function Countdown() {
  const [remaining, setRemaining] = useState(() => Math.max(0, campaignEndsAt - Date.now()))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(Math.max(0, campaignEndsAt - Date.now()))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const secondsLeft = Math.floor(remaining / 1000)
  const values = [
    ['DIAS', Math.floor(secondsLeft / 86400)],
    ['HORAS', Math.floor((secondsLeft % 86400) / 3600)],
    ['MIN', Math.floor((secondsLeft % 3600) / 60)],
    ['SEG', secondsLeft % 60],
  ] as const

  return <div className="campaign-countdown" role="timer" aria-label="Tempo restante da oferta Black Friday">
    <span className="countdown-label">A OFERTA TERMINA EM</span>
    <div className="countdown-values">{values.map(([label, value]) => <div className="countdown-unit" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}</div>
    {remaining === 0 && <span className="countdown-ended">CAMPANHA ENCERRADA</span>}
  </div>
}

export function Hero() {
  return <section className="hero" id="inicio">
    <div className="hero-grid" /><div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
    <div className="hero-inner">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
        <div className="eyebrow"><span className="eyebrow-line" /> DESIGN ESPORTIVO • BLACK FRIDAY</div>
        <h1>SEU TIME MERECE<br />UM INSTAGRAM<br /><span>DE CAMPEÃO.</span></h1>
        <p className="hero-subtitle">Artes profissionais para destacar seu time dentro e fora de campo. Aproveite as condições especiais e leve a identidade visual da sua equipe para outro nível.</p>
        <div className="hero-actions">
          <a className="button button-primary" href={whatsappLink('Olá, Andy! Vi sua campanha de Black Friday e quero profissionalizar meu time.')} target="_blank" rel="noreferrer">QUERO PROFISSIONALIZAR MEU TIME <ArrowUpRight size={18} /></a>
          <a className="text-link" href="#portfolio">Conheça o trabalho <ArrowDown size={15} /></a>
        </div>
        <Countdown />
        <div className="hero-proof"><div className="proof-icon"><Zap size={17} /></div><span>Experiência dentro do cenário competitivo<br /><b>Agora com foco também no seu time.</b></span></div>
      </motion.div>
      <motion.div className="hero-art" initial={{ opacity: 0, scale: .94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .8, delay: .15 }}>
        <div className="art-frame"><div className="art-topline"><span>ANDY® / MATCHDAY DESIGN</span><span>01 — 03</span></div><div className="art-visual"><img className="hero-project-image" src={mdbHeroArtwork} alt="Arte de apresentação de jogador do MDB Team" /></div><div className="art-footer"><span>DESIGN QUE JOGA JUNTO.</span><span>BLACK FRIDAY</span></div></div>
        <div className="art-sticker"><span>BLACK<br/>FRIDAY</span><b>−20%</b></div><div className="floating-note"><span className="live-dot"/> IDENTIDADE EM CAMPO</div><div className="hero-price"><span>PLANOS A PARTIR DE</span><strong>R$ 40<span>/MÊS</span></strong></div>
      </motion.div>
    </div>
    <a href="#experiencia" className="scroll-hint"><span>SCROLL PARA DESCOBRIR</span><ArrowDown size={14}/></a><div className="hero-index">01 / 09</div>
  </section>
}
