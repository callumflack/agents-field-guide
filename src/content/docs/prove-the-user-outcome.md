---
title: Prove the thing the user can actually do
description: Turn the user’s promise into an observable check that can catch a plausible failure.
lastUpdated: 2026-11-11
---

Use this when an agent says a change works and you need to know what a person can actually do with it.

1. **Write one promise.** Name what the person does and what they can observe afterward. “I can reopen my upload and open its result” gives you a starting state, an action, and an outcome.
2. **Pick a failure the check must catch.** A success message can appear before the result has been saved. A saved record can exist while its output is unusable. Choose the check that would expose the failure you care about.
3. **Inspect the outcome through the user’s path.** Reopen the page, find the original upload, and open its output. Assert the expected contents and the number of results. If the promise is about persistence, start the check from a fresh tab so existing page state cannot stand in for the saved result.
4. **Ask for evidence you can review.** Keep the command, the relevant assertion, what happened, and which environment it ran in. Record which other paths still need their own check.

Use the [interrupted upload walkthrough](/breadboard-to-proof/) for a complete example, or paste [the proof-of-work prompt](/ask-for-proof-of-work/).

When you improve a setup against an evaluation, save some cases to see whether the gain carries over. Lance Martin shows how a team used 30 tickets to iterate and reserved 14 for that check. [An eval with held-out support tickets](/eval-with-held-out-support-tickets/).

For the reasoning behind choosing observations that establish a requirement, see [Four Dark Corners of Requirements Engineering](/four-dark-corners-of-requirements-engineering/).
