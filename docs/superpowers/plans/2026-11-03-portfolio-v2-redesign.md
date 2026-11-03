# Portfolio v2 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the v1 bento-grid portfolio with the approved v2: a single framed dark column with ink-sketch identity, subtle motion and personal sections, keeping v1 safe in git.

**Architecture:** Static-exported Next.js App Router site. Content lives in typed data files under `src/data/`. Build-time data (GitHub contributions, Medium RSS) is fetched in server components via pure, unit-tested parsers in `src/lib/`. Visual system is Tailwind v4 utilities driven by `@theme` tokens in `app/globals.css`; motion uses `motion/react` in small client components, with CSS for purely decorative loops.

**Tech Stack:** Next.js 16.2 (App Router, `output: "export"`), React 19, Tailwind CSS v4, `motion` 12, TypeScript, Vitest (new, unit tests for `src/lib` and `src/data` helpers).

**Spec:** `docs/superpowers/specs/2026-11-03-portfolio-v2-redesign-design.md`. Approved look and motion: `.superpowers/brainstorm/1879-1793701187/content/combined-v3.html` (git-ignored; open it in a browser for reference, do not port its markup or script verbatim).

## Global Constraints

- `AGENTS.md`: this Next.js has breaking changes. Before writing code that touches fonts, metadata/icons, images or static export, read the matching guide in `node_modules/next/dist/docs/01-app/` (`01-getting-started/13-fonts.md`, `14-metadata-and-og-images.md`, `12-images.md`, `02-guides/static-exports.md`).
- Must keep `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`; deploys to GitHub Pages at `rusith.dev` (`public/CNAME`). No runtime server code, no route handlers that need a server.
- Dark only. No theme toggle. No sound.
- Fonts: IBM Plex Sans (body/headings), IBM Plex Mono (labels, dates, numbers), Gochi Hand (greeting and margin notes), Newsreader italic (year chips). Never Caveat or Instrument Serif. Never DM Sans / DM Serif / JetBrains Mono.
- Colour tokens: `--bg #090909`, `--panel #0c0c0c`, `--band #111111`, `--rail #1f1f1f`, `--line #181818`, `--t1 #ededed`, `--t2 #a3a3a3`, `--t3 #6e6e6e`, `--t4 #4d4d4d`, `--acc #e0a458`, `--acc-dim #3a2c18`, `--live #7bc48a`. Amber is the only accent; green only for the live dot.
- Column max width 720px, 1px rails both sides, full-bleed horizontal rules, diagonal hatch outside the column. 16px side gutters on mobile; no horizontal scroll at 320px.
- `prefers-reduced-motion: reduce` disables entrance/reveal transforms, bob, ping and drag; underline and signature render fully drawn.
- Content stays visible without JavaScript (reveal/entrance initial states must not hide content in no-JS HTML).
- Type-safe: explicit types for all data, props and route params. Lint (`npm run lint`), typecheck (`npm run typecheck`), tests (`npm test`) and `npm run build` pass at the end of every task.
- Every CV link is hidden while `site.cvHref` is `null`.
- The "⌘K" button and the header star count are out of scope.
- If any file is adapted closely from AdityaKodez/adityaojha, keep its MIT notice in a header comment.

## Review Focus

1. **Touch devices scrolling over the hero:** on a phone, a vertical swipe starting on a sticker must scroll the page. Stickers are draggable only when `(pointer: fine)` matches. Pinned in Task 4 verification (mobile preset swipe).
2. **No-JS and reduced-motion visibility:** with JS disabled, or with reduced motion, every section's text is visible and the underline/signature are drawn. Pinned in Task 3 (noscript `[data-reveal]`/`[data-draw]` override) and Task 8 verification.
3. **Medium feed failure or odd content:** network error, non-200, empty feed, CDATA titles, HTML entities (`&amp;`, `&#8217;`) and `?source=rss…` tracking params. The build never fails; Writing hides on zero posts; titles decode; links are clean. Pinned in Task 2 tests.
4. **Missing GitHub data in production:** no token or API error in a production build must hide Commits instead of showing the 1284 sample. Pinned in Task 2 tests (`shouldShowCommits`).
5. **Live clock hydration:** the static HTML was rendered at build time, so the clock must not render a build-time value that mismatches on hydrate. Server HTML shows `--:--`; client fills it on mount. Pinned in Task 2 tests (`formatLocalTime`) and Task 4 verification (no hydration warning in console).

---

## File Structure

