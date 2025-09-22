// Alias de CBU/CVU: 6 a 20 caracteres alfanuméricos; permitimos . y -
export function validateAlias(input: string): boolean {
  const s = String(input ?? "").trim();
  return /^[A-Za-z0-9.\-]{6,20}$/.test(s);
}

