---
name: build
description: "Type-check + build de Ossographs con Vite (tsc -b && vite build). Es la puerta de validación principal del repo porque NO hay framework de tests. Usar cuando Camilo diga 'compila', 'haz el build', 'valida que compila', 'corre el type-check', 'revisa que no haya errores de TypeScript', 'genera dist', 'prepara el build para desplegar'. NO uses esta skill para levantar el dev server (usa dev) ni para desplegar a producción (usa deploy)."
allowed-tools: Bash, Read, Glob
---

# Build y validación — Ossographs

Este repo **NO tiene framework de tests** (no hay Jest/Vitest/Playwright/Cypress, ni `*.test.*`/`*.spec.*`, ni script `test` en `package.json`). La validación automática más fuerte es el **type-check + build**: `npm run build` corre `tsc -b && vite build` en modo `strict`. Es la puerta que debe pasar antes de desplegar o dar por terminado un cambio.

Gestor de paquetes: **npm** (`package-lock.json`). NO `next build` — el stack es Vite, no Next.js (ver trampa en la skill `dev`).

## Pre-verificación

Confirmar dependencias instaladas:
```bash
test -d /mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules && echo "node_modules: OK" || npm --prefix /mnt/c/Users/Camilo/templodelmono_clientes/ossographs install
```

## Ejecución

Puerta principal (type-check de app + functions + build de Vite):
```bash
npm --prefix /mnt/c/Users/Camilo/templodelmono_clientes/ossographs run build
```

Nota: hay DOS configs de TypeScript — `tsconfig.json` (app, libs DOM) y `functions/tsconfig.json` (Pages Functions, `@cloudflare/workers-types`). Tipos como `PagesFunction`/`D1Database` vienen de la config de functions, no de la de app. `tsc -b` los considera vía project references.

## Post-verificación

1. El comando sale con código 0 y sin errores de TypeScript.
2. Se escribió `dist/` con el bundle:
```bash
test -f /mnt/c/Users/Camilo/templodelmono_clientes/ossographs/dist/index.html && echo "dist/index.html: OK" && ls -la /mnt/c/Users/Camilo/templodelmono_clientes/ossographs/dist/assets/ 2>/dev/null | head
```

Si el build FALLA: leer el error exacto, identificar la capa (app vs functions vía qué tsconfig lo reporta), y NO continuar a deploy. No "arreglar" desactivando `strict` ni borrando type-checks — eso oculta el bug.

## Salida esperada

```
BUILD — Ossographs
====================
npm run build:   OK / ERROR
TypeScript:      0 errores / {N} errores en {archivo:linea}
dist/index.html: escrito / faltante
Assets:          {lista de assets generados}
```

## Validación manual complementaria (cuando aplique)

`npm run build` NO ejercita la UI ni la API. Para cambios de UI o API, además del build:
- UI: levantar `npm run dev` (skill `dev`) y verificar a mano la sección afectada (cart: agregar/quitar/cantidad/totales, moneda con `formatCLP`).
- API: levantar `npm run dev:full` (skill `dev --full`) y ejercitar endpoints:
```bash
curl -s http://localhost:8788/api/products
curl -s -X POST http://localhost:8788/api/checkout -H "Content-Type: application/json" -d '{"items":[{"id":1,"quantity":2}]}'
```
Validar también rutas de error de checkout: items vacío → 400, cantidad no-entera/<1 → 400, id de producto inexistente → 400.

## Reglas de seguridad

- NUNCA inventar un `npm test`: no existe. La puerta es `npm run build` + checks manuales.
- NUNCA debilitar la validación de tipos (`strict`, type-checks) para "pasar" el build — eso es un workaround prohibido. Si un cambio de config de TS es necesario, detente y pregunta a Camilo.
- Al ejercitar `/api/checkout` a mano golpeas la API REAL de MercadoPago con el token de `.dev.vars`: no crear muchas preferencias reales; nunca imprimir el token.
- No editar paths generados/ignorados como entrada: `dist/`, `.dist/`, `.wrangler/`, `*.tsbuildinfo` son salida, no fuente.
- Usar **npm**, no yarn/pnpm/bun.
