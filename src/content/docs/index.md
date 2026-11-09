---
title: Agents Field Guide
description: Prompts, methods, and worked examples for building with agents.
tableOfContents: false
---

## [Skills](/skills/)

- [Skills I publish](/skills-i-publish/). My collection on skills.sh.
- [External skills](/external-skills/). Collections from other authors.

## [Prompts](/prompts/)

- [Ask for proof of work instead of a summary](/ask-for-proof-of-work/). 7 Nov 2026. Dax’s prompt for asking a worker to return evidence you can inspect.
- [Find implicit state machines with Pstack](/find-implicit-state-machines/). 9 Nov 2026. Lauren’s prompt for modelling each subsystem and charting the flows that matter.

- [Could a human working for free do it?](/prompts/outsource-to-a-human/). Test what it would take to hand off the work.
- [Restate the goal](/prompts/restate-the-goal/). Check that the agent understood your goal before it starts.
- [Find a better method](/prompts/find-a-better-method/). Reconsider the method you assumed the work required.
- [What is worth building now?](/prompts/what-is-worth-building-now/). Look for work that became practical as the cost changed.

<details>
<summary>Show more</summary>

- [Deeper without bigger](/prompts/deeper-without-bigger/). Ask what better practice would add to the same task.
- [The best next question](/prompts/best-next-question/). Get the question that would move the work forward.
- [The same with half the code](/prompts/half-the-code/). Ask for a smaller implementation of the same thing.
- [Stay at the frontier](/prompts/stay-at-the-frontier/). Resolve the decisions you can see now.
- [Brittle and durable fixes](/prompts/brittle-and-durable/). Compare a fragile fix with one that will hold up.
- [Audit the bottlenecks](/prompts/audit-the-bottlenecks/). Use the last day of work to identify what slowed you down.
- [Abundant bounded labour](/prompts/abundant-bounded-labour/). Look for work you can split into simple tasks.

- [The trusted clone](/prompts/the-trusted-clone/). Imagine handing off today’s work to see what you would choose next.
- [Ten times the agency](/prompts/ten-times-the-agency/). Surface requests you are holding back.
- [Aversion as a pointer](/prompts/aversion-as-a-pointer/). Identify what you would have to let go of to solve the problem differently.

- [The smallest real thing](/prompts/smallest-real-thing/). Find the smallest thing another person can actually try.
- [Prevent the error type](/prompts/prevent-the-error-type/). Change the system so the same class of mistake is hard to make.
- [Make stronger testing concrete through history](/prompts/make-testing-concrete-through-history/). Use old commits to show where a different test would have mattered.
- [What would have to be true?](/prompts/what-would-have-to-be-true/). Name the conditions a proposal depends on.
- [What would make this wrong?](/prompts/what-would-make-this-wrong/). Name the evidence that would overturn your conclusion.
- [Similar cases, different decisions](/prompts/similar-cases-different-decisions/). Find the distinction behind two different decisions.
- [Make the miss visible](/prompts/make-the-miss-visible/). Ask what evidence would change the decision on its own.

</details>

## [Methods](/methods/)

- [Take a breadboard from sketch to proof](/breadboard-to-proof/). 9 Nov 2026. Map an interrupted upload, give the agent a prompt, and check that one usable result survives reopening.
- **Work in independently valuable steps**. 15 Jul 2026. Choose one deliverable that stands on its own. Review what it taught you before choosing the next. [James Cowling](https://x.com/jamesacowling/status/2077104612398743701)
- **Give the agent a way to verify its work**. 18 Oct 2026. Give it a check it can run, such as an end-to-end test of the user flow or a property test of an invariant. [Addy Osmani](https://x.com/addyosmani/status/2111604705340326393)

## [Tools I use](/tools/)

- [Scrawl](https://scrawl.kitlangton.com/). Show an agent what’s happening on screen with narration and markup.
- [Hex](https://github.com/anomalyco/hex). Dictate text into the app I’m using.

## [Experiments](/experiments/)

- [T3 Code with Opus and DeepSeek](/t3-code-experiment/). 9 Nov 2026. Trying Opus as the orchestrator and DeepSeek as the workers.
- [AgentsView learning (prob nah)](/agentsview-learning/). 30 Oct 2026. Useful for finding old chats. I’m keeping my current learning reader.

## [Examples](/examples/)

- **Four design options side by side**. 12 Oct 2026. Compare the same product stories across four approaches, down to each option’s interface actions and backend behaviour. [Ryan Singer’s demo](https://x.com/rjs/status/2109351403005030603)
- **ToDesktop’s visual system docs**. 8 Sep 2026. See how one JSON description drives visual documentation of sequences, phases, data objects, and failure paths. [Dave Jeffery’s demo](https://x.com/davej/status/2096970427583074511?s=12)
- **An eval with held-out support tickets**. 28 Sep 2026. See how a team used 30 tickets to iterate and reserved 14 to check whether the improvement held. [Lance Martin’s worked examples](https://claude.dev/blog/automating-eval-design-and-hillclimbing/)

## [References](/references/)

- [Four Dark Corners of Requirements Engineering](/four-dark-corners-of-requirements-engineering/). Jan 1997. Pamela Zave and Michael Jackson on how to connect what software can observe and control to the outcome you need.
- **Towards Self-Driving Codebases**. 2 Sep 2026. What agents need from their development environment to exercise the software they change. [Dan Robinson](https://blog.detail.dev/posts/towards-self-driving-codebases/)
- **The Topology of an LLM Agent Loop With Tool Use**. 20 Oct 2026. Where the model, loop, and tools run, and what that means for cost, capability, and security. [Philip Zeyliger](https://blog.exe.dev/topology)
- **The Case Against Formal Verification, 50 Years Later**. 15 Aug 2026. A revisit of the 1979 arguments about what software proofs can establish and where specifications can go wrong. [Ivan Gavran](https://ivan-gavran.github.io/0-social-processes-paper)
