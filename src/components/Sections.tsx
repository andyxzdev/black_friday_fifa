import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Clock3, Instagram, Layers3, MessageCircle, Palette, ShieldCheck, Sparkles, Trophy, Users, Zap } from 'lucide-react'
import { plans } from '../data/plans'
import { INSTAGRAM_URL, whatsappLink } from '../config/social'
import { Reveal } from './Reveal'

const projectOrder = ['young', 'phzin', 'mdb', 'maniacos', 'pepe', 'brasil']
const projectLabels: Record<string, string> = {
  r10: 'R10 TEAM',
  young: 'YOUNG',
  phzin: 'PHZIN',
  mdb: 'MDB',
  maniacos: 'MANIACOS',
  pepe: 'PEPE',
  brasil: 'BRASIL',
  patoroco: 'PATOROCO',
}
const portfolioFiles = {
  ...import.meta.glob<string>('../assets/artes/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' }),
  ...import.meta.glob<string>('../projetos/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' }),
}
const portfolioImages = Object.entries(portfolioFiles)
  .map(([path, src]) => {
    const filename = path.split('/').pop()?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() ?? ''
    const project = filename.includes('maniacs') ? 'maniacos' : Object.keys(projectLabels).find((key) => filename.includes(key)) ?? 'outros'
    const sequence = project === 'r10' ? Number(filename.match(/r10\s*(\d+)/)?.[1] ?? 999) : Number(filename.match(/\d+/)?.[0] ?? 999)
    return { path, src, project, sequence, title: projectLabels[project] ?? 'OUTROS PROJETOS' }
  })
  .sort((a, b) => {
    const orderA = a.project === 'r10' ? -1 : projectOrder.indexOf(a.project)
    const orderB = b.project === 'r10' ? -1 : projectOrder.indexOf(b.project)
    return (orderA < 0 ? 99 : orderA) - (orderB < 0 ? 99 : orderB) || a.sequence - b.sequence || a.path.localeCompare(b.path)
  })
const r10Images = portfolioImages.filter((image) => image.project === 'r10')
const featuredProjectOrder = ['mdb', 'young', 'maniacos', 'phzin']
const featuredImages = portfolioImages
  .filter((image) => featuredProjectOrder.includes(image.project))
  .sort((a, b) => featuredProjectOrder.indexOf(a.project) - featuredProjectOrder.indexOf(b.project) || a.sequence - b.sequence)
const remainingImages = portfolioImages.filter((image) => image.project !== 'r10' && !featuredProjectOrder.includes(image.project))
const partnerLogos = Object.entries(import.meta.glob<string>('../assets/logos times parceiros/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' }))
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))

