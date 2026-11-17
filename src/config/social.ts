export const WHATSAPP_NUMBER = '5524993215864'
export const INSTAGRAM_URL = 'https://www.instagram.com/andypsd_/'

export function whatsappLink(message: string) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, '')
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : '#contato'
}
