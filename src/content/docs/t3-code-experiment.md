---
title: T3 Code with Opus and DeepSeek
tableOfContents: false
---

**9 November 2026**

I’m trying Claude Opus 5.5 as the orchestrator and DeepSeek as the workers in [T3 Code](https://t3.codes/).

## Dax

Opus hands implementation to DeepSeek subagents and reviews the diff once. Three lines from Dax’s write-up:

> - we have long running sessions per project
> - be strict about scope when creating a task
> - ask for proof of work instead of a summary

[Copy the proof-of-work prompt](/ask-for-proof-of-work/). [Dax’s original post](https://x.com/thdxr/status/2118755687274532893).

## Drew Breunig

Drew uses cheaper models for most factory work and also runs Meta Spark in a modified Hermes agent. On the factory work and the pricing:

> - the bulk of my tokens come from less complicated work in a SW factory (ds4-flash, glm 5.3)
> - bills by concurrent lanes, not tokens

[Drew Breunig’s original post](https://x.com/dbreunig/status/2119217494267421109).