```
app/
  layout.tsx                 fonts, metadata, noscript reveal override, body chrome
  globals.css                REWRITE: @theme tokens, base, hatch, keyframes (~200 lines max)
  page.tsx                   home: composes sections, awaits build-time data
  icon.svg                   placeholder ink favicon (replace favicon.ico)
  projects/page.tsx          REWRITE: all projects grouped by year
  projects/[slug]/page.tsx   keep routes; render new ProjectDetail
src/data/
  site.ts                    identity, location, cvHref, links, v1Url
  projects.ts                MODIFY: add featured/isNew + helpers
  experience.ts              jobs + degrees (replaces timeline/education)
  now.ts, shelf.ts, stack.ts, stickers.ts
  portfolio.ts               DELETE at Task 9 (contents moved)
src/lib/
  github.ts                  MODIFY: 53-week window, levels 0-4, shouldShowCommits
  medium.ts                  parseMediumFeed, getMediumPosts
  time.ts                    formatLocalTime, formatPeriod
src/components/
  chrome/   Shell, Rule, Band, Reveal, SiteHeader, Logo, MenuPill, SectionRail, SiteFooter, Signature
  hero/     Hero, StickerStage, BrushUnderline, Wave, LiveClock
  sections/ NowSection, WorkSection, ExperienceSection, WritingSection, ShelfSection,
            SocialsSection, StackSection, CommitsSection, CommitGraph, SocialIcon
  project/  ProjectDetail, YearGroupedProjects
public/brand/logo-placeholder.svg, public/brand/stickers/ (empty until Rusith supplies)
vitest.config.ts
```

The v1 `src/components/{atoms,molecules,organisms}` folders are deleted (Task 3 for home-only pieces, Task 9 for the rest). `SocialIcon.tsx` moves to `sections/` unchanged if its icons still fit the design.

---

### Task 1: Preserve v1 and open the v2 branch

**Files:** none (git only)

- [ ] **Step 1: Confirm clean `main` at the expected commit**

Run: `git status --short && git rev-parse --short HEAD`
Expected: no output from status; HEAD is `db6941d` or a descendant the user has not changed since the spec (if different, tag whatever `main` is now and note the hash).

- [ ] **Step 2: Tag and branch v1**

```bash
git tag -a v1 -m "v1: bento portfolio before the v2 redesign"
git branch v1
git push origin v1 refs/heads/v1
```

Expected: remote shows tag `v1` and branch `v1`. Verify: `git ls-remote origin v1` lists both `refs/tags/v1` and `refs/heads/v1`.

- [ ] **Step 3: Create the working branch**

Run: `git switch -c feat/v2-redesign`

---

### Task 2: Test tooling and data layer

Pure data and parsing with unit tests. No UI.

**Files:**
- Create: `vitest.config.ts`, `src/data/site.ts`, `src/data/experience.ts`, `src/data/now.ts`, `src/data/shelf.ts`, `src/data/stack.ts`, `src/data/stickers.ts`, `src/lib/medium.ts`, `src/lib/time.ts`
- Modify: `package.json` (add `vitest` devDependency, `"test": "vitest run"`), `src/data/projects.ts`, `src/lib/github.ts`
- Test: `src/lib/medium.test.ts`, `src/lib/time.test.ts`, `src/lib/github.test.ts`, `src/data/projects.test.ts`, `src/data/site.test.ts`

**Interfaces (Produces):**

```ts
// src/data/site.ts
export type Site = {
  name: "Rusith Tharindu Thushan"; firstName: "Rusith";
  role: string; company: { name: string; href: string };
  location: { label: "Sri Lanka"; timeZone: "Asia/Colombo" };
  openToChat: boolean;
  cvHref: string | null;            // null today
  mediumFeedUrl: "https://medium.com/feed/@devrusith";
  githubUrl: string; v1Url: "https://github.com/RusithTharindu/portfolio/tree/v1";
  logo: { src: string; alt: string }; // "/brand/logo-placeholder.svg" until real logo lands
};
export const site: Site;
export type SocialLink = { label: string; handle: string; href: string; icon: "github" | "linkedin" | "x" | "medium" | "bluesky" };
export const socials: SocialLink[];  // move from portfolio.ts, add handles
export function getCvHref(s?: Pick<Site, "cvHref">): string | null; // trims; "" -> null

// src/data/projects.ts (additions)
// Project gains: featured?: boolean; isNew?: boolean; previewImage stays optional
export function getFeaturedProjects(list?: Project[]): Project[];          // featured only, year desc, original order within year
export type ProjectYearGroup = { year: string; projects: Project[] };
export function groupProjectsByYear(list: Project[]): ProjectYearGroup[]; // year desc

// src/data/experience.ts
export type ExperienceItem = { title: string; org: string; kind: "work" | "study"; start: number; end: number | null; summary: string };
export const experience: ExperienceItem[]; // Rootcode 2024-null, Flyxto 2022-2024, MSc Staffordshire 2025-null, BSc Plymouth 2021-2025

// src/data/now.ts
export type NowEntry = { label: "building" | "watching" | "playing" | "learning" | "reading"; value: string };
export const now: { updated: string /* "2026-11" */; entries: NowEntry[]; placeholder: boolean };

// src/data/shelf.ts
export type ShelfItem = { title: string; kind: "anime" | "manga" | "game"; note: string; cover?: { src: string; alt: string } };
export const shelf: { items: ShelfItem[]; placeholder: boolean };

// src/data/stack.ts
export const stack: Array<{ group: string; items: string[] }>;
// exactly: Language: TypeScript, Java | Frontend: React, Next.js, Tailwind, Motion |
// Backend: Node.js, NestJS, Spring Boot | Data: PostgreSQL, MongoDB, Redis | Infra: AWS, Docker, GitHub Actions

// src/data/stickers.ts
export type HeroSticker = { id: "passport" | "padlock" | "keyboard" | "tea"; label: string; src?: string; alt: string;
  left: string /* css % */; top: number /* px */; width: number; height: number; rotate: number /* deg */ };
export const stickers: HeroSticker[]; // positions from the mockup: passport 4%/22/122x92/-8, keyboard 31%/50/160x104/3, padlock right-anchored → express as left 74%/10/108x86/9, tea left 60%/140/90x74/-5

// src/lib/time.ts
export function formatLocalTime(date: Date, timeZone: string): string; // "HH:mm", 24h, en-GB
export function formatPeriod(start: number, end: number | null): string; // "2024 — now", "2022 — 24", same year -> "2024"

// src/lib/medium.ts
export type MediumPost = { title: string; href: string; publishedAt: string /* ISO date YYYY-MM-DD */ };
export function parseMediumFeed(xml: string): MediumPost[];
export async function getMediumPosts(limit?: number /* 3 */): Promise<MediumPost[]>; // [] on any failure

// src/lib/github.ts (changes)
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;
export type GitHubActivityCell = { id: string; date: string; count: number; level: ContributionLevel; week: number; weekday: number };
export type GitHubActivity = { totalContributions: number; weeks: number; cells: GitHubActivityCell[]; source: "github" | "fallback" };
export function toLevel(level: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE"): ContributionLevel;
export function normalizeWeeks(weeks: GitHubWeek[]): GitHubActivityCell[]; // last 53 weeks, week index 0-based from oldest
export function shouldShowCommits(a: Pick<GitHubActivity, "source">, nodeEnv: string | undefined): boolean;
export async function getGitHubActivity(): Promise<GitHubActivity>;
```

