---
title: Agents Field Guide
tableOfContents: false
description: Prompts, methods, and worked examples for building with agents.
---

## Prompts

- [Browse prompts](/prompts)

## Skills

- [Skills I publish](/skills-i-publish) · My skills.sh catalogue and where to start.
- [External skills](/external-skills) · Skills from other authors in my setup.

## Methods

- **Use the breadboard as the source of truth** · Make the shaping doc follow the same hierarchy as the breadboard so readers can match the prose to the flow. [@rjs](https://x.com/rjs/status/2112657531910705296)
- **Work in independently valuable steps** · Choose one deliverable that stands on its own. Review what it taught you before choosing the next. [James Cowling](https://x.com/jamesacowling/status/2077104612398743701)
- **Give the agent a way to verify its work** · Give it a check it can run, such as an end-to-end test of the user flow or a property test of an invariant. [Addy Osmani](https://x.com/addyosmani/status/2111604705340326393)

## Tools I use

- [Scrawl](https://scrawl.kitlangton.com/) · Show an agent what’s happening on screen with narration and markup.
- [Hex](https://github.com/anomalyco/hex) · Dictate text into the app I’m using.

## Experiments

- [T3 Code with Opus and DeepSeek](/t3-code-experiment) · Try Opus as the orchestrator and DeepSeek as the workers.

- **AgentsView learning (prob nah)** · Handy for finding old chats and spotting repeated tool calls. In my trial, it missed a large batch of failures that showed up in the raw Codex logs, so I’m sticking with the current learning reader. [AgentsView v0.46.1](https://github.com/kenn-io/agentsview/releases/tag/v0.46.1)

## Examples

- **Four design options side by side** · Compare the same product stories across four approaches, down to each option’s interface actions and backend behaviour. [Ryan Singer’s demo](https://x.com/rjs/status/2109351403005030603)
- **ToDesktop’s visual system docs** · See how one JSON description drives visual documentation of sequences, phases, data objects, and failure paths. [Dave Jeffery’s demo](https://x.com/davej/status/2096970427583074511?s=12)
- **An eval with held-out support tickets** · See how a team used 30 tickets to iterate and reserved 14 to check whether the improvement held. [Lance Martin’s worked examples](https://claude.dev/blog/automating-eval-design-and-hillclimbing/)

## References

- **Towards Self-Driving Codebases** · What agents need from their development environment to exercise the software they change. [Dan Robinson](https://blog.detail.dev/posts/towards-self-driving-codebases/)
- **The Topology of an LLM Agent Loop With Tool Use** · Where the model, loop, and tools run, and what that means for cost, capability, and security. [Philip Zeyliger](https://blog.exe.dev/topology)
- **The Case Against Formal Verification, 50 Years Later** · A revisit of the 1979 arguments about what software proofs can establish and where specifications can go wrong. [Ivan Gavran](https://ivan-gavran.github.io/0-social-processes-paper)
