---
title: Automate agreed rules and surface open decisions
description: Give the agent checks it can act on and reviewers the decisions that change what callers can rely on.
lastUpdated: 2026-11-13
---

Automate checks for rules the team has agreed on. Put open decisions that change what callers can rely on in front of the reviewer who owns the contract.

At Earendil, Armin Ronacher and Cristina Poncela Cubeiro describe a pull request review tool that sends clear rule violations to the agent and calls out changes such as migrations and permissions for a human to review. That gives reviewers a place to make decisions they’ll have to live with. [The Friction Is Your Judgment](https://ai.engineer/talks/_Zcw_sVF6hU-friction-is-your-judgment) · [Talk slides](https://mitsuhiko.github.io/talks/ai-engineer-talk/)

- **Give the agent a check it can act on.** If the team has agreed that SQL goes through the query layer, a lint rule can point to queries outside it. The agent can repair the violation and rerun the check.
- **Give the reviewer a decision to make.** State the promise under review, who relies on it, and what they would do under each interpretation.

## A status at a repository boundary

In a cross-repo state-machine handoff, browser runtime ownership checks passed. The team deferred adopting the upstream change while the rules for retiring local files were still open.

**Illustrative example.** A service emits `complete` while a caller waits for a result.

- **Check the trace.** Which component emitted `complete`, and what event came before it?
- **Decide what `complete` promises.** The caller’s next move depends on the answer.
  - **The producer finished.** The caller still needs to check whether it can read the result before closing the flow.
  - **The result is readable.** The caller can close the flow as soon as it sees `complete`.
- **Enforce the agreed promise.** If `complete` promises a readable result, delay readback in a regression test and check that `complete` waits.

## A prompt and two skills

- **While the decision is open.** Ask what would have to be true for the caller to close the flow safely on `complete`. [What would have to be true?](/prompts/what-would-have-to-be-true/)
- **When review needs a decision.** Use `so-what` to spell out what’s at stake, recommend a choice, and name who needs to decide. [So What on skills.sh](https://www.skills.sh/callumflack/skills/so-what)
- **Once the rule is settled.** For a repeated or costly mistake, use `learning-loop` to put the rule in the nearest existing type, lint rule, or test. Verify that it rejects the bad case and still accepts a valid one. [Learning Loop on skills.sh](https://www.skills.sh/callumflack/skills/learning-loop)
