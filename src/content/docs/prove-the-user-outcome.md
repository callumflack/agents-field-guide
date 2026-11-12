---
title: Prove the thing the user can actually do
description: Turn the user’s promise into an observable check that can catch a plausible failure.
lastUpdated: 2026-11-12
---

Decide what will count as proof before you start a change. Then check what a person can actually do with it.

> Before nontrivial action, prove the owner and oracle.

Callum Flack used this as a standing rule in his early `AGENTS.md`.

1. **Write one promise.** Name what the person does and what they can observe afterward. “I can reopen my upload and open its result” gives you a starting state, an action, and an outcome.
2. **Trace the owner.** Follow the user’s path to the code or record that controls the outcome. For the upload, trace where the upload and its result are saved and where the page reads them on return. Name what you can change and what’s outside the task.
3. **Choose the oracle.** Before editing, name the first check you’ll run, what you need to see, and a plausible failure it would catch. A success message can appear before the result has been saved. A saved record can exist while its output is unusable.
4. **Run the check through the user’s path.** Reopen the page in a fresh tab with the same account. Find the original upload, verify it has exactly one result, and open that result to check its contents against the expected output.
5. **Ask for evidence you can review.** Keep the command, the relevant assertion, what happened, and which environment it ran in. Record which other paths still need their own check.

Use the [interrupted upload walkthrough](/breadboard-to-proof/) for a complete example, or paste [the proof-of-work prompt](/ask-for-proof-of-work/).

When you improve a setup against an evaluation, save some cases to see whether the gain carries over. Lance Martin shows how a team used 30 tickets to iterate and reserved 14 for that check. [An eval with held-out support tickets](/eval-with-held-out-support-tickets/).

For the reasoning behind choosing observations that establish a requirement, see [Four Dark Corners of Requirements Engineering](/four-dark-corners-of-requirements-engineering/).