Remove repository queries and repository types from `github.ts` (v2 does not show repos). Query `contributionLevel` instead of `color`.

- [ ] **Step 1: Add Vitest**

Run: `npm i -D vitest@^3`. Add `"test": "vitest run"` to scripts. Create `vitest.config.ts` with `test.environment = "node"`, `test.include = ["src/**/*.test.ts"]`, and `resolve.alias` `{ "@": <project root> }` to match tsconfig `@/*`.

- [ ] **Step 2: Write failing tests**

```ts
// src/lib/medium.test.ts
const xml = `<rss><channel>
<item><title><![CDATA[Building PassGo &amp; what OCR taught me]]></title>
<link>https://medium.com/@devrusith/passgo-123?source=rss-abc------2</link>
<pubDate>Tue, 14 Oct 2025 09:12:00 GMT</pubDate></item>
<item><title>Rusith&#8217;s notes</title><link>https://medium.com/@devrusith/notes-9</link>
<pubDate>Mon, 01 Sep 2025 00:00:00 GMT</pubDate></item>
</channel></rss>`;
test("parses items, decodes entities, strips query", () => {
  expect(parseMediumFeed(xml)).toEqual([
    { title: "Building PassGo & what OCR taught me", href: "https://medium.com/@devrusith/passgo-123", publishedAt: "2025-10-14" },
    { title: "Rusith’s notes", href: "https://medium.com/@devrusith/notes-9", publishedAt: "2025-09-01" },
  ]);
});
test("empty or garbage feed -> []", () => {
  expect(parseMediumFeed("")).toEqual([]);
  expect(parseMediumFeed("<html>503</html>")).toEqual([]);
});
test("skips items missing title or link", () => {
  expect(parseMediumFeed("<rss><item><title>x</title></item></rss>")).toEqual([]);
});
test("getMediumPosts returns [] when fetch rejects or is non-200", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
  expect(await getMediumPosts()).toEqual([]);
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("nope", { status: 500 })));
  expect(await getMediumPosts()).toEqual([]);
});
test("getMediumPosts respects limit", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(xml)));
  expect(await getMediumPosts(1)).toHaveLength(1);
});

// src/lib/time.test.ts
test("formatLocalTime uses the given zone, 24h", () => {
  expect(formatLocalTime(new Date("2026-11-03T16:12:00Z"), "Asia/Colombo")).toBe("21:42");
});
test("formatPeriod", () => {
  expect(formatPeriod(2024, null)).toBe("2024 — now");
  expect(formatPeriod(2022, 2024)).toBe("2022 — 24");
  expect(formatPeriod(2024, 2024)).toBe("2024");
});

// src/lib/github.test.ts
test("toLevel maps quartiles", () => {
  expect(["NONE","FIRST_QUARTILE","SECOND_QUARTILE","THIRD_QUARTILE","FOURTH_QUARTILE"].map(toLevel)).toEqual([0,1,2,3,4]);
});
test("normalizeWeeks keeps the last 53 weeks, indexed from 0", () => {
  const weeks = Array.from({ length: 60 }, (_, w) => ({ contributionDays: [{ date: `w${w}`, contributionCount: w, contributionLevel: "NONE" as const }] }));
  const cells = normalizeWeeks(weeks);
  expect(cells[0]).toMatchObject({ date: "w7", week: 0, weekday: 0 });
  expect(cells.at(-1)).toMatchObject({ date: "w59", week: 52 });
});
test("shouldShowCommits hides fallback only in production", () => {
  expect(shouldShowCommits({ source: "github" }, "production")).toBe(true);
  expect(shouldShowCommits({ source: "fallback" }, "production")).toBe(false);
  expect(shouldShowCommits({ source: "fallback" }, "development")).toBe(true);
});

// src/data/projects.test.ts
test("featured: only flagged, newest year first", () => {
  const f = getFeaturedProjects();
  expect(f.length).toBeGreaterThanOrEqual(4);
  expect(f.length).toBeLessThanOrEqual(6);
  expect(f.every((p) => p.featured)).toBe(true);
  expect(f.map((p) => p.year)).toEqual([...f.map((p) => p.year)].sort().reverse());
});
test("groupProjectsByYear groups and orders desc", () => {
  const g = groupProjectsByYear(projects);
  expect(g.map((x) => x.year)).toEqual(["2026", "2025", "2024"]);
  expect(g.flatMap((x) => x.projects)).toHaveLength(projects.length);
});

// src/data/site.test.ts
test("cv href hidden when null or blank", () => {
  expect(getCvHref({ cvHref: null })).toBeNull();
  expect(getCvHref({ cvHref: "  " })).toBeNull();
  expect(getCvHref({ cvHref: "/cv.pdf" })).toBe("/cv.pdf");
});
```

