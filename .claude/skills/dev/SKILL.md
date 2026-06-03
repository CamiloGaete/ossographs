---
name: dev
description: "Levanta el servidor de desarrollo local de Ossographs (Vite frontend, o Cloudflare Pages full-stack con functions + D1 + MercadoPago). Usar cuando Camilo diga 'levanta el dev', 'corre la app local', 'arranca el servidor', 'prueba la app', 'quiero ver el sitio', 'corre el dev:full', 'necesito probar /api/checkout local'. NO uses esta skill para construir/validar el build (usa la skill build) ni para depurar un checkout que falla (usa la skill checkout-debug) ni para desplegar a producción (usa la skill deploy)."
allowed-tools: Bash, Read, Glob
---

# Servidor de desarrollo local — Ossographs

Ossographs es una SPA **Vite + React 18 + React Router 7 + Zustand + Tailwind v4** sobre **Cloudflare Pages**, con 3 Pages Functions (`functions/api/*`), base **D1** (`ossographs-db`) y checkout vía **MercadoPago**. Gestor de paquetes: **npm** (hay `package-lock.json`; NO usar yarn/pnpm/bun). Runtime observado: node v22, npm 10, wrangler 4.80.0.

> TRAMPA CONOCIDA: `README.md` y `AGENTS.md` en la raíz dicen que esto es **Next.js**. ES MENTIRA. El stack real es Vite + React. NUNCA ejecutes `next dev`/`next build`; no existe el binario `next`. La verdad está en `package.json`, `vite.config.ts`, `src/main.tsx`.

## Cuándo usar cada modo

Hay dos modos. Elige según lo que pida Camilo:

- **Frontend solo (Vite)** — rápido, recarga en caliente, pero `/api/*` NO funciona (Vite no ejecuta Pages Functions). `Products.tsx` cae en silencio a su lista `FALLBACK_PRODUCTS`. Úsalo para iterar UI/estilos/cart.
- **Full Pages (Wrangler)** — sirve `dist/` + las functions reales + D1 + MercadoPago. Úsalo cuando Camilo quiera probar `/api/products`, `/api/checkout` o `/api/webhook` de verdad. `dev:full` hace `npm run build` ANTES de servir, así que sirve el build, no recarga en caliente.

## Argumentos

Parsea `$ARGUMENTS`:
- `--full` → modo full Pages (`npm run dev:full`). Default si Camilo menciona API/checkout/D1/MercadoPago.
- (sin flag) → frontend Vite (`npm run dev`). Default para trabajo de UI.

## Pre-verificación

1. Confirmar que las dependencias están instaladas:
```bash
test -d /mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules && echo "node_modules: OK" || echo "node_modules: FALTA -> ejecutar npm install"
```
Si falta, instalar primero:
```bash
npm --prefix /mnt/c/Users/Camilo/templodelmono_clientes/ossographs install
```

2. **Solo para `--full`**: verificar que `.dev.vars` existe (sin imprimir su valor — contiene un token real de MercadoPago) y que tiene la clave esperada:
```bash
python3 -c "import os; p='/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/.dev.vars'; print('.dev.vars existe:', os.path.exists(p)); print('MERCADOPAGO_ACCESS_TOKEN presente:', os.path.exists(p) and any(l.split('=')[0].strip()=='MERCADOPAGO_ACCESS_TOKEN' for l in open(p)))"
```
Si `.dev.vars` falta, AVISAR: el checkout fallará con error de auth de MercadoPago. NO inventar ni imprimir el token; Camilo debe colocarlo. (Está git-ignored; no existe en un clon fresco.)

3. **Solo para `--full`**: verificar que el puerto 8788 esté libre (Wrangler Pages dev usa 8788 en este proyecto):
```bash
fuser 8788/tcp 2>/dev/null && echo "PUERTO 8788 OCUPADO" || echo "puerto 8788 libre"
```
Si está ocupado por un dev previo: `fuser -k 8788/tcp` o `pkill -f "wrangler pages dev"` (ambos usados en este repo). Confirma que apuntas al dev server, no a otro proceso, antes de matar.

4. **Solo para `--full`**: la D1 local debe estar migrada/sembrada o `/api/products` devolverá `[]`. Si Camilo no la ha aplicado, dirígelo a la skill `db` (`/api/products` vacío = D1 local sin migrar).

## Ejecución

### Modo frontend (Vite) — default UI
```bash
npm --prefix /mnt/c/Users/Camilo/templodelmono_clientes/ossographs run dev
```
Este servidor es de larga duración: lánzalo en background y reporta la URL/puerto que imprime Vite. (El puerto Vite no está fijado en `vite.config.ts`; usa el que imprima.)

### Modo full Pages (Wrangler) — `--full`
```bash
npm --prefix /mnt/c/Users/Camilo/templodelmono_clientes/ossographs run dev:full
```
Esto corre `npm run build && wrangler pages dev` (sirve `dist/`). Larga duración: lánzalo en background. El puerto observado es **8788**.

## Post-verificación

- Modo Vite: la página renderiza el storefront (los productos pueden ser la lista fallback si `/api/*` no responde).
- Modo full: probar la API real:
```bash
curl -s http://localhost:8788/api/products
```
Debe devolver JSON con productos desde D1 (10 tras el seed). Si devuelve `[]`, la D1 local no está sembrada (ver skill `db`).

## Salida esperada

```
DEV SERVER — Ossographs
=========================
Modo:        Vite (frontend) | Full Pages (functions + D1 + MercadoPago)
URL:         http://localhost:{puerto}
node_modules: OK
.dev.vars:    OK / FALTA (solo full)
Puerto 8788:  libre / liberado (solo full)
/api/products: {N} productos | [] (D1 sin migrar) | N/A (modo Vite)
PID/job:      {referencia para detenerlo}
```

## Reglas de seguridad

- NUNCA ejecutar `next dev`/`next build` — no existen aquí; usar los scripts npm de arriba.
- NUNCA imprimir ni `cat` el contenido de `.dev.vars` (token real de MercadoPago). Solo chequeos de presencia.
- Usar **npm** (hay `package-lock.json`); no introducir `yarn.lock`/`pnpm-lock.yaml`.
- No borrar `dist/` mientras `wrangler pages dev` esté corriendo.
- Antes de `kill`/`fuser -k`, confirmar que el proceso es el dev server y no trabajo no relacionado.
- En modo full, `/api/checkout` golpea la API REAL de MercadoPago con el token de `.dev.vars`: no crear muchas preferencias reales; preferir credenciales de prueba.
- Esta skill SOLO levanta servidores. Para validar el build usa la skill `build`; para depurar un checkout que falla usa `checkout-debug`; para desplegar usa `deploy`.