function ProjectCarousel({ images, label, direction = 'left' }: { images: typeof portfolioImages; label: string; direction?: 'left' | 'right' }) {
  if (!images.length) return <div className="portfolio-empty-row">As artes de {label} aparecerão aqui quando forem adicionadas à pasta do projeto.</div>

  return <div className="portfolio-marquee" aria-label={`Carrossel de projetos: ${label}`}>
    <div className="portfolio-track" style={{ animationDirection: direction === 'right' ? 'reverse' : 'normal' }}>
      {[0, 1].map((copy) => <div className="portfolio-track-group" key={copy} aria-hidden={copy === 1}>
        {images.map((image, index) => <article className="portfolio-card portfolio-marquee-card" key={`${copy}-${image.path}`}>
          <div className="portfolio-art"><img className="portfolio-image" src={image.src} alt={copy === 0 ? `Projeto ${image.title}` : ''} loading="lazy"/></div>
          <div className="portfolio-meta"><span>{image.title} · {String(index + 1).padStart(2, '0')}</span><ArrowUpRight size={17}/></div>
        </article>)}
      </div>)}
    </div>
  </div>
}
const steps = [
  ['01', 'ESCOLHA SEU PLANO', 'O time escolhe o pacote que melhor atende às suas necessidades.', Layers3],
  ['02', 'DESENVOLVEMOS O MODELO', 'Criamos os modelos visuais seguindo a identidade e o estilo da equipe.', Palette],
  ['03', 'VOCÊ ENVIA AS INFORMAÇÕES', 'O time envia nomes, partidas, resultados e demais informações necessárias.', MessageCircle],
  ['04', 'RECEBA E PUBLIQUE', 'As artes são entregues prontas para publicação no Instagram.', Zap],
] as const
const benefits = [
  ['IDENTIDADE VISUAL PADRONIZADA', 'Uma linguagem visual consistente em cada publicação.', Layers3],
  ['COMUNICAÇÃO MAIS PROFISSIONAL', 'Seu time se apresenta com mais personalidade e cuidado.', ShieldCheck],
  ['JOGADORES EM DESTAQUE', 'Valorize quem entra em campo com artes feitas para a equipe.', Users],
  ['PARTIDAS E RESULTADOS', 'Divulgue os momentos importantes da temporada.', Trophy],
  ['MAIS TEMPO PARA O TIME', 'Menos tempo resolvendo arte; mais foco na equipe.', Clock3],
  ['CONTEÚDO O MÊS TODO', 'Materiais consistentes dentro do limite do seu plano.', Sparkles],
] as const
const questions = [
  ['Os planos são mensais?', 'Sim. Os pacotes são contratados mensalmente.'],
  ['Posso escolher o estilo visual das artes?', 'Sim. O desenvolvimento considera a identidade e as referências visuais do time.'],
  ['Posso solicitar artes para jogadores e partidas?', 'Sim. Conforme os limites e entregas do plano escolhido.'],
  ['Como envio as informações?', 'As informações necessárias são enviadas diretamente pelo WhatsApp.'],
  ['Como faço para contratar?', 'Basta clicar no botão do plano desejado e iniciar uma conversa pelo WhatsApp.'],
  ['Posso mudar de plano?', 'A possibilidade de alteração pode ser combinada diretamente pelo WhatsApp.'],
]

export function Authority() {
  const names = [
    { name: 'R10 TEAM' },
    { name: 'TZ_young', href: 'https://www.instagram.com/young192_/' },
    { name: 'TZ_Phzin', href: 'https://www.instagram.com/phzinchaves/' },
    { name: 'Pedro de chaves coach', href: 'https://www.instagram.com/pedrodechaves/' },
    { name: 'PRO PLAYERS' },
  ]
  return <section className="section authority" id="experiencia"><div className="container"><Reveal><div className="section-kicker"><span>01 / TRAJETÓRIA</span><span>DO CENÁRIO PARA A SUA EQUIPE</span></div><div className="authority-layout"><div><h2 className="section-title">EXPERIÊNCIA QUE<br/>VEM DE DENTRO<br/><span>DO CENÁRIO.</span></h2></div><div className="authority-copy"><p>Já trabalhei com equipes, jogadores e profissionais do cenário competitivo de FIFA, desenvolvendo identidades visuais e materiais gráficos para projetos esportivos.</p><p>Agora, quero levar essa experiência também para equipes que desejam construir uma presença mais profissional nas redes sociais.</p><span className="small-note">REFERÊNCIAS DA MINHA TRAJETÓRIA</span></div></div></Reveal><div className="experience-strip">{names.map(({ name, href }, i) => <Reveal key={name} delay={i * .07}><div className="experience-name"><span>✳</span>{href ? <a href={href} target="_blank" rel="noreferrer">{name}</a> : name}</div></Reveal>)}</div><p className="disclaimer">Referências de trabalhos e experiências profissionais. Marcas citadas pertencem aos seus respectivos titulares.</p></div></section>
}

export function PartnerLogos() {
  if (!partnerLogos.length) return null
  return <section className="partners-section" aria-label="Times parceiros">
    <div className="container">
      <div className="partners-heading"><span>TIMES QUE JÁ TRABALHARAM COMIGO</span><span>PARCERIAS NO CENÁRIO</span></div>
    </div>
    <div className="partner-marquee" aria-label="Carrossel de logos dos times parceiros">
      <div className="partner-track">
        {[0, 1].map((copy) => <div className="partner-track-group" key={copy} aria-hidden={copy === 1}>
          {partnerLogos.map(([path, src], index) => <div className="partner-logo-tile" key={`${copy}-${path}`}>
            <img src={src} alt={copy === 0 ? `Logo de time parceiro ${index + 1}` : ''} loading="lazy" />
          </div>)}
        </div>)}
      </div>
    </div>
  </section>
}

