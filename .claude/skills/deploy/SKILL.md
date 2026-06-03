---
name: deploy
description: "Despliega Ossographs a Cloudflare Pages (wrangler pages deploy dist). Acción IRREVERSIBLE hacia producción: requiere confirmación explícita en un segundo turno antes de publicar. Usar cuando Camilo diga 'despliega', 'sube a producción', 'publica el sitio', 'haz deploy a Cloudflare', 'manda a prod'. Esta skill primero construye y muestra el impacto; NO publica sin la frase de confirmación. NO uses esta skill para solo construir/validar (usa build) ni para levantar el dev local (usa dev) ni para migrar la D1 remota (usa db --remote)."
allowed-tools: Bash, Read, Glob
---

# Deploy a Cloudflare Pages — Ossographs

Despliega el sitio estático construido (`dist/`) como un deployment de Cloudflare Pages. El proyecto Pages es `ossographs` (de `wrangler.toml`: `name = "ossographs"`, `pages_build_output_dir = "dist"`). No hay script `deploy` en `package.json`; el mecanismo es `wrangler pages deploy`.

**Esto publica a PRODUCCIÓN y es difícil de revertir.** El flujo es FAIL-CLOSED: construir → mostrar impacto → DETENERSE → confirmación explícita → recién publicar.

## Pre-verificación (segura, ejecutar directo)

1. Confirmar rama y estado git (no se commitea aquí, solo se informa):
```bash
git -C /mnt/c/Users/Camilo/templodelmono_clientes/ossographs rev-parse --abbrev-ref HEAD
git -C /mnt/c/Users/Camilo/templodelmono_clientes/ossographs status --short
```

2. Dependencias instaladas:
```bash
test -d /mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules && echo "node_modules: OK" || npm --prefix /mnt/c/Users/Camilo/templodelmono_clientes/ossographs install
```

3. Auth de Cloudflare (presencia, sin imprimir credenciales). Usa el binario local del repo, NO `npx wrangler` a secas: si el cwd no es la raíz del repo, npx puede descargar/ejecutar otra versión de wrangler (verificado: 4.97.0) — peligroso para un deploy a prod. El `--cwd` permite encontrar `wrangler.toml`:
```bash
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --cwd /mnt/c/Users/Camilo/templodelmono_clientes/ossographs whoami 2>&1 | head -5
```
Si no hay sesión, Camilo debe correr `/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler login`. NO imprimir tokens.

## Paso 1 — Construir el artefacto (seguro)

El deploy sube `dist/`, así que primero hay que tener un build fresco y verde. Type-check + build:
```bash
npm --prefix /mnt/c/Users/Camilo/templodelmono_clientes/ossographs run build
```
Verificar que pasó y que `dist/` existe:
```bash
test -f /mnt/c/Users/Camilo/templodelmono_clientes/ossographs/dist/index.html && echo "dist listo" || echo "BUILD FALLÓ — NO desplegar"
```
Si el build falla, DETENER. No se despliega un build roto. (Ver skill `build`.)

## Paso 2 — Mostrar impacto y DETENERSE (gate de confirmación)

NO ejecutes el deploy todavía. Reporta a Camilo, de forma explícita:
- Proyecto Pages destino: **ossographs**
- Entorno: **PRODUCCIÓN** (rama de producción de Pages)
- Rama git actual y si el árbol está sucio (del status de arriba)
- Que `dist/` recién se reconstruyó y el build pasó
- Recordatorio: los secretos de producción (`MERCADOPAGO_ACCESS_TOKEN`, `MERCADOPAGO_WEBHOOK_SECRET`) NO viven en `.dev.vars`; deben estar configurados en el dashboard/secrets de Cloudflare Pages. `.dev.vars` es solo local.

Luego DETENTE y pide confirmación explícita. **El deploy real solo procede si en un segundo turno Camilo escribe la frase exacta: `CONFIRMO DEPLOY A PROD`.** La petición original ("despliega", "sube a prod") NO cuenta como confirmación.

## Paso 3 — Deploy real (SOLO tras `CONFIRMO DEPLOY A PROD`)

Solo después de que Camilo escriba la frase exacta, publicar con el binario local + `--cwd` (la ruta `dist` se resuelve relativa al `--cwd`):
```bash
/mnt/c/Users/Camilo/templodelmono_clientes/ossographs/node_modules/.bin/wrangler --cwd /mnt/c/Users/Camilo/templodelmono_clientes/ossographs pages deploy dist --project-name ossographs
```

## Post-verificación

- Wrangler imprime la URL del deployment (`*.pages.dev`). Reportarla.
- Verificación rápida de humo contra la URL publicada:
```bash
curl -s -o /dev/null -w '%{http_code}\n' https://{url-del-deployment}/
curl -s https://{url-del-deployment}/api/products | head -c 300
```
`/api/products` debe devolver JSON desde la D1 de producción (recordar: la D1 remota debe estar migrada/sembrada — ver skill `db --remote`).

## Salida esperada

```
DEPLOY — Ossographs → Cloudflare Pages
========================================
Rama git:        {rama} ({limpio|sucio})
Build:           OK / ERROR
dist/index.html: presente
Auth Cloudflare: sesión activa / FALTA login
Gate:            PENDIENTE "CONFIRMO DEPLOY A PROD" | confirmado
Deployment URL:  https://...pages.dev  (solo tras publicar)
Smoke /:         200
Smoke /api/products: {N} productos / [] (D1 remota sin sembrar)
```

## Reglas de seguridad

- FAIL-CLOSED: NUNCA ejecutar `wrangler pages deploy` antes del gate. La acción real exige la frase `CONFIRMO DEPLOY A PROD` en un segundo turno; la orden original no basta.
- No desplegar un build roto: si `npm run build` falla, detenerse.
- NUNCA imprimir secretos ni credenciales (token de MercadoPago, tokens de Cloudflare). Solo chequeos de presencia.
- No commitear ni hacer push aquí (otra skill/flujo lo hace). Esta skill solo construye y publica el artefacto estático.
- No subir `.dev.vars` ni asumir que sus valores llegan a producción: los secrets de prod se configuran en Cloudflare, no en el repo.
- Usar **npm** y el binario wrangler LOCAL del repo (`node_modules/.bin/wrangler --cwd <repo>`, devDependency, observado 4.80.0). NO `npx wrangler` a secas (puede traer otra versión); NO `next`.
