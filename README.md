# Portfolio

Personal site of **Rusith Tharindu Thushan**, software engineer. Live at **[rusith.dev](https://rusith.dev)**.

This is v2: one dark, framed column with an ink-brush identity, small handwritten notes and quiet motion. The design spec lives in [`docs/superpowers/specs/2026-11-03-portfolio-v2-redesign-design.md`](docs/superpowers/specs/2026-11-03-portfolio-v2-redesign-design.md). The old bento-grid site (v1) is kept at the [`v1` tag](https://github.com/RusithTharindu/portfolio/tree/v1).

Built with Next.js 16 (App Router, static export), React 19, Tailwind CSS v4, Motion and TypeScript. It deploys to GitHub Pages on every push to `main`, and rebuilds every Monday so the Writing and Commits sections stay current.

## Running locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Checks: `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` (the build writes the static site to `out/`).

### Build-time data

- **Writing** reads the Medium RSS feed for `@devrusith` at build time. If the feed can't be reached or is empty, the section is left out.
- **Commits** reads the contribution calendar from the GitHub GraphQL API. Put a read-only token in `.env.local`:

  ```bash
  GH_TOKEN=your-read-only-github-token
  # optional, defaults to RusithTharindu
  GH_USERNAME=your-github-username
  ```

  Without a token, `npm run dev` shows sample data with a "sample data" label, and a production build leaves the section out.

## Content

Everything lives in typed files under `src/data/`:

| File | What it holds |
| --- | --- |
| `site.ts` | name, role, location, links, logo, CV link, socials |
| `now.ts` | the "Now" entries and the month they were updated |
| `projects.ts` | every project; `featured` ones show on the home page, `isNew` adds the amber tag |
| `experience.ts` | jobs and degrees |
| `books.ts` | the bookshelf |
| `stack.ts` | the numbered stack list |
| `stickers.ts` | hero sticker positions and images |

## Swapping in real assets

Several pieces ship as clearly marked placeholders:

- **Logo:** add `public/brand/logo.png`, point `site.logo.src` in `src/data/site.ts` at it, and replace `app/icon.svg` (the favicon) with an icon made from it. The social card (`/og.png`) picks up the new logo on the next build.
- **Hero stickers:** add the ink sketches as `public/brand/stickers/<id>.png` (`passport`, `keyboard`, `padlock`, `tea`) and set `src` on each entry in `src/data/stickers.ts`.
- **Books:** replace the entries in `src/data/books.ts`, optionally add front covers under `public/books/` (about 2:3) as `cover`, then set `placeholder: false`.
- **Now:** replace the entries in `src/data/now.ts`, update `updated`, then set `placeholder: false`.
- **Signature:** swap `SIGNATURE_PATH` (and the viewBox) in `src/components/chrome/Signature.tsx` for a hand-drawn SVG path.
- **CV:** set `site.cvHref` to a file under `public/` (for example `/cv.pdf`) or a URL. While it is `null`, every CV link stays hidden.