export function Portfolio() {
  return <section className="section portfolio-section" id="portfolio"><div className="container"><Reveal><div className="section-kicker"><span>02 / PORTFÓLIO</span><span>LINGUAGEM VISUAL DE JOGO</span></div><div className="section-heading-row"><h2 className="section-title">SEU TIME<br/><span>EM OUTRO NÍVEL.</span></h2><p>Do anúncio ao apito final: peças que contam a história da sua equipe com presença e personalidade.</p></div></Reveal><div className="portfolio-rows"><div className="portfolio-lane"><div className="portfolio-lane-heading"><span>MDB · YOUNG · MANIACOS · PHZIN</span><span>01 / PROJETOS</span></div><ProjectCarousel images={featuredImages} label="MDB, Young, Maniacos e Phzin" direction="right"/></div><div className="portfolio-lane"><div className="portfolio-lane-heading"><span>R10 TEAM</span><span>02 / PROJETOS</span></div><ProjectCarousel images={r10Images} label="R10"/></div><div className="portfolio-lane"><div className="portfolio-lane-heading"><span>OUTROS PROJETOS</span><span>03 / PROJETOS</span></div><ProjectCarousel images={remainingImages} label="outros projetos" direction="right"/></div></div><div className="portfolio-note"><span className="note-icon">i</span> Ordem do primeiro carrossel: MDB, Young, Maniacos e Phzin.</div></div></section>
}

export function Pricing() {
  return <section className="section pricing-section" id="planos">
    <div className="container">
      <Reveal>
        <div className="section-kicker"><span>03 / BLACK FRIDAY</span><span>CONDIÇÃO ESPECIAL PARA SUA EQUIPE</span></div>
        <div className="pricing-heading">
          <div><span className="sale-pill"><Zap size={13}/> OFERTA BLACK FRIDAY</span><h2 className="section-title">ESCOLHA O PLANO<br/><span>IDEAL PARA SEU TIME.</span></h2></div>
          <p>Mais profissionalismo para sua equipe, com planos que cabem no orçamento.</p>
        </div>
      </Reveal>
      <div className="pricing-grid">
        {plans.map((plan, i) => <Reveal key={plan.name} delay={i * .08}>
          <article className={`price-card ${plan.featured ? 'price-featured' : ''}`}>
            <div className="price-card-top"><span>PACOTE {plan.name.toUpperCase()}</span>{plan.featured && <span className="best-choice"><Zap size={12} fill="currentColor"/> MELHOR ESCOLHA</span>}</div>
            <div className="price-body">
              <div className="price-old">De <s>R$ {plan.oldPrice},00</s> <span>−{plan.discount}</span></div>
              <div className="price-main"><span className="currency">R$</span><strong>{plan.price}</strong><span className="per-month">/mês</span></div>
              <p className="price-saving">Você economiza R$ {Number(plan.oldPrice) - Number(plan.price)},00 por mês</p>
              <p className="pricing-description">{plan.description}</p>
              <div className="price-divider"/>
              <ul>{plan.features.map(feature => <li key={feature}><span className="check-icon"><Check size={12}/></span>{feature}</li>)}</ul>
              <a className={`button ${plan.featured ? 'button-primary' : 'button-outline'}`} href={whatsappLink(plan.message)} target="_blank" rel="noreferrer">QUERO O PACOTE {plan.name.toUpperCase()} <ArrowUpRight size={16}/></a>
              <span className="monthly-note">CONTRATAÇÃO MENSAL • FALE PELO WHATSAPP</span>
            </div>
          </article>
        </Reveal>)}
      </div>
      <div className="pricing-footnote"><span>*</span> Condições promocionais da campanha Black Friday. Consulte disponibilidade ao entrar em contato.</div>
    </div>
  </section>
}

