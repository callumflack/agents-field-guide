---
title: External skills
description: Agent coding methods, UI skills, and tools from other authors.
lastUpdated: 2026-11-11
---

## Complete agent coding methods

These three collections cover different stretches of the work: deciding what to build, proving it works, and getting it through review.

- [Lauren Tan’s Pstack — design and proof](https://github.com/cursor/plugins/tree/main/pstack). Pstack gives an agent a way to design, implement, and show evidence for a change. Use `architect` to sketch the types and module boundaries, and `blast-radius` to trace what the change could break. For a flow with retries, races, or other hard-to-reach states, use `create-formal-verification-skill` to model the critical property and `statechart` to make the flow visible. Use `create-verification-skill` to leave behind a repeatable way to exercise the real app. A model check and a run against the app answer different questions.
- [Matt Pocock — shared language and small slices](https://github.com/mattpocock/skills). Matt Pocock’s skills start with agreement about the work. `grill-with-docs` pressures the plan and records domain terms and decisions as they settle. `to-spec` and `to-tickets` turn that agreement into a spec and small pieces of work. `tdd` builds one slice at a time, `diagnosing-bugs` starts by getting a reliable failure, and `code-review` checks the diff against both the spec and the repo’s standards. Reach for `codebase-design` when the trouble is a module boundary.
- [Theo Browne’s tstack — review and delivery](https://github.com/t3dotgg/tstack). tstack picks up when there is already a change or an inherited PR. `sol-loop` alternates review and fixes; `file-pr` frames the change for a reviewer; `babysit-pr` follows CI and review findings. `modernize` reassesses an old PR, while `takeover` resumes someone else’s work. The bundled flows differ at the merge step. `full-stop` leaves the merge to you, and `full-send` includes it.

## Focused agent workflows

- [Test audit](/external-skills/test-audit/). Check what each test protects, where to prove it, and whether another test already covers it.
- [Eric Provencher’s Orchestrate](https://github.com/provencher/codex-skills/tree/main/orchestrate). Split substantial Codex work into bounded scout and worker tasks while one coordinator owns decisions and integrates the results.
- [Karpathy Guidelines](https://github.com/multica-ai/andrej-karpathy-skills). A short coding discipline derived from Andrej Karpathy’s observations: surface assumptions, keep the change small, and state what will prove it works.
- [HumanLayer](https://github.com/humanlayer/skills). Design an agent loop around the human review points, then package the repeatable part as a skill and monitor. I use [`show-me`](https://github.com/humanlayer/skills/tree/main/plugins/show-me) all the time for a quick diagram or code sketch when prose is hard to scan.
- [Cursor Team Kit](https://github.com/cursor/plugins/tree/main/cursor-team-kit). Run a smoke test, turn a claim into a check with `verify-this`, inspect a PR, or work through CI failures. The [Cursor plugin catalogue](https://github.com/cursor/plugins) also has separate plugins for iterative work, authoring plugins, and teaching.
- [Warp’s common skills](https://github.com/warpdotdev/common-skills). Connect product and technical specs to implementation and review. Its collection also covers merge risk, PR walkthroughs, and shareable readouts; some skills assume Warp’s own workflow.
- [OpenClaw’s agent skills](https://github.com/openclaw/agent-skills). Review a diff, run checks in a remote test environment, or turn an agent session into a shareable record.
- [ast-grep skills](https://github.com/ast-grep/agent-skill). Find code by syntax rather than spelling. Use `ast-grep-outline` when you first need a structural map of a file.
- [ayghri’s I Have ADHD](https://github.com/ayghri/i-have-adhd). Keep the next action visible and carry the state of the work across turns.

## UI and design engineering

- [Emil Kowalski](https://github.com/emilkowalski/skills). Design motion and gestures. Start with `animate` or `review-animations`; use `choreograph` when elements move together, `gestures` when motion follows the finger, and `remove-animations` when motion gets in the way.
- [Jakub Krehel](https://github.com/jakubkrehel/skills). Improve the whole interface. Start with `better-interface` for a ranked review, or pick the part you need: layout, type, color, copy, accessibility, or polish. `build-design` translates a design into existing components; `state-machine` lays out the visible states of a component so you can work on each one.
- [Benji Taylor’s Stageshow](https://github.com/benjitaylor/skills). Build a still or animated product mockup for a launch page, feature card, or walkthrough.
- [Vojtěch Holík’s Good CSS](https://github.com/vojtaholik/good-css). Find a native CSS solution before adding breakpoints, wrappers, or JavaScript.
- **Florian Kiem.** Use [Prefer Container Queries](https://raw.githubusercontent.com/flornkm/skills/main/skills/prefer-container-queries/SKILL.md) for components that adapt to their own space, and [WebGL Components](https://raw.githubusercontent.com/flornkm/skills/main/skills/webgl-components/SKILL.md) for small shader visuals embedded in a real interface.
- [shadcn/ui](https://github.com/shadcn-ui/ui). Find and compose components from registries, or migrate a shadcn project from Radix to Base UI.
- [Vercel’s agent skills](https://github.com/vercel-labs/agent-skills). Implement view transitions or check a site against Web Interface Guidelines.

## Runtime and framework skills

- [React Doctor](https://github.com/millionco/react-doctor). Diagnose React problems, with separate skills for broader React cleanup, runtime performance, and Three.js.
- [Kit Langton’s Effect skill](https://github.com/kitlangton/skills). Design or review Effect v4 services, layers, schemas, streams, and tests.
- [Vercel’s React skills](https://github.com/vercel-labs/agent-skills). Review React and Next.js rendering performance, refactor component composition, or check React Native and Expo performance.
- [Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance). Find native HTML, CSS, and browser APIs that fit your browser support targets. Install with `npx modern-web-guidance@latest install`.

## Hosting, deployment, and security

- [Cloudflare’s skills](https://github.com/cloudflare/skills). Choose a product, build and test a Worker, or work with Durable Objects, Agents, and Sandboxes. Use `cloudflare-one` for Zero Trust configuration and `turnstile-spin` for bot verification.
- [Vercel’s deployment skills](https://github.com/vercel-labs/agent-skills). Deploy an app or use project metrics to investigate performance and cost.
- [Cursor’s Thermos](https://github.com/cursor/plugins/tree/main/thermos). Use `thermo-nuclear-review` for a branch review focused on security and correctness.

## Smart utilities and their companion skills

Use these when the agent needs to operate a browser, handle a capture, or collect evidence from a running app.

- **Kit Langton’s utilities.** [Scrawl](https://github.com/kitlangton/scrawl) captures a narrated, marked-up screen recording for an agent to inspect. [2password](https://github.com/kitlangton/2password) lets a command use a 1Password secret without putting the value in the conversation. [Motel](https://github.com/kitlangton/motel) collects local traces and logs; the companion `motel-debug` skill tells the agent how to use them to investigate a running app.
- [Vercel’s agent-browser](https://github.com/vercel-labs/agent-browser). A browser automation CLI for driving a flow and inspecting what actually rendered. Its companion skill teaches the agent the commands.
- [Plannotator](https://github.com/backnotprop/plannotator). A workspace for annotating plans and diffs. Its companion skills cover visual explainers, plan history, and setting up a goal.
- [Guillermo Rauch’s UI recording timeline](https://github.com/rauchg/skills). Turn a screen recording into a scrubbable timeline of what appeared when, useful for studying a slow load or redirect.
