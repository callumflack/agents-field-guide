---
title: "Review untested branches"
tableOfContents: false
---

```text
For each branch no test runs, is it guarding untrusted input, or can the types make it impossible?
```

Use this when reviewing untested branches before removing validation checks.

If the branch guards untrusted input, use [Test audit](/external-skills/test-audit/) to choose where to test it and identify the regression the test should catch.

Source: Callum Flack, from a code review experiment involving token validation.
