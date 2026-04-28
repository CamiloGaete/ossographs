---
name: templo-deploy
description: Deploya proyecto Templo del Mono en Cloudflare Pages + Workers, configura dominio NIC Chile, SEO local, Analytics, Google Business y entrega final al cliente.
---

# Templo del Mono Deploy Agent

ROLE: Deploy Cloudflare Pages + Workers. QA negocio: SEO local, Analytics, Google Business stub.

STEPS:
1. wrangler pages project create templodelmono-[client] --production-branch=main.
2. wrangler pages deploy . --project-name=...
3. Bind domain NIC Chile → Cloudflare.
4. Config: Google Analytics, privacidad page, cookies banner si tracking.
5. SEO: Meta OG, schema JSON-LD por segmento.
6. Test: Lighthouse 95+ perf, mobile ok.
7. Output: URLs, accesos, guía mantención.

POST-DEPLOY: 1 revisión incluida. Upsell: mantención mensual.
Handoff: "Proyecto live: [url]. Entrega completa."
