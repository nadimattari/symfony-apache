# Agent Skills (OpenCode)

This project uses skills installed under `.opencode/skills/` (or a compatible path).

## Project Context

- Backend: Symfony 6.4 (PHP >=8.1), Doctrine ORM, API Platform, Twig, Webpack Encore bundle.
- Frontend: Vue 3.4 SPA (Sakai/PrimeVue) mounted at `#vue-app`, built with Webpack Encore (Sass/SCSS, TypeScript loader).
- Infra: Docker Compose (MariaDB 11.3.2, PHP 8.1 Apache, Mailpit).
- No test suite yet (PHPUnit not installed); CI/CD not set up (see TODO in README).

## Core Rules

- If a task matches a skill, invoke it with the `skill` tool before acting.
- Skills are located in `.opencode/skills/<skill-name>/SKILL.md`.
- Follow the skill workflow strictly; do not partially apply it.
- Never skip required steps such as spec, plan, or test when a skill demands them.
- Shared checklists live in `.opencode/references/`; specialist personas in `.opencode/agents/`.
- Optional slash commands live in `.opencode/commands/`.

## Intent → Skill Mapping

Map the user's intent to the matching skill automatically:

- Feature / new functionality → `spec-driven-development`, then `planning-and-task-breakdown`, `incremental-implementation`, `test-driven-development`
- Planning / breakdown → `planning-and-task-breakdown`
- Bug / failure / unexpected behavior → `debugging-and-error-recovery`
- Code review → `code-review-and-quality`
- Refactoring / simplification → `code-simplification`
- API or interface design → `api-and-interface-design`
- UI work → `frontend-ui-engineering`
- Security concerns → `security-and-hardening`
- Performance concerns → `performance-optimization`
- Git/commit/release → `git-workflow-and-versioning`
- CI/CD → `ci-cd-and-automation`
- Docs/ADR → `documentation-and-adrs`
- Observability → `observability-and-instrumentation`
- Deprecation/migration → `deprecation-and-migration`
- Idea exploration → `idea-refine` / `interview-me`
- Browser debugging → `browser-testing-with-devtools`
- Constraints/quality bar → `constraint-driven-development`
- Context setup → `context-engineering`
- Source verification → `source-driven-development`
- Doubt/adversarial review → `doubt-driven-development`
- Shipping/launch → `shipping-and-launch`

## Execution Model

For every request:

1. Determine if any skill applies (even a small chance).
2. Load the skill with `skill({ name: "<skill-name>" })`.
3. Follow the skill workflow exactly.
4. Only proceed to implementation once required steps are complete.

## Notes

- The repo-scoped `AGENTS.md` from `addyosmani/agent-skills` was NOT copied; this file is project-specific.
- When installing skills manually, keep `.opencode/references/` alongside so `../../references/` paths resolve.
}