export function HowItWorks() {
  return <section className="section steps-section"><div className="container"><Reveal><div className="section-kicker"><span>04 / PROCESSO</span><span>DO PRIMEIRO CONTATO À PUBLICAÇÃO</span></div><div className="section-heading-row"><h2 className="section-title">É SIMPLES.<br/><span>SEU TIME JOGA.</span></h2><p>Você cuida da equipe. O design fica comigo.</p></div></Reveal><div className="steps-grid">{steps.map(([number, title, body, Icon], i) => <Reveal key={number} delay={i * .07}><article className="step-card"><div className="step-top"><span>{number}</span><Icon size={21}/></div><h3>{title}</h3><p>{body}</p><div className="step-bottom"><span>0{i + 1} / 04</span><div className="step-line"/></div></article></Reveal>)}</div></div></section>
}

export function Benefits() {
  return <section className="section benefits-section"><div className="container"><Reveal><div className="section-kicker"><span>05 / O QUE MUDA</span><span>MAIS JOGO, MENOS CORRERIA</span></div><div className="section-heading-row"><h2 className="section-title">MAIS PROFISSIONALISMO.<br/><span>MENOS PREOCUPAÇÃO.</span></h2></div></Reveal><div className="benefits-grid">{benefits.map(([title, body, Icon], i) => <Reveal key={title} delay={i * .04}><article className="benefit-card"><div className="benefit-icon"><Icon size={19}/></div><h3>{title}</h3><p>{body}</p><span className="benefit-number">0{i + 1}</span></article></Reveal>)}</div></div></section>
}

export function FAQ() {
  const [active, setActive] = useState<number | null>(0)
  return <section className="section faq-section" id="faq"><div className="container faq-layout"><Reveal><div className="faq-intro"><div className="section-kicker"><span>06 / FAQ</span></div><h2 className="section-title">DÚVIDAS<br/><span>DE JOGO?</span></h2><p>Se ainda ficou alguma pergunta, me chama no WhatsApp.</p><a href={whatsappLink('Olá, Andy! Tenho uma dúvida sobre os planos de Black Friday.')} target="_blank" rel="noreferrer" className="text-link">Falar com Andy <ArrowUpRight size={16}/></a></div></Reveal><div className="faq-list">{questions.map(([question, answer], i) => <Reveal key={question} delay={i * .035}><div className={`faq-item ${active === i ? 'faq-active' : ''}`}><button className="faq-question" aria-expanded={active === i} onClick={() => setActive(active === i ? null : i)}><span><b>0{i + 1}</b>{question}</span><ChevronDown size={18}/></button><AnimatePresence initial={false}>{active === i && <motion.div className="faq-answer-wrap" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .24 }}><p>{answer}</p></motion.div>}</AnimatePresence></div></Reveal>)}</div></div></section>
}

export function FinalCTA() {
  return <section className="final-cta"><div className="cta-grid"/><div className="container cta-content"><Reveal><span className="sale-pill"><Zap size={13}/> BLACK FRIDAY ANDY</span><h2>SEU PRÓXIMO JOGO<br/>COMEÇA <span>FORA DE CAMPO.</span></h2><p>Aproveite nossa condição especial de Black Friday e leve a comunicação do seu time para outro nível.</p><div className="cta-bottom"><div className="cta-price"><span>PLANOS A PARTIR DE</span><strong>R$ 40<span>/MÊS</span></strong></div><a className="button button-dark" href={whatsappLink('Olá, Andy! Quero aproveitar a oferta Black Friday para meu time.')} target="_blank" rel="noreferrer">QUERO APROVEITAR A OFERTA <ArrowUpRight size={18}/></a></div></Reveal></div><div className="cta-watermark">ANDY</div></section>
}

export function Footer() {
  return <footer className="site-footer" id="contato"><div className="container footer-main"><a className="wordmark" href="#inicio">ANDY<span>®</span></a><p>DESIGN ESPORTIVO.<br/><span>FEITO PARA O JOGO.</span></p><div className="footer-links"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={16}/> Instagram <ArrowUpRight size={13}/></a><a href={whatsappLink('Olá, Andy! Vim pela campanha de Black Friday.')} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp <ArrowUpRight size={13}/></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} ANDY. TODOS OS DIREITOS RESERVADOS.</span><a href="#inicio">VOLTAR AO TOPO <ArrowDown size={13}/></a></div></footer>
}