- [ ] **Step 3: Run tests, confirm they fail**

Run: `npm test`
Expected: FAIL (missing modules/exports).

- [ ] **Step 4: Implement the data files and libs per the Interfaces block**

- `parseMediumFeed`: regex over `<item>…</item>`; unwrap CDATA; decode `&amp; &lt; &gt; &quot; &#39;` and numeric `&#NNNN;`; strip the URL query with `new URL(href)` → `origin + pathname`; `publishedAt` from `pubDate` via `new Date(...).toISOString().slice(0, 10)`; drop invalid items.
- `getMediumPosts`: `fetch(site.mediumFeedUrl)`, return `[]` on throw or `!res.ok`, then `parseMediumFeed(text).slice(0, limit)`.
- `getGitHubActivity`: keep env handling; fallback cells use the new shape (53 weeks × 7, levels via the existing seeded generator), `source: "fallback"`.
- `projects.ts`: set `featured: true` on DoodleDraw, SpendShift, PassGo, RespawnRealm, HealthHarmony; `isNew: true` on DoodleDraw.
- `now.ts` and `shelf.ts`: `placeholder: true` with 3–4 plausible, clearly-marked placeholder entries (e.g. note text starts with "placeholder:"), so Rusith can find and replace them.
- `stickers.ts`: no `src` yet (Rusith supplies later).

- [ ] **Step 5: Run tests, lint, typecheck**

Run: `npm test && npm run lint && npm run typecheck`
Expected: all pass. (`portfolio.ts` still exists and is still used by v1 components; leave it.)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add v2 data layer, Medium feed parser and test tooling"
```

---

### Task 3: Design system and page shell

Replaces v1 global styles and the home page with the empty v2 frame. v1 project pages will look unstyled until Task 9; that is expected on this branch.

**Files:**
- Rewrite: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`
- Create: `app/icon.svg`, `public/brand/logo-placeholder.svg`, `src/components/chrome/{Shell,Rule,Band,Reveal,Logo}.tsx`
- Delete: `app/favicon.ico`; v1 home-only components: `organisms/{PortfolioExperience,PortfolioScreen,TerminalMode}.tsx`, `atoms/{ActivityGrid,MotionCard,MotionPulse,Spotlight?,StatCard,TerminalOutput,Brand,Chip,SectionLabel,SocialLink}.tsx`, `molecules/{AboutCard,ActivityCard,ContactCard,EducationCard,HeroCard,PortfolioFooter,PortfolioNav,ProjectCard,ProjectsCard,StackCard,StatsCard,StatusCard,TerminalCard,TimelineCard}.tsx`. Keep anything still imported by project pages (`Spotlight`, `Footer`, `Brand`, `Project*`) until Task 9; let `npm run typecheck` tell you.

**Interfaces (Produces):**

```tsx
Shell({ children }): JSX            // centred 720px panel with rails; outer hatch comes from body
Rule(): JSX                         // full-bleed 1px rule (extends past the rails)
Band({ id?, title, aside? }: { id?: string; title: string; aside?: React.ReactNode }): JSX // section header row, <h2>
Reveal({ children, delay?, as? }: { children: React.ReactNode; delay?: number; as?: "div" | "li" | "section" }): JSX // "use client"; motion whileInView once, y 12 → 0, opacity 0 → 1, 0.6s, ease [0.22,1,0.36,1]; renders static when useReducedMotion(); sets data-reveal
Logo({ size }: { size: number }): JSX // next/image-free <img> of site.logo, rounded square, black bg
```

