import { cleanDigits } from "./cuit";

/** Aplica un patrón usando 'N' como placeholder de dígito. Ej: "NN-NNNNNNNN-N" */
export function applyPattern(input: string, pattern: string): string {
  const digits = cleanDigits(input).split("");
  let i = 0;
  let out = "";
  for (const ch of pattern) {
    if (ch === "N") {
      if (i >= digits.length) break;
      out += digits[i++];
    } else {
      out += ch;
    }
  }
  // si sobran dígitos, los agrega al final (opcional: podés cortarlos)
  if (i < digits.length) out += digits.slice(i).join("");
  return out;
}


