# Implementation Plan: FrankenPHP + Symfony 7.4 Migration & Hardening

## Overview

Migrate the starter from Apache/PHP 8.1 + Symfony 6.4 to FrankenPHP + Symfony 7.4 LTS, add a separate Node container, make compose dev/test/prod-ready, and fix config bugs.

## Architecture Decisions

- Use `dunglas/frankenphp` image with a small Dockerfile for extensions/composer.
- Node tooling in separate `node:20` container; PHP image no Node.
- Compose base + override (dev) + prod file; Mailpit dev-profile only.
- Mercure hub enabled in Caddyfile (optional usage).
- Symfony 7.4.* pinned via `extra.symfony.require`.
- FrankenPHP worker mode in prod (standard mode in dev).
- Frontend bundler: spike Symfony Reprise (Vite); keep Encore as fallback if blockers.

## Task List

### Phase 0: Preparation
- [ ] Task 1: Snapshot current state (git tag) and create branch
- [ ] Task 2: Update composer.json to Symfony 7.4 and PHP 8.2

### Phase 1: Docker / FrankenPHP
- [ ] Task 3: Create docker/php/Dockerfile (FrankenPHP + extensions + composer)
- [ ] Task 4: Create docker/node/Dockerfile (Node 20 + npm)
- [ ] Task 5: Create docker/caddy/Caddyfile (FrankenPHP + Mercure)
- [ ] Task 6: Rewrite compose.yaml (base services: sf-php, sf-node, sf-db, sf-mailer)
- [ ] Task 7: Create compose.override.yaml (dev volumes/commands)
- [ ] Task 8: Create compose.prod.yaml (prod env, no volumes, optimized)
- [ ] Task 9: Update .env / .env.test for new setup

### Phase 2: Symfony Upgrade
- [ ] Task 10: Run composer update and fix deprecations/errors
- [ ] Task 11: Update config for Symfony 7 (framework, security, doctrine, api_platform, etc.)
- [ ] Task 12: Update templates/twig for any API changes
- [ ] Task 13: Add smoke tests (PHPUnit) and test env

### Phase 3: Tooling & Bug Fixes
- [ ] Task 14: Fix Makefile (service name sf-php, add node commands)
- [ ] Task 15: Fix ESLint config
- [ ] Task 16: Fix ChartDataLabels registration
- [ ] Task 17: Add tsconfig.json and typecheck script
- [ ] Task 18: Fix docker PHP ini password mismatch
- [ ] Task 19: Update README (FrankenPHP, ports, commands)

### Checkpoint: Complete
- [ ] All acceptance criteria in SPEC.md met
- [ ] `docker compose up` works
- [ ] Symfony 7.4 boots
- [ ] Frontend builds
- [ ] Tests pass

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| FrankenPHP Symfony compatibility | High | Use standard mode first; worker mode optional |
| Symfony 7 breaking changes | Medium | Upgrade incrementally, run tests |
| Docker network/ports | Low | Keep 8180 |
| Large frontend bundle | Low | Defer optimization |

## Open Questions
- Mercure usage scope (hub only vs features)
- Encore vs Vite (keep Encore)