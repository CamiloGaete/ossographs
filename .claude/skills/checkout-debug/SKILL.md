---
name: checkout-debug
description: "Diagnostica (SOLO LECTURA) el flujo de checkout de Ossographs: carrito → /api/checkout → MercadoPago → /api/webhook → órdenes en D1. Usar cuando Camilo diga 'el checkout falla', 'da 502 al pagar', 'MercadoPago tira error', 'no se crea la preferencia', '/api/checkout no responde', 'el webhook devuelve 401', 'la orden no cambia de estado', 'los productos no cargan'. Esta skill investiga y reporta la causa raíz; NO modifica código ni base de datos ni despliega. Para levantar el server local usa dev; para correr migraciones/consultas que escriben usa db; para construir usa build."
allowed-tools: Bash, Read, Glob, Grep
---

# Diagnóstico del checkout — Ossographs (solo lectura)

Recorre el flujo de pago para encontrar la causa raíz de un fallo, SIN cambiar código, base ni desplegar. Reporta hallazgos; los arreglos los decide Camilo después.

## El flujo real (de la implementación)

1. `src/components/Products.tsx` hace `fetch("/api/products")`; si falla, usa en silencio `FALLBACK_PRODUCTS` (10 ítems, espejo del seed).
2. Agregar al carrito → store Zustand `src/store/cart.ts` (en memoria, sin persistencia: se vacía al recargar — esto es esperado).
3. `src/components/CartDrawer.tsx` "Ir al Checkout" hace `POST /api/checkout` con `{ items: [{ id, quantity }] }` y luego `window.location.href = init_point`.
4. `functions/api/checkout.ts`: valida cantidades (enteros ≥1, si no → 400), re-lee precios desde D1 (nunca confía en el precio del cliente), inserta `orders` (`status='pending'`) y `order_items`, arma la preferencia MercadoPago (agrega ítem fijo `SHIPPING_FEE = 3990` CLP) y devuelve `init_point`. `back_urls`/`auto_return`/`notification_url` SOLO se setean si el origin es HTTPS.
5. El navegador redirige al `init_point` de MercadoPago.
6. MercadoPago vuelve a `/checkout/success|failure|pending` → `src/app/checkout-result.tsx` (limpia el carrito en éxito).
7. MercadoPago también hace `POST /api/webhook` → `functions/api/webhook.ts`: opcionalmente verifica firma HMAC, busca el pago, mapea estado y hace `UPDATE orders ... WHERE id = external_reference`.

## Pre-verificación

Identificar la capa del fallo leyendo el mensaje real (terminal del dev server para errores de función/Wrangler; consola + pestaña Network del navegador para la SPA).

Variables de entorno requeridas (presencia, SIN imprimir valores):
```bash
python3 -c "import os; p='/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/.dev.vars'; ex=os.path.exists(p); ks=set(l.split('=')[0].strip() for l in open(p)) if ex else set(); print('.dev.vars existe:', ex); print('MERCADOPAGO_ACCESS_TOKEN presente:', 'MERCADOPAGO_ACCESS_TOKEN' in ks); print('MERCADOPAGO_WEBHOOK_SECRET presente:', 'MERCADOPAGO_WEBHOOK_SECRET' in ks)"
```

## Sondas de diagnóstico (solo lectura)

Con el server full corriendo (skill `dev --full`, puerto 8788):

`/api/products` responde y trae datos:
```bash
curl -s -o /dev/null -w 'products HTTP %{http_code}\n' http://localhost:8788/api/products
curl -s http://localhost:8788/api/products | head -c 400
```
Si es `[]` → la D1 local no está migrada/sembrada (ver skill `db`). Si la UI muestra productos pero no reflejan la base → cayó a `FALLBACK_PRODUCTS` porque el fetch falló.

Checkout — caminos felices y de error:
```bash
curl -s -o /dev/null -w 'checkout ok HTTP %{http_code}\n' -X POST http://localhost:8788/api/checkout -H "Content-Type: application/json" -d '{"items":[{"id":1,"quantity":2}]}'
curl -s -o /dev/null -w 'checkout vacio HTTP %{http_code}\n'  -X POST http://localhost:8788/api/checkout -H "Content-Type: application/json" -d '{"items":[]}'
curl -s -o /dev/null -w 'checkout qty mala HTTP %{http_code}\n' -X POST http://localhost:8788/api/checkout -H "Content-Type: application/json" -d '{"items":[{"id":1,"quantity":0}]}'
curl -s -o /dev/null -w 'checkout id inexistente HTTP %{http_code}\n' -X POST http://localhost:8788/api/checkout -H "Content-Type: application/json" -d '{"items":[{"id":99999,"quantity":1}]}'
```
Esperado: ok → 200 (con token MP válido), vacío → 400, qty mala → 400, id inexistente → 400.

