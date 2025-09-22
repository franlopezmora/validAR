import { cleanDigits } from "./cuit";

function weightedSum(digs: number[], weights: number[]) {
  return digs.reduce((acc, n, i) => acc + n * weights[i], 0);
}
const mod10 = (n: number) => n % 10;

/** Valida un CBU (22 dígitos) con DVs en bloque 1 (7 pesos) y bloque 2 (13 pesos) */
export function validateCBU(input: string): boolean {
  const c = cleanDigits(input);
  if (!/^\d{22}$/.test(c)) return false;

  const b1 = c.slice(0, 8).split("").map(Number);
  const b2 = c.slice(8).split("").map(Number);

  const w1 = [7, 1, 3, 9, 7, 1, 3];
  const dv1 = b1[7];
  const s1 = weightedSum(b1.slice(0, 7), w1);
  if (mod10(s1) !== dv1) return false;

  const w2 = [3, 9, 7, 1, 3, 9, 7, 1, 3, 9, 7, 1, 3];
  const dv2 = b2[13];
  const s2 = weightedSum(b2.slice(0, 13), w2);
  if (mod10(s2) !== dv2) return false;

  return true;
}

/** Formato legible: 8 + 14 separados por espacio */
export function formatCBU(input: string): string {
  const c = cleanDigits(input);
  if (c.length !== 22) return c;
  return `${c.slice(0, 8)} ${c.slice(8)}`;
}


