---
title: 'A Rational Design Process: How and Why to Fake It'
description: Paper on design documentation and rejected alternatives.
sidebar:
  label: A Rational Design Process
---

[Read the paper (PDF)](https://www.laputan.org/pub/papers/Fake.pdf) by David Lorge Parnas and Paul C. Clements, published in *IEEE Transactions on Software Engineering*, February 1986, volume 12, number 2, pages 251–257. [IEEE publication record](https://doi.org/10.1109/TSE.1986.6312940).

> The documentation is our medium of design and no design decisions are considered to be made until their incorporation into the documents.

— Parnas and Clements, [page 256](https://www.laputan.org/pub/papers/Fake.pdf#page=6).

## Parnas and Clements’s argument

Requirements and implementation details emerge during the work, so designers backtrack. Parnas and Clements use an ideal process to guide the work and organise its documentation. Mark missing information where it belongs, keep working while it is open, and revise every affected document when a decision changes. They call this “faking” the ideal process. The resulting documents explain the design in a useful order and record the alternatives they considered and why they rejected them. [Section VII](https://www.laputan.org/pub/papers/Fake.pdf#page=6).

## Building with agents

Put enforceable rules in tests or types. Keep the design rationale somewhere the next agent can find it. Record why the choice was made and revise that record when the choice changes.

Our [changelog fix](https://github.com/callumflack/agents-field-guide/commit/fae5b403f748814144d15818a711fc7643879aaa) does both. The regression test checks that moving an unchanged source link produces no false additions or removals. The worklog records why the changelog treats it as the same source.
