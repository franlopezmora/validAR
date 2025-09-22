# @validar/core

[![build](https://img.shields.io/badge/build-pnpm-blue)](#)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

Utilidades TypeScript para validar y formatear datos de Argentina: CUIT/CUIL, DNI, Alias, Patente, Teléfono AR, CBU y CVU, más helpers de patrones.

- Tipado completo (.d.ts)
- ESM + CJS, sideEffects:false (tree‑shaking)
- Funciona en Node, Edge y navegador

## Instalación (monorepo pnpm)

```bash
# en el root
pnpm -w add @validar/core@workspace:*
# construir el paquete
pnpm --filter @validar/core build
```

Si consumís desde otra app del monorepo (Next), importá desde "@validar/core" y listo.

## API rápida

```ts
import {
  // CUIT/CUIL
  validateCUIT, formatCUIT,
  // DNI
  validateDNI, formatDNI,
  // Alias (CBU/CVU)
  validateAlias,
  // Patente (AR)
  validatePatente, applyPlatePattern,
  // Teléfono (AR)
  validatePhoneAR, normalizeARPhoneE164, formatARPhonePretty,
  // CBU / CVU
  validateCBU, formatCBU,
  validateCVU, formatCVU,
  // Patrones genéricos
  applyPattern
} from "@validar/core";
```

### Ejemplos

Node.js
```ts
import { validateCUIT, formatCBU } from "@validar/core";

console.log(validateCUIT("20-12345678-3"));            // true/false
console.log(formatCBU("2850590940090418135201"));      // "28505909 40090418135201"
```

Edge / Serverless (Next.js Route Handler)
```ts
import { NextResponse } from "next/server";
import { validateCBU } from "@validar/core";

export async function POST(req: Request) {
  const { cbu } = await req.json();
  return NextResponse.json({ ok: validateCBU(String(cbu)) });
}
```

Patrones
```ts
import { applyPattern, validatePatente } from "@validar/core";

applyPattern("20123456783", "NN-NNNNNNNN-N"); // "20-12345678-3"
validatePatente("aa123aa");                    // true
```

## Validadores incluidos
- CUIT/CUIL: validateCUIT, formatCUIT (módulo 11)
- DNI: validateDNI, formatDNI (7–8 dígitos)
- Alias (CBU/CVU): validateAlias (6–20 alfanum., admite . y -)
- Patente (AR): validatePatente, applyPlatePattern (Mercosur/vieja/moto)
- Teléfono (AR): validatePhoneAR, normalizeARPhoneE164, formatARPhonePretty
- CBU: validateCBU, formatCBU (22 dígitos, 2 DV)
- CVU: validateCVU(strictLikeCBU?: boolean), formatCVU (22 dígitos)

## Types & bundles
- TypeScript con declaraciones .d.ts
- ESM (dist/index.mjs) y CJS (dist/index.cjs)
- "sideEffects": false para tree‑shaking

## Licencia
MIT © ValidAR
