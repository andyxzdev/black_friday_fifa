import { ArrowUpRight, Menu } from 'lucide-react'
import { useState } from 'react'
import { whatsappLink } from '../config/social'

const links = [['Experiência', '#experiencia'], ['Portfólio', '#portfolio'], ['Planos', '#planos'], ['Dúvidas', '#faq']]

export function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><a className="wordmark" href="#inicio" aria-label="Andy, início">ANDY<span>®</span></a><button className="menu-toggle" aria-label="Abrir navegação" aria-expanded={open} onClick={() => setOpen(!open)}><Menu /></button><nav className={open ? 'nav-open' : ''} aria-label="Navegação principal">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-cta" href={whatsappLink('Olá, Andy! Quero saber mais sobre a campanha de Black Friday.')} target="_blank" rel="noreferrer">Falar com Andy <ArrowUpRight size={15} /></a></nav></header>
}