- [ ] **Step 1: Read the fonts and metadata guides** in `node_modules/next/dist/docs/01-app/01-getting-started/` (`13-fonts.md`, `14-metadata-and-og-images.md`).

- [ ] **Step 2: `app/layout.tsx`**

Load IBM Plex Sans (400/500/600), IBM Plex Mono (400/500), Gochi Hand (400), Newsreader (italic 400) via `next/font/google` as CSS variables `--font-sans`, `--font-mono`, `--font-hand`, `--font-serif`. `<html lang="en" className="dark">`, `color-scheme: dark`. Metadata: title `Rusith Tharindu Thushan · Software Engineer`, description built from `site`. Add inside `<head>`: `<noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}[data-draw]{stroke-dasharray:none!important;stroke-dashoffset:0!important}"}</style></noscript>`. Every animated SVG stroke (BrushUnderline, Signature) carries `data-draw`.

- [ ] **Step 3: `app/globals.css`**

`@import "tailwindcss";` then `@theme` with the Global Constraints colour tokens as `--color-*` and the four font variables. Base: body background `--bg` plus `repeating-linear-gradient(-45deg, transparent 0 7px, #111 7px 8px)`, text `--t2`, 14.5px/1.6, `overflow-x: clip` on html and body. Keyframes: `bob`, `ping`, `wave`. `@media (prefers-reduced-motion: reduce)` kills animations/transitions. Target ≤ 200 lines; component styling lives in Tailwind classes.

- [ ] **Step 4: Placeholder ink assets**

`public/brand/logo-placeholder.svg` and `app/icon.svg`: the ink-face stand-in from the mockup's `#inkface` symbol (white face, spiky black hair with white stroke, two oval eyes) on black. `site.logo.src` points at the placeholder.

- [ ] **Step 5: `app/page.tsx`** renders `<Shell>` with a temporary header row (`<Logo size={30}/>`) and a `<Band title="Work"/>` so the frame is visible.

- [ ] **Step 6: Verify**

Run: `npm run lint && npm run typecheck && npm test && npm run build`
Expected: all pass. Then `npm run dev`, open `/` at desktop and the mobile preset: dark hatch outside, 720px railed column, full-bleed rule, no horizontal scrollbar at 320px width.

- [ ] **Step 7: Commit** — `git add -A && git commit -m "feat: v2 design tokens, fonts and page shell"`

---

### Task 4: Header and hero

**Files:**
- Create: `src/components/chrome/SiteHeader.tsx`, `src/components/hero/{Hero,StickerStage,BrushUnderline,Wave,LiveClock}.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `site`, `getCvHref`, `stickers`, `formatLocalTime`, `Logo`, `Rule`.
- Produces: `SiteHeader({ sections }: { sections: Array<{ id: string; label: string }> })`, `Hero()`.

Copy (from the approved mockup, Rusith may edit later): greeting `Ayubowan, I'm Rusith`; headline `I build full-stack products, and I'm learning to <brush>break them</brush>.`; lede `Software engineer at Rootcode. I like turning slow, form-heavy processes into software people don't dread. Evenings go to an MSc in Cybersecurity.`; status `open to chat`.

- [ ] **Step 1: `SiteHeader`** — logo left; centred pills for the first three entries of `sections` (page passes `work`, `writing` if rendered, `now`; first pill amber "on"); a `cv` pill only when `getCvHref()` is non-null. Pills hidden below 560px. `<header>` with `<nav aria-label="Sections">`.

- [ ] **Step 2: `StickerStage` ("use client")** — 230px tall stage. Each `stickers` entry renders a `motion.div`: white 5px border, 16px radius, black fill, `src` image if present else the label in mono 10px. Entrance pop (opacity 0 → 1, y 14 → 0, spring), stagger 90ms. Logo sticker (98×98, left 5%, top 126, rotate −4°) with CSS `bob` 4s after entrance. `drag` with `dragSnapToOrigin`, `dragElastic 0.6`, `whileHover { scale: 1.05 }`, `whileDrag { scale: 1.08, zIndex: 5 }`, enabled only when `matchMedia("(pointer: fine)").matches` and not reduced motion (decide after mount; server render is non-draggable). Handwritten hint `← drag us around` only when draggable. Stage `aria-hidden="true"`, stickers are decorative.

- [ ] **Step 3: `BrushUnderline` ("use client")** — wraps children; SVG path `M3 8 C 40 3, 90 10, 130 5 S 185 7, 197 4`, amber, stroke 3.2, round caps; `pathLength` 0 → 1 over 0.7s after 1.1s delay; reduced motion → drawn immediately.

- [ ] **Step 4: `Wave`** — `<span role="img" aria-label="waving hand">👋</span>` with CSS `wave` keyframes on hover and focus-visible (tabIndex 0).

