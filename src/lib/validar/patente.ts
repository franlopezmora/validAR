// Patentes de Argentina (MERCOSUR / viejo / moto MERCOSUR)
const AUTO_MERCOSUR = /^[A-Z]{2}\d{3}[A-Z]{2}$/; // AA123AA
const AUTO_VIEJA    = /^[A-Z]{3}\d{3}$/;         // ABC123
const MOTO_MERCOSUR = /^[A-Z]\d{3}[A-Z]{3}$/;    // A123ABC

export function normalizePlate(input: string): string {
  return String(input ?? "").toUpperCase().replace(/[\s-_.]/g, "");
}

export function validatePatente(input: string): boolean {
  const s = normalizePlate(input);
  return AUTO_MERCOSUR.test(s) || AUTO_VIEJA.test(s) || MOTO_MERCOSUR.test(s);
}

/**
 * Aplica un patrón a la patente usando:
 *  - 'A' = letra
 *  - 'N' = dígito
 *  Otros caracteres se insertan tal cual (p.ej. guiones).
 *  Ej: "AA-123-AA" o "ABC-123"
 */
export function applyPlatePattern(input: string, pattern: string): string {
  const raw = normalizePlate(input);
  const letters = raw.replace(/[^A-Z]/g, "").split("");
  const digits  = raw.replace(/\D/g, "").split("");

  let out = "";
  for (const ch of pattern) {
    if (ch === "A") {
      if (!letters.length) break;
      out += letters.shift();
    } else if (ch === "N") {
      if (!digits.length) break;
      out += digits.shift();
    } else {
      out += ch;
    }
  }
  return out;
}


