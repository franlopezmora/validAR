import { cleanDigits } from "./cuit";

export function validateDNI(input: string): boolean {
  const d = cleanDigits(input);
  return /^\d{7,8}$/.test(d);
}

export function formatDNI(input: string): string {
  const d = cleanDigits(input);
  if (d.length === 7) return `${d.slice(0,1)}.${d.slice(1,4)}.${d.slice(4)}`; // X.XXX.XXX
  if (d.length === 8) return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5)}`; // XX.XXX.XXX
  return d;
}