- [ ] **Step 5: `LiveClock` ("use client")** — renders `--:--` on the server and first client render; after mount sets `formatLocalTime(new Date(), site.location.timeZone)` and updates every 30s; `<time>` element. Live dot: 7px `--live` with CSS `ping`.

- [ ] **Step 6: `Hero`** — stage, greeting (Gochi Hand 23px), `<h1>` 24px/600 with `BrushUnderline`, lede with `Rootcode` and `MSc in Cybersecurity` emphasised (`--t1`, 1px bottom border), mono meta row `◎ Sri Lanka · <LiveClock/>` and `● open to chat` (only if `site.openToChat`). Hero text staggers in (opacity, y 10 → 0, blur 4 → 0, 90ms steps) via motion with `data-reveal`.

- [ ] **Step 7: Verify**

`npm run lint && npm run typecheck && npm test && npm run build`. Dev server checks: desktop: stickers drag and spring back, hint shown, underline draws, wave on hover, clock shows Colombo time; console has no hydration warnings. Mobile preset (touch): swipe up starting on a sticker scrolls the page; no drag hint; pills hidden; nothing overflows at 320px.

- [ ] **Step 8: Commit** — `git add -A && git commit -m "feat: v2 header and hero with ink stickers"`

---

### Task 5: Core sections: Now, Work, Experience, Socials, Stack

**Files:**
- Create: `src/components/sections/{NowSection,WorkSection,ExperienceSection,SocialsSection,StackSection}.tsx`, `src/components/project/YearGroupedProjects.tsx`; move `atoms/SocialIcon.tsx` → `sections/SocialIcon.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `now`, `getFeaturedProjects`, `groupProjectsByYear`, `experience`, `formatPeriod`, `socials`, `stack`, `Band`, `Rule`, `Reveal`.
- Produces: `YearGroupedProjects({ groups, showPreview }: { groups: ProjectYearGroup[]; showPreview: boolean })` (reused by `/projects` in Task 9). Section components take no props and own their `id`: `now`, `work`, `experience`, `socials`, `stack`.

- [ ] **Step 1: `NowSection`** — Band `Now` with aside `updated Nov 2026` (format `now.updated`). Rows: mono label (`building`, …) + value. If `now.placeholder` is true in development, show a small `placeholder` mono tag; in production render as-is.

- [ ] **Step 2: `YearGroupedProjects`** — per group: italic Newsreader year chip on `#1a1a1a`; rows are `<Link href={/projects/${slug}}>` with bold title, `--t3` description, amber `new` tag when `isNew`, arrow `↗` that nudges (3px, −3px) and turns amber on hover/focus; rounded `#141414` hover backdrop. When `showPreview` and `previewImage` exists: a 150×92 tilted (−3°) preview appears on hover, only at `(hover: hover) and (min-width: 768px)`; `alt=""` (decorative, the link text names the project). Long descriptions wrap below the title on narrow widths; arrow/tag never overlap text.

- [ ] **Step 3: `WorkSection`** — Band `Work` with aside link `all projects →` to `/projects`; `YearGroupedProjects` with featured groups, `showPreview`.

- [ ] **Step 4: `ExperienceSection`** — Band `Experience`; rows title `Software Engineer · Rootcode` style (`title · org`), summary `--t3`, mono `formatPeriod` on the right.

- [ ] **Step 5: `SocialsSection`** — rows: 38px icon tile (tilts −8° and scales on hover), name, mono handle, arrow nudging right; external links `target="_blank" rel="noreferrer"`.

- [ ] **Step 6: `StackSection`** — numbered rows `01…05`, mono number, group name `--t1`, items `--t2`; dashed separators. Single column under 560px.

- [ ] **Step 7: Compose** in `app/page.tsx`: Hero, Now, Work, Experience (Writing and Shelf slots added in Task 6), Socials, Stack; `Rule` between; each section wrapped in `Reveal`.

- [ ] **Step 8: Verify** — lint, typecheck, test, build pass. Dev: keyboard Tab reaches every work row and social link with a visible focus ring; preview only on desktop hover; layout clean at 320px, 768px, 1280px.

- [ ] **Step 9: Commit** — `feat: v2 now, work, experience, socials and stack sections`

---

### Task 6: Data-driven sections: Writing, Shelf, Commits

**Files:**
- Create: `src/components/sections/{WritingSection,ShelfSection,CommitsSection,CommitGraph}.tsx`
- Modify: `app/page.tsx` (async; `await Promise.all([getMediumPosts(3), getGitHubActivity()])`)

**Interfaces:**
- Consumes: `MediumPost[]`, `GitHubActivity`, `shouldShowCommits`, `shelf`.
- Produces: `WritingSection({ posts }: { posts: MediumPost[] })` (returns `null` when empty), `ShelfSection()`, `CommitsSection({ activity }: { activity: GitHubActivity })` (returns `null` when `!shouldShowCommits(activity, process.env.NODE_ENV)`).

- [ ] **Step 1: `WritingSection`** — Band `Writing` with aside `medium ↗` to the profile; rows: title `--t1`, mono date `14 Oct 2025`, arrow; external link.

