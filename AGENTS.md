# Repository Guide

## Runtime And Commands

- Use pnpm; `pnpm-lock.yaml` is the lockfile and `.npmrc` requires the hoisted node linker.
- Use Node `^20.19.0` or `>=22.12.0`, as required by the locked Vite version.
- Install with `pnpm install`; start Vite with `pnpm dev`.
- Run `pnpm build` for final verification. It deliberately runs `vue-tsc -b` before `vite build`.
- For a focused typecheck, run `pnpm exec vue-tsc -b`. There are no lint, formatter, or test scripts/configurations in this repository.
- `pnpm preview` serves the production build from `dist/`; it is not the development server.

## Application Wiring

- This is one Vue 3/Vite package, not a multi-package workspace. `src/main.ts` mounts `App.vue` and installs Pinia and the router; `src/router/index.ts` owns route registration and navigation guards.
- Use the `@/` alias for `src/`. TypeScript and Vite both define it.
- Routes use `createWebHistory`, so production hosting must fall back unknown paths to `index.html`.

## API And Auth Contracts

- Configure the backend with `VITE_API_BASE_URL`; `.env.example` points to `http://localhost:8100/api`.
- Extend `src/services/httpBase.ts` for API services. It appends `/api` when absent, adds the bearer token from `localStorage.access_token`, defaults requests to 15 seconds, and emits the window event `auth:token-expired` on HTTP 401.
- Pass API endpoints without a leading slash because `APIBase.buildUrl()` inserts the separator.
- API helpers reject with plain `{ status, message, data }` objects for HTTP errors, not the original Axios error.
- `src/stores/user.ts` shares the storage keys `access_token` and `user_id` with the router and API layer; keep those names synchronized when changing auth.

## Styling

- Vite prepends `@use "@/styles/index.scss" as *;` to every SCSS block, so brand variables and the custom `lighten`/`darken` functions are already available in Vue styles. Do not import that file again locally.
- Global page styles enter through `src/main.ts` importing `src/styles/global.scss`; brand colors and fonts live in the two `*.module.scss` files forwarded by `src/styles/index.scss`.
- Use Flexbox for every layout. CSS Grid (`display: grid`, `grid-template-*`, and related properties) is prohibited in this project.
- Keep pages centered through the shared `.page-shell` container; use `flex-wrap` for responsive collections.
- The interface palette is strictly black, white, and neutral grays. Read colors from `src/styles/colorVariables.module.scss`; do not place color literals in Vue component styles.
- Keep the Disfamosa logo monochrome. Portfolio photographs may retain their original color because they document materials and finishes.
- Never use emoji or Unicode symbols as interface icons. Font Awesome 6.4 is loaded globally from `index.html`; use its `<i class="fa-...">` classes with an accessible label on the parent control.

## Gallery And Leads

- `scripts/upload-gallery.mjs` catalogs and uploads the source images from `GALLERY_SOURCE_DIR`; generated manifests live in `src/data/gallery/<category>/projects.json`. Do not hand-copy gallery images into `public/`.
- Cloudinary signing variables must remain server-side/local (`CLOUDINARY_*`, never `VITE_CLOUDINARY_API_SECRET`). The frontend reads generated `secureUrl` values only.
- LeadConnector is a two-step flow: contact submission first, qualification second. Both payloads must reuse the same `event_id`; never send the sample `headers` object because the receiving service creates it.
- Do not reveal qualification status to visitors. Both outcomes end with the same advisor-contact confirmation.
