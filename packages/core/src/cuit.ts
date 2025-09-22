// Limpia todo lo que no sea dígito
export function cleanDigits(s: string): string {
  return String(s ?? "").replace(/\D+/g, "");
}

const WEIGHTS = [5,4,3,2,7,6,5,4,3,2];

export function validateCUIT(input: string): boolean {
  const c = cleanDigits(input);
  if (!/^\d{11}$/.test(c)) return false;

  const nums = c.split("").map(Number);
  const body = nums.slice(0, 10);
  const dv   = nums[10];

  const sum  = body.reduce((acc, n, i) => acc + n * WEIGHTS[i], 0);
  const mod  = sum % 11;
  let calc   = 11 - mod;
  if (calc === 11) calc = 0;
  if (calc === 10) return false;

  return calc === dv;
}

export function formatCUIT(input: string): string {
  const c = cleanDigits(input);
  if (c.length !== 11) return c;
  return `${c.slice(0,2)}-${c.slice(2,10)}-${c.slice(10)}`;
}


