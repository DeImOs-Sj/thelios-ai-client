# Thelios.AI Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the DeviationFee landing page content with a Thelios.AI computer-vision landing page while retaining the existing frontend's motion, typography, responsive behavior, and visual rhythm.

**Architecture:** Keep the current `Landing` route and scoped `.lp` stylesheet. Add a single static `theliosData.ts` module for scraped Thelios content and media URLs, then make `Landing.tsx`, `HeroStage.tsx`, and `Sections.tsx` consume that data. The browser will not scrape or receive an API key; content is checked into the client for deterministic builds.

**Tech Stack:** React 19, TypeScript, Vite, existing scoped CSS, existing `@fontsource` fonts, remote Thelios media assets.

## Global Constraints

- Preserve the current landing-page route and existing dashboard route.
- Do not add dependencies or a runtime web-scraping path.
- Keep the existing motion system accessible with `prefers-reduced-motion`.
- Use only scraped Thelios claims; do not invent numeric performance metrics.
- Keep external contact, blog, privacy, and terms links pointed at Thelios destinations.

---

### Task 1: Add the scraped Thelios content contract

**Files:**
- Create: `src/pages/theliosData.ts`
- Create: `scripts/check-thelios-content.mjs`

**Interfaces:**
- Produces `THELIOS` with brand, navigation, hero, ticker, feature cards, product cards, process steps, principles, media, footer, and legal links.
- The smoke test reads `src/pages/theliosData.ts` and verifies that core scraped copy and required external links remain present.

- [ ] **Step 1: Write the content smoke test**

Create a Node script that reads `src/pages/theliosData.ts` and asserts the required Thelios brand, product, and legal strings are present.

- [ ] **Step 2: Run the test and verify it fails**

Run `node scripts/check-thelios-content.mjs` from `client/`.
Expected: FAIL because `src/pages/theliosData.ts` does not exist yet.

- [ ] **Step 3: Add the minimal static data module**

Define the exact scraped Thelios copy and remote media URLs in a typed constant. Keep the data serializable and free of React elements.

- [ ] **Step 4: Run the test and verify it passes**

Run `node scripts/check-thelios-content.mjs`.
Expected: PASS.

### Task 2: Recompose the landing page around Thelios

**Files:**
- Modify: `src/pages/Landing.tsx`
- Modify: `src/pages/HeroStage.tsx`
- Modify: `src/pages/Sections.tsx`

**Interfaces:**
- `Landing` keeps the existing `onLaunch` prop but uses Thelios contact and product anchors.
- `HeroStage` receives Thelios hero copy/media through props and keeps the existing expand-on-scroll interaction.
- Sections render Thelios feature cards, no-code product benefits, process steps, and baseball roadmap content without DeviationFee-specific labels.

- [ ] **Step 1: Replace landing navigation, hero, ticker, cards, and CTA copy**

Use `THELIOS` as the only content source and preserve existing reveal, anchor, and launch behavior.

- [ ] **Step 2: Replace product, results, process, principles, and footer copy**

Map Thelios’ sports tracking, custom analysis, accuracy, no-code, cloud, visual-layout, and baseball content into the existing section rhythm. Replace invented DeviationFee metrics with benefit statements.

- [ ] **Step 3: Use Thelios media with accessible fallbacks**

Use the scraped hero image/video URLs where supported, set meaningful alt text for images, and retain a color/background fallback when remote media is unavailable.

### Task 3: Verify build, lint, and browser behavior

**Files:**
- Modify: `package.json` only if a minimal local smoke-test script is needed.

- [ ] **Step 1: Run the static content smoke test**

Run `node scripts/check-thelios-content.mjs`.

- [ ] **Step 2: Run lint and production build**

Run `npm run lint` and `npm run build` from `client/`.

- [ ] **Step 3: Run a browser smoke test**

Start the Vite dev server, verify the root route shows Thelios content, verify the contact CTA and section anchors work, and verify `/app` still loads the existing dashboard route.

- [ ] **Step 4: Check responsive and reduced-motion states**

Inspect desktop and mobile widths, confirm no text overflows, and confirm the hero remains usable with reduced motion enabled.