Inspeccionar las órdenes recientes en D1 local (solo lectura — usar skill `db` para consultas más profundas). Usa el binario wrangler LOCAL del repo + `--cwd` (no `npx wrangler` a secas, que puede traer otra versión si el cwd no es la raíz):
```bash
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --cwd /mnt/c/Users/Camilo/templodelmono_clientes/ossographs d1 execute ossographs-db --local --command "SELECT id, status, created_at, updated_at FROM orders ORDER BY id DESC LIMIT 10;"
```

## Tabla de causas raíz (de la implementación)

- **"This is Next.js" / `next: command not found`** → stack es Vite + React; `README.md`/`AGENTS.md` están obsoletos. Usar `npm run dev`/`dev:full`.
- **`/api/products` 404 o nunca responde** → estás en Vite puro (`npm run dev`), que NO corre Pages Functions. Usar `npm run dev:full`.
- **`/api/products` devuelve `[]`** → D1 local vacía; aplicar migraciones (skill `db`).
- **Productos no reflejan cambios de la base** → `Products.tsx` cayó a `FALLBACK_PRODUCTS` porque el fetch falló.
- **Checkout 502 / "MercadoPago preference creation failed"** → `MERCADOPAGO_ACCESS_TOKEN` ausente/ inválido en `.dev.vars`, o MP rechazó la preferencia. `checkout.ts` loguea `mpRes.status` y el detalle a la consola del server (revisarla).
- **Checkout 400 "Some products not found"** → un `id` del carrito no existe en `products` (base desincronizada de `FALLBACK_PRODUCTS`).
- **Checkout 400 "All quantities must be positive integers"** → el cliente mandó cantidad no-entera o `<1`.
- **Sin `back_urls`/`auto_return` en la preferencia** → `checkout.ts` solo los setea si el origin es HTTPS; sobre `http://localhost` se omiten a propósito.
- **Webhook 401** → `MERCADOPAGO_WEBHOOK_SECRET` está seteado y el HMAC `x-signature`/`x-request-id` no validó; verificar que el secret coincida con el de MercadoPago.
- **El estado de la orden nunca cambia** → el webhook no es alcanzable (necesita `notification_url` HTTPS público), o el `external_reference` no coincide con `orders.id`.
- **El carrito se vacía al recargar** → esperado; el store Zustand es en memoria sin persistencia.
- **Errores de TypeScript solo en `functions/`** → usan su propio `functions/tsconfig.json` con `@cloudflare/workers-types`.

## Salida esperada

```
DIAGNÓSTICO CHECKOUT — Ossographs
===================================
Capa:            UI / función / D1 / MercadoPago / webhook
.dev.vars:       MERCADOPAGO_ACCESS_TOKEN {presente|FALTA}, WEBHOOK_SECRET {presente|ausente}
/api/products:   HTTP {code}, {N} productos / []
/api/checkout:   ok {code}, vacío {code}, qty {code}, id inexistente {code}
Órdenes D1:      {últimas filas con estado}
CAUSA RAÍZ:      {diagnóstico concreto referenciando archivo:línea}
ARREGLO SUGERIDO: {qué cambiaría — NO aplicado; lo decide Camilo}
```

## Reglas de seguridad

- SOLO LECTURA: esta skill diagnostica y reporta. NO editar código, NO escribir en D1, NO desplegar. Para arreglar, Camilo dirige el cambio (ver skills `db`/`build`/`deploy`).
- NUNCA imprimir ni `cat` `.dev.vars` ni el token de MercadoPago — solo chequeos de presencia.
- NO "arreglar" desactivando la validación de inputs ni la verificación de firma del webhook: eso debilita seguridad y está prohibido como workaround.
- Al ejercitar `/api/checkout` golpeas la API REAL de MercadoPago con el token local: usar credenciales de prueba, no crear muchas preferencias reales.
- No guardar resultados inventados: reportar exactamente los códigos/filas observados.
