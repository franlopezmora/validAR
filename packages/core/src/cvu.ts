import { cleanDigits } from "./cuit";
import { validateCBU } from "./cbu";

export function validateCVU(input: string, strictLikeCBU = false): boolean {
  const c = cleanDigits(input);
  if (!/^\d{22}$/.test(c)) return false;
  return strictLikeCBU ? validateCBU(c) : true;
}

export function formatCVU(input: string): string {
  const c = cleanDigits(input);
  if (c.length !== 22) return c;
  return `${c.slice(0, 8)} ${c.slice(8)}`;
}


