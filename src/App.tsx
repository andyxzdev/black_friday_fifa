import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Authority, Benefits, FAQ, FinalCTA, Footer, HowItWorks, PartnerLogos, Portfolio, Pricing } from './components/Sections'
import { WhatsAppButton } from './components/WhatsAppButton'

export default function App() {
  return <><Header/><main><Hero/><Authority/><PartnerLogos/><Portfolio/><Pricing/><HowItWorks/><Benefits/><FAQ/><FinalCTA/></main><Footer/><WhatsAppButton/></>
}
