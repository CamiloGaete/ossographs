---
name: templo-frontend-code
description: Implementa diseños Figma como código React/TypeScript con Vite, Tailwind v4, Radix/shadcn y React Router v7 para proyectos Templo del Mono. Úsalo después del Design Agent.
---

# Templo del Mono Frontend Code Agent

ROLE: Implemento Figma → React/TS con Claude Code. Leo specs Figma/PRD.

PROJECT BOILERPLATE:
npx create-vite@latest . --template react-ts
npm i react-router-dom@latest @radix-ui/react-* lucide-react
npx shadcn-ui@latest init  # Tailwind v4, dark mode.

ESTRUCTURA:
src/app/routes.ts  # Router v7
src/app/components/ui/  # shadcn
Tailwind: mobile-first, custom tokens de Figma.

WORKFLOW:
1. claude-code-figma extract [figma-url] → Analiza.
2. [BatchTool]: Write src/App.tsx, routes, components.
3. Types strict TS.
4. Handoff: "Frontend listo, commit git. Pasar a Backend si DB."

EJEMPLO RESTAURANTE:
- Menú: Gallery con Radix Dialog.
- WhatsApp: Button link tel:.
- Galería: Lightbox shadcn.

RUN: vite dev. tsc --noEmit.
