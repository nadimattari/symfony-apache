# Symfony-FrankenPHP

This repository is a starting point for projects using the Symfony framework with FrankenPHP.

## What it contains

- Symfony 7.4.x (LTS)
- Doctrine ORM
- API Platform
- Symfony's Mailer
- Debug & Profiler Bundle
- Maker Bundle
- WebPack Encore
    - Sass/SCSS loader
    - Typescript
    - Vue loader
- VueJS
    - PrimeVue
    - PrimeFlex
    - PrimeIcons
    - FontAwesome
    - MaterialIcons
    - Chart.js
    - ChartDataLabels
- SakaiVue templates
- ESLint, Prettier, SASS, etc
- Docker
    - MariaDB 11.3.2
    - FrankenPHP (Caddy) + Mercure
    - Node 20 (separate container)
    - Mailer - Mailpit (dev only)

## Commands

- Start/build docker containers (dev)
    - `$ docker compose up -d`
- Stop docker containers
    - `$ docker compose down`
- Production
    - `$ docker compose -f compose.yaml -f compose.prod.yaml up -d --build`
- Compile JS/CSS
    - `$ docker compose exec sf-node npm run [dev|watch|build]`
- Run tests
    - `$ docker compose exec -e APP_ENV=test sf-php vendor/bin/simple-phpunit`
- Typecheck
    - `$ docker compose exec sf-node npm run typecheck`

## Services

### Development

| Service     | Host URL / port          | Container port |
|-------------|--------------------------|----------------|
| `sf-php`    | http://localhost:8180    | 80             |
| `sf-php`    | https://localhost:8443   | 443            |
| `sf-db`     | localhost:3381           | 3306           |
| `sf-mailer` | http://localhost:8125    | 8025           |
| `sf-node`   | -                        | -              |

Dev HTTPS uses Caddy's internal CA, so the certificate is not publicly trusted (use `curl -k` or accept the browser warning).

### Production

| Service  | Host URL / port         | Container port |
|----------|-------------------------|----------------|
| `sf-php` | http://localhost (80)   | 80             |
| `sf-php` | https://localhost (443) | 443            |

Production exposes **only** ports 80 and 443. The database and Mailpit are not published; Mailpit is not started at all in production. `sf-node` is only run through the `build` profile to compile assets.

## Notes

- Webpack Encore is in maintenance mode; evaluate Symfony Reprise (Vite) for modern bundling (see `docs/adr/0001-bundler.md`).
- FrankenPHP worker mode is enabled in production via `docker/caddy/Caddyfile.prod`.
- Production HTTPS currently uses Caddy's internal CA (`tls internal`). Replace it with a publicly-trusted certificate (or a real domain) before deploying.
