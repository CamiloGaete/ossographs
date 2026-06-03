---
name: db
description: "Trabaja con la base D1 (SQLite) de Ossographs: aplicar migraciones, consultar productos/órdenes, agregar una nueva migración. Usar cuando Camilo diga 'aplica las migraciones', 'migra la D1', 'siembra los productos', 'consulta las órdenes', 'cuántos productos hay', 'revisa la base', 'agrega una columna a products', 'consulta SQL contra D1'. Distingue SIEMPRE local vs remoto: las escrituras/migraciones REMOTAS golpean producción y requieren confirmación explícita en un segundo turno. NO uses esta skill para desplegar el sitio (usa deploy) ni para depurar el flujo de checkout (usa checkout-debug)."
allowed-tools: Bash, Read, Glob
---

# Base de datos D1 — Ossographs

Una sola base **Cloudflare D1 (SQLite)** declarada en `wrangler.toml`: binding `DB`, nombre `ossographs-db`. Las migraciones viven en `migrations/`. Wrangler es una **devDependency** (instalada en `node_modules`, observada 4.80.0).

> INVOCACIÓN ROBUSTA DE WRANGLER (importante para `--remote`/prod): invoca SIEMPRE el binario local del repo con `--cwd`, no confíes en que `npx` resuelva la versión correcta. Si corres `npx wrangler` desde un cwd que no esté dentro del repo, npx puede DESCARGAR y ejecutar otra versión de wrangler (verificado: bajó 4.97.0) contra tu base/proyecto. El binario local es determinista:
> ```bash
> /mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --cwd /mnt/c/Users/Camilo/templodelmono_clientes/ossographs --version
> ```
> El flag `--cwd` (global de wrangler) es lo que permite encontrar `wrangler.toml`; sin él, wrangler falla con "No configuration file found" si el cwd no es la raíz del repo. Si `node_modules/.bin/wrangler` no existe, corre `npm --prefix /mnt/c/Users/Camilo/templodelmono_clientes/ossographs install` primero.

## Esquema (de `migrations/0001_initial.sql`)

- `products(id INTEGER PK AUTOINCREMENT, name TEXT NOT NULL, description TEXT NOT NULL, price INTEGER NOT NULL, badge TEXT, category TEXT)` — `price` es INTEGER en CLP (sin decimales).
- `orders(id INTEGER PK AUTOINCREMENT, status TEXT NOT NULL DEFAULT 'pending', created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT)`.
- `order_items(id INTEGER PK AUTOINCREMENT, order_id INTEGER NOT NULL REFERENCES orders(id), product_id INTEGER NOT NULL REFERENCES products(id), quantity INTEGER NOT NULL, unit_price INTEGER NOT NULL)`.

`migrations/0002_seed.sql` inserta **10** productos. Estado de orden: `webhook.ts` mapea MercadoPago a `paid`/`pending`/`failed`/`cancelled`/`refunded`/`unknown`.

Acoplamiento crítico: `src/components/Products.tsx` tiene una lista hardcodeada `FALLBACK_PRODUCTS` que DEBE reflejar el seed. Si cambias el catálogo o la forma del producto, actualiza también los SELECT en `functions/api/products.ts` y `checkout.ts`, el tipo `Product` en `src/components/ProductCard.tsx`, y `FALLBACK_PRODUCTS`.

## Argumentos

Parsea `$ARGUMENTS`:
- `--local` (DEFAULT) → opera sobre la D1 local bajo `.wrangler/`. Seguro.
- `--remote` → opera sobre la D1 de PRODUCCIÓN. Requiere intención explícita + gate de confirmación (ver abajo).
- `--migrate` → aplicar migraciones pendientes.
- `--query "SELECT ..."` → consulta ad-hoc.
- `--count` → atajo: contar productos y últimas órdenes.

Si Camilo no especifica local/remoto, asumir `--local` y decirlo.

## Pre-verificación

Confirmar que existen migraciones y el wrangler local del repo:
```bash
ls -la /mnt/c/Users/Camilo/templodelmono_clientes/ossographs/migrations/
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --version
```
Para CUALQUIER operación `--remote`: requiere auth de Cloudflare (`node_modules/.bin/wrangler --cwd <repo> login`) y acceso a `ossographs-db`.

Verifica siempre la sintaxis exacta de subcomandos contra la versión instalada si dudas:
```bash
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler d1 --help
```

## Operaciones LOCALES (seguras — ejecutar directo)

Usa el binario local con `--cwd` (encuentra `wrangler.toml` sin importar el cwd actual). El `--file` se resuelve relativo al `--cwd`, así que pásalo con ruta absoluta para evitar ambigüedad.

