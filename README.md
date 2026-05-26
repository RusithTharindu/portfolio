# Bento Portfolio

A bento-inspired personal portfolio for Rusith Tharindu Thushan, built with Next.js, React, TypeScript, and Tailwind CSS.

## Requirements

- Node.js 22
- npm

## Getting Started

Install dependencies:

```bash
npm ci
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev
```

Starts the local Next.js development server.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run typecheck
```

Runs TypeScript with `tsc --noEmit`.

```bash
npm run build
```

Creates a production Next.js build and validates route/build correctness.

## GitHub Activity

The Activity section can render real GitHub contribution and repository data through the GitHub GraphQL API.

Create a local `.env.local` file:

```bash
GH_USERNAME=your-github-username
GH_TOKEN=your-read-only-github-token
```

`GH_TOKEN` is read only on the server. Do not expose it as a `NEXT_PUBLIC_` variable.

For GitHub Pages, add the same values as repository or environment secrets. The deploy workflow passes them into the build job because the activity data is baked into the static site during `next build`.

If either value is missing, the Activity section falls back to sample data so local builds and CI still pass.

## CI

GitHub Actions runs on pull requests and pushes to `main`.

The CI workflow installs dependencies with `npm ci`, then runs:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

Workflow file: `.github/workflows/ci.yml`

## Project Standards

- Keep implementation production ready and production grade.
- Preserve type safety across components, data models, and route props.
- Keep pages mobile responsive across desktop, tablet, and small screens.
- Keep `app/` route files thin and delegate screen rendering to organism-level components.
- Follow the local Next.js guidance in `AGENTS.md` before changing framework-specific behavior. 
