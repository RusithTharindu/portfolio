# Portfolio v2 redesign

Date: 2026-11-03
Owner: Rusith Tharindu Thushan
Status: builder check done, awaiting Rusith's review of this document

## Why

The current site (v1) is a dark bento grid: glowing cards, stat tiles, a terminal card, DM Sans + DM Serif + JetBrains Mono, coral accent. Rusith feels it reads as generic "AI slop" and looks dated. The type, the card-everything layout and the glows all contribute.

The inspiration is Aditya Ojha's open-source portfolio (https://github.com/AdityaKodez/adityaojha, live at https://akoder.xyz, MIT licensed). What Rusith likes about it: dark, cool, but subtle, plus its playful animations. The new site should have that feel and that level of craft without looking like a copy.

What keeps it from being a copy: Rusith's own ink-brush logo (a black-and-white chibi head with rough brush strokes) drives the visual identity. Aditya's site uses paper-cut halftone stickers; Rusith's uses ink sketches in the style of his logo. Content, sections and copy are his own.

## Audience and success

Anyone: recruiters, co-workers, people who find him online. Success is someone landing on the page and leaving with a clear sense of who Rusith is as an engineer and as a person, and the site not reading as templated or AI-generated.

## Goals

- Replace the bento grid with a single framed column in the style of the approved mockup (see "Reference mockup").
- Bring in the motion vocabulary listed under "Motion", tuned to be subtle.
- Personal sections that are true to Rusith: Now, Writing, Shelf (books).
- Keep the project case-study pages, restyled to the new system.
- Keep v1 safe in git.
- Production grade, type safe, mobile responsive, accessible (per `CLAUDE.md` and `AGENTS.md`).

## Non-goals

- Keeping v1 online. It lives in git only.
- Light mode or a theme toggle. Dark only.
- Sound effects.
- Aditya's sponsor, testimonials, components registry, bookmarks, certificates, visitor counter, Discord status, Diwali/campfire scenes.
- A blog engine. Writing comes from Medium.
- A CMS. Content stays in typed TypeScript data files.

## Anti-goals (would be a failure even if it works)

- Looks like akoder.xyz with the name changed: same stickers, same copy, same section list, same Instrument Serif + Caveat pairing.
- Motion that is loud: big parallax, bouncing everything, glows. Every animation should be small and earned.
- Copying Aditya's code wholesale. Ideas and patterns are fine; if any file is adapted closely, keep the MIT notice with it.
- Breaking the static export / GitHub Pages deploy to rusith.dev.

## Preserving v1

Before any v2 code lands:

1. Create an annotated tag `v1` on the current `main` (commit `db6941d` at time of writing) and push it.
2. Also push a branch `v1` pointing at the same commit, so it is easy to browse and check out.

v2 work happens on a feature branch off `main` and merges via PR as usual. The v2 footer links to the `v1` tag's tree on GitHub (`https://github.com/RusithTharindu/portfolio/tree/v1`).

Old components that v2 no longer uses are deleted from `main` (they remain in the tag). Do not keep dead v1 code alongside v2.

## Constraints

- Stack stays: Next.js 16.2 (App Router), React 19, Tailwind CSS v4, `motion` 12, TypeScript. `AGENTS.md` warns this Next.js has breaking changes: read the relevant guide in `node_modules/next/dist/docs/` before writing code.
- `output: "export"` static site on GitHub Pages, custom domain `rusith.dev` (`public/CNAME`). Everything must work as static HTML/JS. Build-time data fetching is fine; runtime server code is not.
- GitHub contribution data already comes from `src/lib/github.ts` at build time with a fallback when no token is present. Reuse it.
- **Weekly rebuild (decided by Rusith):** add a weekly `schedule` (cron) trigger to `.github/workflows/nextjs-deploy.yml` so Medium posts and GitHub data stay current without a push.
- `prefers-reduced-motion` must disable non-essential motion everywhere.
- Mobile: 16px side gutters, no horizontal scroll, touch-friendly hit areas. Draggable stickers must not hijack vertical page scrolling on touch devices.

## Visual system (decided)

