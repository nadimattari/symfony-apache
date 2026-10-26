# Task List

## Phase 0: Preparation
- [x] Task 1: Snapshot current state
  - Acceptance: git tag `pre-migration` created; branch `migration/frankenphp-symfony7` created
  - Verify: `git tag` / `git branch`
  - Files: none
  - Scope: XS
- [x] Task 2: Update composer.json
  - Acceptance: php >=8.2, symfony/* 7.4.*, extra.symfony.require 7.4.*
  - Verify: `composer validate`
  - Files: composer.json
  - Scope: S

## Phase 1: Docker / FrankenPHP
- [x] Task 3: docker/php/Dockerfile
  - Acceptance: FrankenPHP base, extensions installed, composer available, no node
  - Verify: `docker build -f docker/php/Dockerfile .`
  - Files: docker/php/Dockerfile
  - Scope: M
- [x] Task 4: docker/node/Dockerfile
  - Acceptance: Node 20, npm, working dir, build deps
  - Verify: `docker build -f docker/node/Dockerfile .`
  - Files: docker/node/Dockerfile
  - Scope: S
- [x] Task 5: docker/caddy/Caddyfile
  - Acceptance: FrankenPHP serves public/, Mercure hub enabled, worker mode config for prod
  - Verify: container starts
  - Files: docker/caddy/Caddyfile
  - Scope: S
- [x] Task 5b: Mailpit dev-only profile
  - Acceptance: sf-mailer under `profiles: [dev]`
  - Verify: `docker compose up -d` (no mailpit in prod)
  - Files: compose.yaml
  - Scope: XS
- [x] Task 6: compose.yaml (base)
  - Acceptance: services sf-php, sf-node, sf-db, sf-mailer
  - Verify: `docker compose config`
  - Files: compose.yaml
  - Scope: M
- [x] Task 7: compose.override.yaml (dev)
  - Acceptance: dev volumes, watch command for node
  - Verify: `docker compose up -d`
  - Files: compose.override.yaml
  - Scope: S
- [x] Task 8: compose.prod.yaml
  - Acceptance: prod env, no dev volumes, optimized
  - Verify: `docker compose -f compose.yaml -f compose.prod.yaml config`
  - Files: compose.prod.yaml
  - Scope: S
- [x] Task 9: .env / .env.test
  - Acceptance: DB/mailer vars correct; test env defined
  - Verify: console runs
  - Files: .env, .env.test
  - Scope: S

## Checkpoint: Docker
- [x] `docker compose up -d` works
- [x] sf-php serves Symfony

## Phase 2: Symfony Upgrade
- [x] Task 10: composer update
  - Acceptance: dependencies install, cache clear
  - Verify: `composer install` in container
  - Files: composer.lock
  - Scope: M
- [x] Task 11: config updates for 7.4
  - Acceptance: no deprecation errors on boot
  - Verify: `php bin/console about`
  - Files: config/*
  - Scope: M
- [x] Task 12: templates
  - Acceptance: pages render
  - Verify: curl /
  - Files: templates/*
  - Scope: S
- [x] Task 13: smoke tests
  - Acceptance: PHPUnit installed, AppController test passes
  - Verify: `php bin/phpunit`
  - Files: tests/, phpunit.xml.dist, composer
  - Scope: M

## Checkpoint: Symfony
- [x] Symfony 7.4 boots
- [x] Tests pass

## Phase 3: Tooling & Bug Fixes
- [x] Task 14: Makefile
  - Acceptance: service name sf-php; node commands added
  - Verify: `make help`
  - Files: Makefile
  - Scope: S
- [x] Task 15: ESLint config
  - Acceptance: `npx eslint assets` runs
  - Files: eslint.config.mjs
  - Scope: S
- [x] Task 16: ChartDataLabels
  - Acceptance: registered via Chart.register; build passes
  - Files: assets/app.js, assets/views/uikit/Chart.vue
  - Scope: S
- [x] Task 17: tsconfig.json
  - Acceptance: `npx tsc --noEmit` passes (or documented)
  - Files: tsconfig.json, package.json
  - Scope: S
- [x] Task 18: docker php.ini password
  - Acceptance: password matches .env
  - Files: docker/server/php/php.ini (remove/replace) or new ini
  - Scope: XS
- [x] Task 19: README update
  - Acceptance: docs reflect FrankenPHP
  - Files: README.md
  - Scope: S
- [x] Task 20: Bundler spike (Symfony Reprise/Vite)
  - Decision: keep Webpack Encore (Reprise requires PHP 8.4 + Symfony 8.x; out of scope)
  - Doc: docs/adr/0001-bundler.md
  - Scope: L
- [x] Task 21: Environment-specific port exposure
  - Acceptance: dev publishes 8180/8443/3381/8125; prod publishes 80/443 only; DB/Mailpit not published in prod
  - Verify: `docker compose config` + curl against both stacks
  - Files: compose.yaml, compose.override.yaml, compose.prod.yaml, docker/caddy/*
  - Scope: S

## Checkpoint: Complete
- [x] All SPEC success criteria met