# ADR 0001: Keep Webpack Encore (defer Symfony Reprise)

## Status
Accepted (2026-10-26)

## Context
Evaluated Symfony Reprise (Vite/Rsbuild integration) as a replacement for Webpack Encore.

## Decision
Keep Webpack Encore for now.

## Rationale
- Symfony Reprise (v1.3.0) requires PHP >=8.4 and Symfony 8.x components.
- This migration targets Symfony 7.4 LTS on PHP 8.2.
- Adopting Reprise would force a PHP/Symfony major upgrade, out of scope.
- Encore remains functional (in maintenance mode) and sufficient for this starter.

## Revisit
When upgrading to Symfony 8 / PHP 8.4, re-evaluate Reprise or Vite.