---
title: Programming as Theory Building
description: Paper on how programmers understand and adapt a program.
---

[Read Peter Naur’s journal paper (PDF)](https://algoritmos-iii.github.io/assets/bibliografia/programming-as-theory-building.pdf), published in *Microprocessing and Microprogramming*, May 1985, volume 15, number 5, pages 253–261. [Publisher’s entry](https://doi.org/10.1016/0165-6074(85)90032-8). [Scanned reprint with editorial commentary (PDF)](https://pages.cs.wisc.edu/~remzi/Naur.pdf).

> On the Theory Building View the primary result of the programming activity is the theory held by the programmers.

— Peter Naur, [page 260](https://algoritmos-iii.github.io/assets/bibliografia/programming-as-theory-building.pdf#page=8).

## Naur’s argument

For Naur, knowing a program means being able to explain how it serves the work people do, justify why it was built that way, and adapt it as the work changes. In his compiler example, the team adding a language extension had annotated source and detailed design notes. The original programmers spotted where the proposed patches bypassed facilities the compiler already offered and showed how to extend it within its existing structure. [Pages 254–256](https://algoritmos-iii.github.io/assets/bibliografia/programming-as-theory-building.pdf#page=2).

## Building with agents

Use a new case to check what an agent has understood before it edits the code. Suppose an upload belongs to the account that started it, and users can now switch accounts while it runs. Ask the agent to predict who can retrieve the file under the current design, find where that rule is enforced, and verify its prediction by switching accounts.

Write down which user need the rule serves, alongside the code and the case that exercises it. That gives the next session a place to start when the requirement changes again.
