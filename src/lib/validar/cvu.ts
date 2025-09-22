import { cleanDigits } from "./cuit";
import { validateCBU } from "./cbu";

/**
 * CVU: 22 dígitos (PSP). MVP: valida longitud y dígitos.
 * strictLikeCBU: si true, aplica la misma verificación de DVs que CBU.
 */
export function validateCVU(input: string, strictLikeCBU = false): boolean {
  const c = cleanDigits(input);
  if (!/^\d{22}$/.test(c)) return false;
  return strictLikeCBU ? validateCBU(c) : true;
}

/** Formato legible: 8 + 14 separados por espacio */
export function formatCVU(input: string): string {
  const c = cleanDigits(input);
  if (c.length !== 22) return c;
  return `${c.slice(0, 8)} ${c.slice(8)}`;
}


