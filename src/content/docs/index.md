---
title: Agents Field Guide
description: Prompts, methods, and worked examples for building with agents.
tableOfContents: false
---

[Understand an existing product](/understand-an-existing-product/) · [Map a flow](/breadboard-to-proof/) · [Prove the result](/prove-the-user-outcome/) · [Recover drifting work](/recover-drifting-work/)

[Changelog](/changelog/). See what’s been added to the guide.

<!-- Generated catalogue -->

## [Skills](/skills/)

- [My skills](https://www.skills.sh/callumflack/skills). The skills I write and publish.
- [Lauren Tan’s Pstack](https://github.com/cursor/plugins/tree/main/pstack). Plan, build, and prove a change.
- [Matt Pocock](https://github.com/mattpocock/skills). Agree on the work, then build in small slices.
- [Theo Browne’s tstack](https://github.com/t3dotgg/tstack). Review and deliver an existing change.
- [Test audit](/skills/test-audit/). Peter Steinberger’s skill for checking what each test protects, where to prove it, and whether stronger coverage already exists.
- [Cognitive load](https://www.skills.sh/callumflack/skills/cognitive-load). Adapted from Artem Zakirullin’s prompt for reviewing code that overloads working memory through complex conditionals, shallow abstractions, and needless indirection.

<p class="catalogue-toggle"><a href="/skills/" class="prose-link text-muted-foreground">View all <span aria-hidden="true">&rarr;</span></a></p>

## [Prompts](/prompts/)

- [Ask for proof of work instead of a summary](/ask-for-proof-of-work/). Ask a worker for evidence you can inspect.
- [Find implicit state machines with Pstack](/find-implicit-state-machines/). Model each subsystem and chart its key flows.
- [Review untested branches](/prompts/review-untested-branches/). Decide which checks need tests and which states the types can rule out.
- [Separate decisions from effects](/prompts/separate-decisions-from-effects/). Review logic that is difficult to test without external dependencies.
- [Could a human working for free do it?](/prompts/outsource-to-a-human/) Test what it would take to hand off the work.
- [Restate the goal](/prompts/restate-the-goal/). Check that the agent understood your goal before it starts.

<p class="catalogue-toggle"><a href="/prompts/" class="prose-link text-muted-foreground">View all <span aria-hidden="true">&rarr;</span></a></p>

## [Playbooks](/methods/)

- [Leave room for plausible corrections](/leave-room-for-plausible-corrections/). Keep a cheap route to a plausible design correction.
- [Twelve rules for agentic coding](/twelve-rules-for-agentic-coding/). Build trust into the codebase before scaling the loop.
- [Describe how an existing product behaves](/understand-an-existing-product/). Trace what people experience when a flow is interrupted.
- [Take a breadboard from sketch to proof](/breadboard-to-proof/). Prove an upload survives reopening.
- [Prove the thing the user can actually do](/prove-the-user-outcome/). Find where to act and what would prove it worked.
- [Get an agent unstuck when it keeps missing the point](/recover-drifting-work/). Find the first miss and choose a repair.

<p class="catalogue-toggle"><a href="/methods/" class="prose-link text-muted-foreground">View all <span aria-hidden="true">&rarr;</span></a></p>

## [Field reports](/field-reports/)

- [T3 Code with Opus and DeepSeek](/t3-code-experiment/). *In progress.* Opus directs DeepSeek workers.
- [Why I turned off automatic agent memory](/why-i-turned-off-automatic-agent-memory/). *Stopped.* Four tasks with and without access to past lessons.
- [AgentsView learning](/agentsview-learning/). *Prob nah.* Search worked. Raw logs caught failures.

## [References](/references/)

- [Four Dark Corners of Requirements Engineering](/four-dark-corners-of-requirements-engineering/). From specification to outcome.
- [Towards Self-Driving Codebases](/towards-self-driving-codebases/). Give agents a way to run and test their changes.
- [The Topology of an LLM Agent Loop With Tool Use](/topology-of-an-llm-agent-loop/). Cost and access across agent setups.
- [The Case Against Formal Verification, 50 Years Later](/case-against-formal-verification/). What proofs leave open about the spec.

## [Tools I use](/tools/)

- [Scrawl](https://scrawl.kitlangton.com/). Show an agent what’s happening on screen with narration and markup.
- [Hex](https://github.com/anomalyco/hex). Dictate text into the app I’m using. [Handy](https://handy.computer/) is another free, open-source option.
- [2password](https://github.com/kitlangton/2password). Let a command use a 1Password secret without putting its value in the conversation.
