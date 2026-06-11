# Skill Registry

Generated: 2026-06-11  
Project: blurchemy  
Purpose: Index available non-SDD skills for SDD executors. This registry points to the source skill files; agents must read the full `SKILL.md` before applying a skill.

## Project Conventions

| File                                       | Scope   | Notes                                                                                                                           |
| ------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `C:\Users\Usuario\Dev\blurchemy\AGENTS.md` | project | Blurchemy browser-only contract, Angular standards, SDD-first workflow, testing/tooling foundation, and artifact language rule. |

## Indexed Skills

SDD lifecycle skills, `_shared`, and `skill-registry` are intentionally excluded. Duplicate skills are deduplicated by name; the first available user-level source listed by the runtime is used when no project-level skill exists.

| Skill                 | Trigger summary                                                                                                                               | Source path                                                              | Scope    |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------- |
| accessibility         | Audit and improve web accessibility, WCAG compliance, screen reader support, and keyboard navigation.                                         | `C:\Users\Usuario\.agents\skills\accessibility\SKILL.md`                 | user     |
| adapt                 | Adapt layouts across screen sizes, devices, breakpoints, and touch contexts.                                                                  | `C:\Users\Usuario\.agents\skills\adapt\SKILL.md`                         | user     |
| animate               | Add purposeful animations, micro-interactions, transitions, and motion effects.                                                               | `C:\Users\Usuario\.agents\skills\animate\SKILL.md`                       | user     |
| animate-text          | Use curated named text animation specs for headings, labels, counters, and swaps.                                                             | `C:\Users\Usuario\.agents\skills\animate-text\SKILL.md`                  | user     |
| arrange               | Improve layout, spacing, visual rhythm, hierarchy, and alignment.                                                                             | `C:\Users\Usuario\.agents\skills\arrange\SKILL.md`                       | user     |
| audit                 | Run technical quality checks across accessibility, performance, theming, responsive design, and anti-patterns.                                | `C:\Users\Usuario\.agents\skills\audit\SKILL.md`                         | user     |
| best-practices        | Apply modern web development best practices for security, compatibility, and code quality.                                                    | `C:\Users\Usuario\.agents\skills\best-practices\SKILL.md`                | user     |
| bolder                | Make safe or bland designs more visually impactful while preserving usability.                                                                | `C:\Users\Usuario\.agents\skills\bolder\SKILL.md`                        | user     |
| branch-pr             | Create Gentle AI pull requests with issue-first checks.                                                                                       | `C:\Users\Usuario\.config\opencode\skills\branch-pr\SKILL.md`            | user     |
| chained-pr            | Split oversized changes into chained PRs that protect review focus.                                                                           | `C:\Users\Usuario\.config\opencode\skills\chained-pr\SKILL.md`           | user     |
| clarify               | Improve unclear UX copy, error messages, labels, and instructions.                                                                            | `C:\Users\Usuario\.agents\skills\clarify\SKILL.md`                       | user     |
| cognitive-doc-design  | Design READMEs, RFCs, onboarding, architecture, and review docs with lower cognitive load.                                                    | `C:\Users\Usuario\.config\opencode\skills\cognitive-doc-design\SKILL.md` | user     |
| colorize              | Add strategic color to monochromatic, dull, or low-warmth interfaces.                                                                         | `C:\Users\Usuario\.agents\skills\colorize\SKILL.md`                      | user     |
| comment-writer        | Write warm, direct PR feedback, issue replies, reviews, Slack messages, and GitHub comments.                                                  | `C:\Users\Usuario\.config\opencode\skills\comment-writer\SKILL.md`       | user     |
| context7-mcp          | Retrieve library/framework/API documentation and code examples.                                                                               | `C:\Users\Usuario\.agents\skills\context7-mcp\SKILL.md`                  | user     |
| core-web-vitals       | Optimize LCP, INP, CLS, and page experience.                                                                                                  | `C:\Users\Usuario\.agents\skills\core-web-vitals\SKILL.md`               | user     |
| critique              | Evaluate UX/design quality, hierarchy, IA, cognitive load, and anti-patterns.                                                                 | `C:\Users\Usuario\.agents\skills\critique\SKILL.md`                      | user     |
| customize-opencode    | Edit or create opencode configuration, agents, skills, plugins, MCP servers, and permission rules.                                            | `C:\Users\Usuario\Dev\blurchemy\<built-in>`                              | built-in |
| delight               | Add polish, personality, joy, and memorable micro-interactions.                                                                               | `C:\Users\Usuario\.agents\skills\delight\SKILL.md`                       | user     |
| distill               | Simplify, declutter, and reduce UI noise while preserving core value.                                                                         | `C:\Users\Usuario\.agents\skills\distill\SKILL.md`                       | user     |
| extract               | Extract reusable components, design tokens, and design-system patterns.                                                                       | `C:\Users\Usuario\.agents\skills\extract\SKILL.md`                       | user     |
| frontend-design       | Create distinctive production-grade frontend interfaces and design code.                                                                      | `C:\Users\Usuario\.agents\skills\frontend-design\SKILL.md`               | user     |
| go-testing            | Apply focused Go testing patterns, including coverage, Bubbletea teatest, and golden files.                                                   | `C:\Users\Usuario\.config\opencode\skills\go-testing\SKILL.md`           | user     |
| harden                | Improve resilience through error states, i18n, overflow handling, and edge cases.                                                             | `C:\Users\Usuario\.agents\skills\harden\SKILL.md`                        | user     |
| impeccable            | Improve frontend UI/UX across accessibility, performance, responsive behavior, theming, typography, layout, motion, copy, and design systems. | `C:\Users\Usuario\.agents\skills\impeccable\SKILL.md`                    | user     |
| issue-creation        | Create Gentle AI issues, bug reports, or feature requests with issue-first checks.                                                            | `C:\Users\Usuario\.config\opencode\skills\issue-creation\SKILL.md`       | user     |
| judgment-day          | Run blind dual review, fix confirmed issues, then re-judge.                                                                                   | `C:\Users\Usuario\.config\opencode\skills\judgment-day\SKILL.md`         | user     |
| layout                | Improve layout, spacing, visual rhythm, hierarchy, and alignment.                                                                             | `C:\Users\Usuario\.agents\skills\layout\SKILL.md`                        | user     |
| normalize             | Realign UI to design system standards, spacing, tokens, and patterns.                                                                         | `C:\Users\Usuario\.agents\skills\normalize\SKILL.md`                     | user     |
| onboard               | Improve onboarding flows, empty states, activation, and first-run experiences.                                                                | `C:\Users\Usuario\.agents\skills\onboard\SKILL.md`                       | user     |
| optimize              | Improve UI performance, bundle size, rendering, animations, and loading speed.                                                                | `C:\Users\Usuario\.agents\skills\optimize\SKILL.md`                      | user     |
| overdrive             | Build extraordinary visual effects with shaders, spring physics, scroll-driven reveals, or ambitious 60fps motion.                            | `C:\Users\Usuario\.agents\skills\overdrive\SKILL.md`                     | user     |
| performance           | Optimize web performance, loading, and page speed.                                                                                            | `C:\Users\Usuario\.agents\skills\performance\SKILL.md`                   | user     |
| polish                | Perform final alignment, spacing, consistency, and micro-detail quality pass.                                                                 | `C:\Users\Usuario\.agents\skills\polish\SKILL.md`                        | user     |
| quieter               | Tone down visually aggressive, loud, garish, or overwhelming designs.                                                                         | `C:\Users\Usuario\.agents\skills\quieter\SKILL.md`                       | user     |
| seo                   | Improve search visibility, meta tags, structured data, sitemap, and SEO.                                                                      | `C:\Users\Usuario\.agents\skills\seo\SKILL.md`                           | user     |
| shape                 | Plan UX/UI direction before code through structured discovery and a design brief.                                                             | `C:\Users\Usuario\.agents\skills\shape\SKILL.md`                         | user     |
| skill-creator         | Create LLM-first skills with valid frontmatter and runtime contracts.                                                                         | `C:\Users\Usuario\.config\opencode\skills\skill-creator\SKILL.md`        | user     |
| skill-improver        | Audit and upgrade existing LLM-first skills.                                                                                                  | `C:\Users\Usuario\.config\opencode\skills\skill-improver\SKILL.md`       | user     |
| teach-impeccable      | One-time setup to collect persistent project design guidelines.                                                                               | `C:\Users\Usuario\.agents\skills\teach-impeccable\SKILL.md`              | user     |
| typeset               | Improve typography, font choice, hierarchy, sizing, weight, and readability.                                                                  | `C:\Users\Usuario\.agents\skills\typeset\SKILL.md`                       | user     |
| web-design-guidelines | Review UI code for Web Interface Guidelines compliance.                                                                                       | `C:\Users\Usuario\.claude\skills\web-design-guidelines\SKILL.md`         | user     |
| web-quality-audit     | Audit performance, accessibility, SEO, and best practices.                                                                                    | `C:\Users\Usuario\.agents\skills\web-quality-audit\SKILL.md`             | user     |
| work-unit-commits     | Plan commits as reviewable work units, keeping tests and docs with code.                                                                      | `C:\Users\Usuario\.config\opencode\skills\work-unit-commits\SKILL.md`    | user     |

## Notes for Executors

- Read the exact skill source before applying any indexed skill.
- Generated technical artifacts for Blurchemy must be professional English.
- For feature work, follow the SDD sequence: proposal, spec, design, tasks, implementation, verification, archive.
