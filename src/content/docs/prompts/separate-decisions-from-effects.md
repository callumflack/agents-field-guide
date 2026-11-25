---
title: "Separate decisions from effects"
tableOfContents: false
---

```text
Find a function where business decisions are interleaved with database, network, or filesystem calls. Show how to separate the decisions from the I/O while preserving behavior. Explain what becomes easier to test, and whether the separation adds more complexity than it removes.
```

Use when reviewing code whose logic is difficult to test without external dependencies.

Adapted from [Jussi (@jussisaur)](https://x.com/jussisaur/status/2124089969413349738) on “functional core, imperative shell” and “push I/O to the edges”.
