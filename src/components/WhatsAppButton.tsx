import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../config/social'

export function WhatsAppButton() {
  return <a className="whatsapp-float" href={whatsappLink('Olá, Andy! Vi sua campanha de Black Friday e quero saber mais sobre os planos para meu time.')} target="_blank" rel="noreferrer" aria-label="Conversar com Andy pelo WhatsApp"><MessageCircle size={25} fill="currentColor" /><span className="sr-only">WhatsApp</span></a>
}
