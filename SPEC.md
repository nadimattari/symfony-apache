# Spec: FrankenPHP + Symfony 7.4 Migration & Hardening

## Objective

Modernize this Symfony + Vue starter template:
1. Replace Apache/PHP container with **FrankenPHP** (Caddy-based) + **Mercure**, with a **separate Node container** for frontend tooling.
2. Make containers **dev / test / prod ready** (profiles, env-specific config, optimized builds). Mailpit is **dev-only**.
3. Upgrade **Symfony 6.4 → 7.4 LTS**.
4. Fix configuration bugs/inconsistencies across Symfony, JS, TS, Docker, and tooling.
5. Evaluate **Symfony Reprise** (Vite) for the frontend bundler; migrate if the spike succeeds, otherwise keep Webpack Encore.

Primary user: developers using this repo as a starting point. Success = `docker compose up` works in dev, tests pass, prod image builds, Symfony 7.4 boots, frontend builds.

## Tech Stack

- PHP 8.2+ (FrankenPHP base, dunglas/frankenphp), FrankenPHP **worker mode in prod**
- Symfony 7.4.* (LTS), Doctrine ORM 3.x, API Platform 3.x/4.x, Nelmio CORS, Webpack Encore bundle (or Symfony Reprise if migrated)
- Node 20 LTS (separate container) for Encore/Vite build/watch
- MariaDB 11.3, Mailpit (dev profile only)
- Mercure hub (bundled in FrankenPHP/Caddy) — enabled, optional usage
- Frontend: Vue 3.4, PrimeVue 3.51, TypeScript, ESLint, Prettier

## Commands

Build (dev): `docker compose up -d`
Build (prod): `docker compose -f compose.yaml -f compose.prod.yaml up -d --build`
Frontend dev: `docker compose --profile dev exec sf-node npm run watch` (or dev server)
Frontend build: `docker compose exec sf-node npm run build`
Symfony console: `docker compose exec sf-php php bin/console ...`
Tests: `docker compose exec -e APP_ENV=test sf-php php bin/phpunit`
Lint: `npm run lint` (to be fixed), `php bin/console lint:twig templates`, `php bin/console lint:yaml config`

## Project Structure (target)

```
/
├── compose.yaml                 # base services
├── compose.override.yaml        # dev overrides
├── compose.prod.yaml            # prod overrides
├── docker/
│   ├── php/Dockerfile           # FrankenPHP-based
│   ├── node/Dockerfile          # Node-based
│   └── caddy/Caddyfile          # FrankenPHP/Mercure config (worker mode in prod)
├── .env, .env.test
├── src/, config/, templates/, assets/, public/, tests/
├── tasks/plan.md, tasks/todo.md
└── AGENTS.md
```

## Code Style

- PHP: PSR-12, Symfony conventions, attributes for routing/ORM.
- JS/TS: ESLint flat config (fixed), Prettier, Vue SFC.
- Add tsconfig.json; typecheck via `tsc --noEmit`.

## Testing Strategy

- Add PHPUnit (symfony/test-pack) and at least smoke tests for AppController.
- Frontend: keep lint; add typecheck once tsconfig exists.
- CI: GitHub Actions (later) to build/test.

## Boundaries

- Always: run tests/build before commit; keep .env secrets out of git; use env vars.
- Ask first: major dependency upgrades beyond plan; changing DB engine; migrating bundler.
- Never: commit vendor/node_modules/public/build; edit FrankenPHP base image internals.

## Success Criteria

- [ ] `docker compose up -d` starts sf-php (FrankenPHP), sf-node, sf-db (and sf-mailer in dev profile) without Apache.
- [ ] No node/npm/nvm in PHP image.
- [ ] Dev/test/prod compose profiles work; Mailpit dev-only.
- [ ] Symfony 7.4 boots (`php bin/console about` shows 7.4).
- [ ] Frontend builds in node container.
- [ ] FrankenPHP worker mode enabled in prod.
- [ ] Mercure hub enabled.
- [ ] ESLint config works; ChartDataLabels registered correctly; Makefile fixed.
- [ ] tsconfig present and typecheck passes.
- [ ] Smoke tests pass.
- [ ] Bundler decision documented (Encore vs Reprise).

## Open Questions

- Mercure: hub enabled; feature usage optional.
- Webpack Encore vs Symfony Reprise (Vite): spike first; keep Encore as fallback.
- FrankenPHP worker mode: enabled in prod, standard mode in dev.