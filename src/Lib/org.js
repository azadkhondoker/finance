// Receipt / slip-er upore je naam dekhabe, eta tomar somitir naam diye bodle nao
export const ORG_NAME = 'Finance';

// WhatsApp share link. Bangladesh number (01XXXXXXXXX) automatic 8801XXXXXXXXX hoye jay.
// Number thik na thakle WhatsApp-e kar kache pathabe seta select kora jay.
export function whatsappUrl(phone, text) {
  let digits = (phone || '').replace(/\D/g, '');
  if (digits.startsWith('01') && digits.length === 11) {
    digits = '88' + digits;
  }
  const base = digits.length >= 11 ? `https://wa.me/${digits}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(text)}`;
}
