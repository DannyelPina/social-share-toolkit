# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Verifying changes

Run all of these after a code change:

- `npm run lint`
- `npm run typecheck` (`vue-tsc`, which also covers `.vue` files)
- `npm test`
- `npm run build`, then `npm run check:package` (publint and arethetypeswrong on the built package)

CI (`.github/workflows/ci.yml`) runs the same commands plus `npm run format:check` on every PR, so keep the workflow and this list in step.

Vitest tests live in `tests/` (not `src/`, which is published) and render components to strings with `react-dom/server` and `vue/server-renderer`, so there's no DOM environment. For behavior or UI changes, also check manually in the demo app, which lives in a separate repo (live at https://dannyelpina.github.io/social-share-toolkit-demo).

## Git conventions

Husky rejects commits that break these rules:

- Branches: `feature/`, `bugfix/`, `hotfix/`, `chore/` or `doc/` followed by a name. This also blocks commits directly on `main`.
- Commit messages: `<type>: <subject>`, all lower-case, with no scope. Types are `feat`, `fix`, `chore` and `doc`.

`bugfix` and `hotfix` are valid only as branch prefixes, so use `fix` for bug-fix commits. PRs land with regular merge commits. `Docs/CONTRIBUTING.md` documents the same rules, so update both together.

## Publishing

Publishing is manual: the maintainer runs `npm publish`, and `prepublishOnly` rebuilds `dist` first. Never run `npm publish` yourself.

Each `exports` entry has separate `import` and `require` conditions, each with its own `types` (`.d.mts` or `.d.ts`). Keep that shape when adding an entry point; a single top-level `types` makes Node ESM consumers resolve CJS types.

## Architecture

There are three entry points, each bundled with tsup: `src/core` (`.`), `src/react` (`./react`) and `src/vue` (`./vue`).

- To add a network, update `NetworkKey` in `src/core/types.ts`, add its entry in `src/core/networks.ts`, and update the README tables. The components read from the registry.
- `SocialShareButton` and `SocialShareBox` exist separately in React and Vue, so apply component changes to both.
- Vue types are written by hand. Keep `src/vue/index.d.ts` in sync with the `.vue` components. It is bundled by the first config's `dts.entry` in `tsup.config.ts`, because that config's DTS step deletes every `.d.ts` in `dist`, so don't copy type files into `dist` from another config.
- Vue components use `defineComponent` with `<script lang="ts">`, not `<script setup>`.

## Code style

Prettier and lint-staged only cover `src/**/*.{ts,tsx,vue}`, which use tabs. Root config files use 2 spaces and are not auto-formatted.

## Known gotchas

- The framework APIs differ. Vue `SocialShareButton` takes `customStyle` instead of `style` and has no `className` prop. Vue `SocialShareBox` has neither `style` nor `className` as props. In Vue, native `class` and `style` attributes fall through to the root element. Both frameworks pass other HTML attributes to the root element: Vue through attribute fallthrough, React through `...rest`. In React, `href` is set after `...rest` so it can't be overridden. Keep the README's React and Vue prop tables in step with the components.
- Components must render nothing, never throw, for an empty `link` or unknown network. `getShareUrl` throws for both, so check first. Use `isNetworkKey` from `src/core/networks.ts` rather than `networks[key]`, which accepts `Object.prototype` keys like `constructor`.
- Every `ShareOptions` field is a component prop, and `text` is the fallback for `body` and `title`. Leave `subject` undefined by default so the core's `"Check this out"` applies.
- The README's CDN section loads the upstream `assisfery/SocialShareJS`, not this package.
- `SocialShareButtonProps` and `SocialShareBoxProps` only cover props shared by React and Vue. Framework-specific props and `buttonStyle` are declared in each framework's component or, for Vue, in `src/vue/index.d.ts`.