- [ ] **Step 2: `ShelfSection`** — Band `Shelf`; horizontally scrollable row (`overflow-x: auto`, scroll-snap, visible scrollbar hidden only cosmetically; the page itself must not scroll horizontally). Card 120px wide: cover image (2:3) or, without `cover`, a typographic ink tile (black, white 3px border, title in Plex Sans 600). Under it: title, mono `kind`, one-line note `--t3`. Covers hover-lift 4px.

- [ ] **Step 3: `CommitGraph` ("use client")** — grid of 7 rows × `activity.weeks` columns (column-major by `week`/`weekday`); level colours `#181818, #2e2416, #5e4521, #a97a3a, #e0a458`; below 640px render only the most recent 26 weeks. Cells scale 0 → 1 when in view, delayed by `week * 12ms`; total rolls up from 0 over 1.2s (ease-out cubic) on first view. Reduced motion: static cells and final number. Each cell `title="N contributions on DATE"`; graph `role="img"` with `aria-label="N contributions in the last year"`.

- [ ] **Step 4: `CommitsSection`** — Band `Commits` with aside `<count/> in the last year`; when `activity.source === "fallback"` (dev only), aside shows `sample data` in amber mono.

- [ ] **Step 5: Compose** — order: Hero, Now, Work, Experience, Writing, Shelf, Socials, Stack, Commits.

- [ ] **Step 6: Verify** — lint, typecheck, test, build. `npm run build` without `GH_TOKEN`: the exported `out/index.html` contains no `id="commits"` section (`grep -c 'id="commits"' out/index.html` → `0`). With network blocked to medium.com (or temporarily pointing `mediumFeedUrl` at an invalid host locally), build still succeeds and `id="writing"` is absent; revert.

- [ ] **Step 7: Commit** — `feat: v2 writing, shelf and commits sections`

---

### Task 7: Navigation chrome and footer

**Files:**
- Create: `src/components/chrome/{SectionRail,MenuPill,SiteFooter,Signature}.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: section ids from Tasks 4–6 (`top`, `now`, `work`, `experience`, `writing`, `shelf`, `socials`, `stack`, `commits`), `site`, `getCvHref`.
- Produces: `SectionRail({ sections }: { sections: Array<{ id: string; label: string }> })`, `MenuPill({ sections, cvHref }: { sections: Array<{ id: string; label: string }>; cvHref: string | null })`, `SiteFooter()`, `Signature()`.

`app/page.tsx` builds one `sections` array from what actually rendered (omit `writing`/`commits` when those return `null`) and passes it to SiteHeader, SectionRail and MenuPill.

- [ ] **Step 1: `SectionRail` ("use client")** — fixed, vertically centred, left of the column (`left: max(16px, calc(50% - 480px))`), visible only at ≥1100px. One 22×2px tick per section with a mono label that appears on hover/focus/active. Active section = section whose centre is nearest viewport centre (IntersectionObserver with multiple thresholds or a throttled scroll handler). Active tick: amber, `scaleX` 1.9 via `useSpring({ stiffness: 260, damping: 30, mass: 0.8 })`; neighbours 1.35 and `#555`. `<nav aria-label="Page sections">`, links are anchors, `aria-current="true"` on active.

- [ ] **Step 2: `MenuPill` ("use client")** — fixed bottom-centre white pill `Menu`; opens a sheet above it with section links and `Download CV` (only when `cvHref`). Spring open (y 12 → 0, scale .96 → 1). Button has `aria-expanded`, `aria-controls`; Escape closes and returns focus to the button; clicking a link or outside closes. Safe-area aware (`bottom: max(18px, env(safe-area-inset-bottom))`).

- [ ] **Step 3: `Signature` ("use client")** — placeholder path from the mockup's `.sign path`; stroke `--t1` 2.2, draws once in view over 2.2s; reduced motion: drawn. Exported as a component so the real hand-drawn SVG replaces the path later.

- [ ] **Step 4: `SiteFooter`** — Signature centred with mono `thanks for scrolling this far`; Rule; row: `built by rusith, with too much tea` and `v2 · see v1 →` linking to `site.v1Url`. Bottom padding ≥ 96px so the Menu pill never covers it.

- [ ] **Step 5: Verify** — lint, typecheck, test, build. Dev: rail tracks while scrolling and jumps on click (desktop ≥1100px), hidden below. Menu: open with keyboard, Tab through items, Escape closes and focus returns. No CV entries anywhere (cvHref is null).

- [ ] **Step 6: Commit** — `feat: v2 section rail, menu pill and footer`

---

### Task 8: Motion and accessibility pass

**Files:** touch-ups in any v2 component; no new features.

- [ ] **Step 1: Reduced motion** — DevTools "Emulate prefers-reduced-motion: reduce" (or `resize_window` + emulation in the browser pane). Expected: no entrance/reveal movement, stickers static and not draggable, no bob/ping, underline and signature fully drawn, graph and count static.

