---
title: Test audit
tableOfContents: false
---

I use [`test-audit`](https://github.com/openclaw/openclaw/tree/main/.agents/skills/test-audit) when writing a regression test or reviewing a suite for tests that duplicate stronger coverage or depend on implementation details.

Before adding a test, ask four questions.

1. What observable behavior, invariant, or independent contract does the test protect?
2. What credible regression would make it fail?
3. Why does the existing suite miss it, and where can you test the contract most directly?
4. Would the test require an export, flag, or hook that only the test uses? If so, test through a boundary the application already exposes.

For a regression, check that the test fails for the intended reason before the fix and passes afterward. Keep a second test at another layer when it covers a distinct risk, such as data getting lost in transit or state failing to survive a restart.

When auditing existing tests, check what still proves the contract before deleting a test. Remove any production hook that served only the deleted test.
