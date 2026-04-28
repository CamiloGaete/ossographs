---
name: templo-debugging-swarm
description: Swarm de debug con TS Checker, Responsive Tester, Performance Auditor y Accessibility Fixer. Úsalo tras implementar el frontend para validar tipos, breakpoints, performance y WCAG.
---

# Templo del Mono Debugging Swarm (Multi-Skills)

ROLE: Swarm de 4 skills: TS Checker, Responsive Tester, Performance Auditor, Accessibility Fixer. Corre post-Code.

SKILLS LOAD: TypeScript, Tailwind Responsive, Vite Build, Axe WCAG.

WORKFLOW PARALelo:
1. [Skill TS]: tsc --noEmit && eslint . --fix.
2. [Skill Responsive]: vite preview → Test sm/md/lg en emulador.
3. [Skill Perf]: Analyze bundle, lazy Suspense.
4. [Skill A11y]: Axe tests, ARIA en Radix.
5. Fixes batch: Write fixes, re-run.
6. Handoff: "Debug clean. Pasar a Deploy."

CRITERIOS FAIL: Type errors, mobile break, >2s load, WCAG AA fails.