Aplicar migraciones a la D1 local:
```bash
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --cwd /mnt/c/Users/Camilo/templodelmono_clientes/ossographs d1 migrations apply ossographs-db --local
```

Consulta de solo lectura (local):
```bash
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --cwd /mnt/c/Users/Camilo/templodelmono_clientes/ossographs d1 execute ossographs-db --local --command "SELECT id, name, price, category FROM products ORDER BY id;"
```

Contar productos / ver últimas órdenes (local):
```bash
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --cwd /mnt/c/Users/Camilo/templodelmono_clientes/ossographs d1 execute ossographs-db --local --command "SELECT count(*) AS productos FROM products;"
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --cwd /mnt/c/Users/Camilo/templodelmono_clientes/ossographs d1 execute ossographs-db --local --command "SELECT id, status, created_at FROM orders ORDER BY id DESC LIMIT 10;"
```

Ejecutar un archivo SQL local (p.ej. resembrar):
```bash
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --cwd /mnt/c/Users/Camilo/templodelmono_clientes/ossographs d1 execute ossographs-db --local --file /mnt/c/Users/Camilo/templodelmono_clientes/ossographs/migrations/0002_seed.sql
```

## Operaciones REMOTAS (producción — FAIL-CLOSED)

Una migración `--remote`, o cualquier `INSERT/UPDATE/DELETE/DROP` con `--remote`, **modifica la base de producción** y es difícil de revertir.

NO ejecutes la acción real de inmediato. Procede así:

1. Muestra primero un **read-only** del impacto, sin escribir nada. Para una migración remota, lista qué se aplicaría:
```bash
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --cwd /mnt/c/Users/Camilo/templodelmono_clientes/ossographs d1 migrations list ossographs-db --remote
```
Para una escritura, corre primero el `SELECT` equivalente con `--remote` para mostrar exactamente qué filas se tocarían y cuántas.
2. Reporta a Camilo: base = `ossographs-db` (PRODUCCIÓN), entorno = `--remote`, acción exacta, y el conteo/objetivo de filas afectadas.
3. DETENTE y pide confirmación explícita. La acción real solo procede si en un **segundo turno** Camilo escribe la frase exacta: **`CONFIRMO D1 REMOTO`**. La petición original ("migra", "siembra") NO cuenta como confirmación.
4. Solo tras esa frase, ejecuta la acción real con el binario local + `--cwd`:
```bash
# migración remota (tras CONFIRMO D1 REMOTO):
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --cwd /mnt/c/Users/Camilo/templodelmono_clientes/ossographs d1 migrations apply ossographs-db --remote
# o escritura/consulta remota:
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --cwd /mnt/c/Users/Camilo/templodelmono_clientes/ossographs d1 execute ossographs-db --remote --command "..."
```

## Agregar una nueva migración

- NUNCA edites una migración ya aplicada. Agrega un archivo NUEVO en `migrations/` siguiendo la numeración `NNNN_nombre.sql` (el siguiente es `0003_...`).
- Si el cambio altera la forma del producto, actualiza en el MISMO cambio: `products.ts`/`checkout.ts` (SELECT), tipo `Product` en `ProductCard.tsx`, y `FALLBACK_PRODUCTS` en `Products.tsx`.
- Aplica primero a local y valida; remoto solo con el gate de arriba.

## Post-verificación

- Tras migrar local: `SELECT count(*) FROM products;` debe dar 10 (tras el seed).
- Bajo `npm run dev:full` (skill `dev --full`), `GET /api/products` devuelve filas que coinciden con la base.

## Salida esperada

```
D1 — Ossographs (ossographs-db)
=================================
Entorno:     local | REMOTO (producción)
Operación:   migrate | query | count
Resultado:   {filas / conteo / migraciones aplicadas}
Gate remoto: N/A | PENDIENTE confirmación "CONFIRMO D1 REMOTO" | confirmado
```

## Reglas de seguridad

- DEFAULT es `--local`. Solo toca `--remote` con intención explícita y tras el gate de confirmación.
- NUNCA editar una migración ya aplicada; siempre agregar una nueva numerada.
- `price`/`unit_price` son INTEGER CLP — no introducir decimales.
- Mantener integridad referencial: `order_items.order_id`/`product_id` deben referenciar filas existentes.
- Si resiembras o renombras productos, re-sincroniza `FALLBACK_PRODUCTS`.
- No cambiar el nombre del binding `DB` en `wrangler.toml` (las functions usan `env.DB`).
- Para consultas, preferir `SELECT` antes de cualquier `DELETE/UPDATE`. Nunca inventar resultados: reportar solo lo que devuelve la base.
