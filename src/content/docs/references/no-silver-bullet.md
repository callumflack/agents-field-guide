---
title: No Silver Bullet — Essence and Accidents of Software Engineering
description: Paper on essential and accidental software difficulties.
sidebar:
  label: No Silver Bullet
---

[Read the original technical report (PDF)](https://www.cs.unc.edu/techreports/86-020.pdf) by Frederick P. Brooks, Jr., published by the University of North Carolina at Chapel Hill Department of Computer Science, September 1986 (TR86-020).

> The hardest single part of building a software system is deciding precisely what to build.

— Frederick P. Brooks, Jr., “Requirements Refinement and Rapid Prototyping,” [page 14](https://www.cs.unc.edu/techreports/86-020.pdf#page=17).

Brooks calls the work of specifying, designing and testing a system’s conceptual structure *essential*. Difficulties imposed by the way we represent that structure are *accidental*. Even eliminating an accidental task can save only the share of time it took.

## Building with agents

Use agents to make hard design decisions cheaper to investigate.

- **Prototype the decision.** If a user closes the app during an upload, should it resume, restart or ask them what to do? Have an agent prototype the options. Try them, choose the behaviour and have the agent verify it after reopening.
- **Check what already fits.** Have an agent test an existing component or service against the requirement before generating more code.
- **Grow one working path at a time.** Have the agent demonstrate the whole path before adding another behaviour.
- **Give one person responsibility for how the pieces fit.** Use agent reviews to catch changes that assume different rules for the same product.

Measure from open question to verified behaviour. If an agent speeds up half the work by a factor of ten, the whole job gets about 1.8× faster, before any extra review or rework.