- [ ] **Step 2: No JS** — disable JavaScript, load `out/index.html` via `npx serve out`. Expected: every section's text visible, underline and signature visible (via the `[data-draw]` noscript rule from Task 3), links work.

- [ ] **Step 3: Contrast and focus** — check `--t3 #6e6e6e` on `#0c0c0c` is used only for secondary text ≥ 12px; body text uses `--t2`. Every interactive element has a visible `:focus-visible` style (amber 1px outline, 2px offset).

- [ ] **Step 4: Lighthouse** — run Lighthouse (mobile) on the built site. Expected: Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95, Performance ≥ 90. Fix regressions.

- [ ] **Step 5: Commit** — `fix: v2 reduced-motion, no-JS and focus polish`

---

### Task 9: Project pages and v1 removal

**Files:**
- Create: `src/components/project/ProjectDetail.tsx`
- Rewrite: `app/projects/page.tsx`, `app/projects/[slug]/page.tsx` (keep `generateStaticParams`, `generateMetadata`, `params: Promise<{ slug: string }>`)
- Delete: all remaining `src/components/{atoms,molecules,organisms}`, `src/data/portfolio.ts`, unused `src/lib/date.ts` exports

**Interfaces:**
- Consumes: `projects`, `getProject`, `getNextProject`, `groupProjectsByYear`, `YearGroupedProjects`, chrome components.
- Produces: `ProjectDetail({ project, next }: { project: Project; next: Project | null })`.

- [ ] **Step 1: `/projects` index** — Shell + SiteHeader (sections: none, logo links home) + Band `All projects` with aside `← home`; `YearGroupedProjects` with all projects, `showPreview`; SiteFooter; MenuPill with home links (`/#work` etc.). Metadata: title `Projects · Rusith`.

- [ ] **Step 2: `ProjectDetail`** — inside Shell: back link `← all projects`; mono meta `NN · YEAR · STATUS`; `<h1>` from `heading` (`before` `emphasis` `after`, emphasis with BrushUnderline); `lede`; action links as pills (first amber); preview image if any (rounded, 1px `#242424` border, no basePath prefix); Bands: `Problem`, `Approach`, `Role`, `Highlights` (list), `Stack` (mono chips), `At a glance` (two-column mono key/value, single column < 560px); next-project row linking to `next`. Reveal per band.

- [ ] **Step 3: Delete v1 leftovers** and run `npm run typecheck` until clean. Confirm nothing imports `src/data/portfolio.ts`.

- [ ] **Step 4: Verify** — lint, typecheck, test, build. `ls out/projects` lists all 9 slugs plus `index.html`. Dev: `/projects/passgo/` renders, links back and forward work, mobile 320px clean.

- [ ] **Step 5: Commit** — `feat: v2 project pages; remove v1 components`

---

### Task 10: Metadata, CI schedule and docs

**Files:**
- Modify: `app/layout.tsx` (OG/Twitter metadata), `.github/workflows/nextjs-deploy.yml`, `AGENTS.md`, `CLAUDE.md`, `README.md` (screenshots/description if it describes bento)
- Create: `app/opengraph-image.tsx` only if supported with static export per `14-metadata-and-og-images.md`; otherwise a static `app/opengraph-image.png` placeholder (1200×630, dark, logo + name in Plex Sans)

- [ ] **Step 1: Weekly rebuild** — add to the workflow `on:`:

```yaml
  schedule:
    - cron: "0 3 * * 1" # Mondays 03:00 UTC: refresh Medium and GitHub data
```

Verify: `npx --yes @action-validator/cli .github/workflows/nextjs-deploy.yml` (or YAML parses with `node -e "require('yaml')"` if available); the `push` and `workflow_dispatch` triggers stay.

- [ ] **Step 2: Metadata** — `metadataBase: new URL("https://rusith.dev")`, title template `%s · Rusith`, description, OG and Twitter card with the OG image.

- [ ] **Step 3: Docs** — `AGENTS.md` "Project Purpose": replace the bento/handoff paragraph with: v2 single-column ink-identity portfolio, link to the spec, note that v1 lives at tag `v1`. `CLAUDE.md`: "bento-inspired" → "single-column, ink-identity". Keep the Next.js agent-rules block untouched.

- [ ] **Step 4: Asset hand-off note** — add a short "Swapping in real assets" section to `README.md`: logo → `public/brand/logo.png` + update `site.logo.src` + replace `app/icon.svg`; stickers → `public/brand/stickers/<id>.png` + set `src` in `stickers.ts`; shelf covers; Now entries; CV → set `site.cvHref`.

- [ ] **Step 5: Final verification** — `npm run lint && npm run typecheck && npm test && npm run build`, all pass. Browser: home and one project page at mobile (375), tablet (768), desktop (1280); reduced motion; console clean.

- [ ] **Step 6: Commit** — `chore: v2 metadata, weekly rebuild and docs`

Then use superpowers:finishing-a-development-branch (PR `feat/v2-redesign` → `main`; merging deploys to rusith.dev, so the PR waits for Rusith's review).
