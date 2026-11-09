---
title: T3 Code with Opus and DeepSeek
---

[Field Guide](/) · Experiment

I’m trying Claude Opus 5.5 as the orchestrator and DeepSeek as the workers in T3 Code. Dax’s setup keeps one long-running session per project. Opus gives each worker a tightly scoped task, [asks for proof of work instead of a summary](/ask-for-proof-of-work), then reviews the returned diff once. [T3 Code](https://t3.codes/) · [Dax’s experiment](https://x.com/thdxr/status/2118755687274532893)

Drew Breunig’s post is the broader reference. He uses Opus 5.5 while spending most of his tokens on simpler work with other models. [Drew Breunig’s post](https://x.com/dbreunig/status/2119217494267421109)
