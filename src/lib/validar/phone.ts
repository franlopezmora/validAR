/** Devuelve el E.164 para Argentina (+54...), o null si no se puede normalizar. */
export function normalizeARPhoneE164(input: string): string | null {
  let s = String(input ?? "").replace(/[^\d+]/g, "");

  if (s.startsWith("00")) s = "+" + s.slice(2);

  if (!s.startsWith("+")) {
    if (s.startsWith("54")) s = "+" + s;
    else s = "+54" + s;
  }

  s = "+" + s.replace(/^\+/, "").replace(/\D/g, "");

  const digits = s.slice(1);
  if (digits.length < 8 || digits.length > 15) return null;

  return s;
}

/** Valida que el teléfono se pueda normalizar a E.164 con +54. */
export function validatePhoneAR(input: string): boolean {
  return normalizeARPhoneE164(input) !== null;
}

/** Formateo "bonito" básico: +54 XX XXXX-XXXX / +54 XXX XXX-XXXX (heurístico) */
export function formatARPhonePretty(input: string): string {
  const e164 = normalizeARPhoneE164(input);
  if (!e164) return input;

  const rest = e164.replace(/^\+54/, "");
  const d = rest.replace(/\D/g, "");
  if (d.length === 10) return `+54 ${d.slice(0,2)} ${d.slice(2,6)}-${d.slice(6)}`;
  if (d.length === 9)  return `+54 ${d.slice(0,3)} ${d.slice(3,6)}-${d.slice(6)}`;
  if (d.length === 8)  return `+54 ${d.slice(0,2)} ${d.slice(2,4)}-${d.slice(4)}`;
  return e164;
}


