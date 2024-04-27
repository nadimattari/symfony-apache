# Symfony-Apache

This repository is a starting point for projects using the Symfony framework.

## What is contains

- Symfony 6.4.x
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
- Docker file
    - MariaDB 11.3.2
    - PHP 8.1
    - Mailer - Mailpit (Test)

## Commands

- Start/build docker containers
    - `$ docker compose up -d`
- Stop docker containers
    - `$ docker compose [stop|down]
- Compile JS/CSS
    - `$ npm run [dev|watch|build]

## Services

- `sf-php`: Web server
    - `http://localhost:8180`
- `sf-db`: MariaDB
    - Port = 3381
- `sf-mailer`: Mailpit (Test Mailer)
    - UI: `http://localhost:8125`

## TODO

- Configure Typescript (tsconfig)
- Makefile
- CI/CD
- Tests / PHPUnit

