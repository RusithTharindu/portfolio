<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Purpose

This repository contains v2 of the personal portfolio of Rusith Tharindu Thushan: a dark, single framed column with an ink-brush identity (his own logo and ink-sketch stickers), IBM Plex Sans/Mono with small handwritten accents, one amber accent, and subtle motion. The design spec is `docs/superpowers/specs/2026-11-03-portfolio-v2-redesign-design.md`. v1 (the bento grid) lives only in git at tag `v1`.

# Implementation Standards

- Build production-ready, production-grade features. Treat this as a real portfolio site, not a prototype.
- Keep the code type safe. Prefer explicit TypeScript types for shared data, route params, component props, and reusable structures.
- Preserve strong mobile responsiveness. Every page and component should work cleanly across desktop, tablet, and mobile viewports without text overlap, layout clipping, or unusable controls.
- Maintain accessibility fundamentals: semantic HTML, useful link text, focusable interactive elements, and readable contrast.
- Keep the visual system consistent with the v2 spec (tokens in `app/globals.css`) unless there is a clear reason to improve it.
- Run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` after meaningful changes.