- **Layout:** one centered column, max width ~720px, framed by 1px vertical rails on both sides. Horizontal rules run full-bleed across the viewport. Outside the column, the page background has a faint diagonal hatch. Sections open with a slightly lighter "band" header row.
- **Type:** IBM Plex Sans (body, headings) and IBM Plex Mono (labels, dates, numbers, small meta). Loaded with `next/font/google`. One handwritten accent face for the greeting and small margin notes; the mockup used Gochi Hand. The builder may pick a different handwritten face, but it must not be Caveat (Aditya's). An italic serif for year chips is used in the mockup (Newsreader italic); keep it or drop it, but it must not be Instrument Serif.
- **Colour:** near-black background (~#090909, panel ~#0c0c0c), greys for text, one warm amber accent (~#e0a458) used sparingly: active nav pill, brush underline, "new" tags, active rail tick, commit graph scale. No other accent colours. Green is allowed only for the tiny "open to chat" live dot.
- **Identity:** Rusith's ink-brush logo is the favicon, the small header logo, and his "face" sticker in the hero. Hero stickers are ink sketches in the same style (passport, padlock, keyboard, tea cup). Rusith will produce these images himself; until then, render tasteful ink-style placeholders that are easy to swap (one config entry per sticker with image path, alt text, position, rotation).

## Reference mockup

`.superpowers/brainstorm/1879-1793701187/content/combined-v3.html` (git-ignored, local only). It is the approved look and motion. It is a throwaway prototype; reimplement properly in React, do not port its markup or script verbatim. Placeholder copy in it ("Ayubowan, I'm Rusith", the headline about building products and learning to break them) is acceptable as a starting point; Rusith may revise copy later.

## Page structure (decided)

Home, top to bottom:

1. **Header bar:** logo and nav pills (anchors to sections, plus CV when configured).
2. **Hero:** draggable sticker stage with the logo-face sticker, handwritten greeting with a 👋 that waves on hover, headline with an amber brush underline that draws in, two-sentence intro, location + live local time (Asia/Colombo) + "open to chat" status.
3. **Now:** small block: what he's building, watching/playing, learning this month. Hand-edited in a data file, with a visible "updated <month year>" stamp.
4. **Work:** featured projects grouped by year (italic year chips), "new" tag where flagged, rows link to `/projects/[slug]`, band link to the `/projects` index. Hover reveals a small tilted screenshot preview on desktop (from `public/projects/<slug>/`), hidden on touch/mobile.
5. **Experience:** jobs and degrees in one list (from existing `timeline` and `education` data).
6. **Writing:** latest Medium posts (title, date, link) fetched at build time from the Medium RSS feed for `@devrusith`. If the fetch fails or returns nothing, hide the section rather than failing the build.
7. **Shelf (changed by Rusith, 2026-11-03: books instead of anime/manga/games):** books standing spine-out on a shelf; picking one turns it to show its cover, with title, author, a "reading now" tag and a one-line note from Rusith below. The idea follows Aditya's bookshelf; the implementation and look (ink spines, typographic covers) are our own. Typed data file (`src/data/books.ts`); optional cover images stored locally under `public/books/`.
8. **Socials:** icon tile, name, handle, arrow. From existing `socials` data.
9. **Stack:** numbered list (01, 02, …) of grouped skills. Trim the existing `stackGroups` to the essential groups.
10. **Commits:** contribution graph using real data from `src/lib/github.ts`, amber scale, total count rolls up when scrolled into view.
11. **Footer:** signature that draws itself on scroll, a short closing line, link to the v1 code.

Floating **Menu** pill fixed at the bottom centre opens a small sheet with section links and a CV link. Must be keyboard accessible and closable with Escape. The "⌘K" button in the mockup is out of scope (no command palette); the Menu pill stands alone.

**CV (decided by Rusith):** he will add it later. Make the CV location a single optional config value (local path or URL). While it is unset, hide every CV link (header pill, menu entry). No dead links, no placeholder.

**Header GitHub count (builder's call, Claude):** drop the "★ 12" star count from the header. It needs new queries for a number that adds little.

**Work list (builder's call, Claude):** the home page shows a selected subset (add a typed `featured` flag to projects, ~5 entries), grouped by year. The band link "all projects →" goes to a restyled `/projects` index page that lists all projects grouped by year. Keep `app/projects/page.tsx`.

**Commits data (builder's call, Claude):** show a rolling last-12-months window, labelled "in the last year" (not "this year"): ~52 weeks on desktop, the most recent ~26 weeks on mobile. In production, if real GitHub data is unavailable, hide the section instead of showing sample data. In local dev, sample data may render with a visible "sample data" label. `src/lib/github.ts` will need changes for the window, cell count and amber scale.

**Project pages** (`/projects/[slug]`): keep routes, static params and metadata; restyle into the same framed column, bands, type and colour. Content model in `src/data/projects.ts` stays (can be extended).

Removed from v1: bento grid, stat tiles, terminal mode, spotlight/glow effects, the coral accent, DM Sans/DM Serif/JetBrains Mono.

## Motion (decided)

All with `motion` where React state is involved, CSS where it is purely decorative. Easing around `cubic-bezier(.22,1,.36,1)`; springy overshoot only for small pops.

- Hero entrance: staggered fade + small rise + slight blur clear.
- Brush underline draws in (SVG path length) after the headline appears.
- 👋 waves on hover/focus.
- Stickers: pop in, can be dragged with pointer, spring back on release, slight scale on hover. Logo sticker idles with a gentle bob.
- Section content reveals on scroll (once).
- Work rows: hover background, arrow nudges up-right and turns amber, preview card appears.
- Social rows: tile tilts, arrow nudges.
- Desktop-only section rail fixed to the left of the column: one tick per section, active tick grows (spring) and turns amber, neighbours grow slightly, label appears on hover/active. Driven by IntersectionObserver / scroll position.
- Commit graph cells scale in; total count rolls up.
- Footer signature draws once on scroll.
- Live dot pings.

Reduced motion: no entrance/reveal transforms, underline and signature shown fully drawn, no bob/ping, stickers not draggable (static).

## Content and data

- Keep data in `src/data/` as typed TS. New files for Now, Shelf, hero stickers. Remove v1-only data (`stats`).
- Rusith supplies: logo file (to be placed at e.g. `public/brand/logo.png`; he will add it), ink sticker images (later), shelf entries and covers, Now entries. Until provided, use clearly marked placeholder entries so the page is complete.
- Update `AGENTS.md` and `CLAUDE.md` "project purpose" text, which still describe a bento portfolio, to describe v2.

## Left to the builder

- Component structure and naming (v1 used atoms/molecules/organisms; keep or simplify).
- Exact spacing, sizes and colour values within the system above.
- The handwritten accent font choice (not Caveat).
- How the signature path is produced (a hand-drawn SVG of "Rusith" is ideal; a placeholder is fine until he provides one).
- Medium RSS parsing approach (no heavy dependency needed).
- SEO/OG metadata refresh to match the new design.
