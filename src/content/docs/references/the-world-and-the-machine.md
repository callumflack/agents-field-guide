---
title: The World and the Machine
description: Paper on the relationship between software and the world it serves.
---

[Read Michael Jackson’s paper (PDF)](https://users.ece.utexas.edu/~perry/education/SE-Intro/jackson-icse95.pdf), published in the *Proceedings of the 17th International Conference on Software Engineering* (ICSE ’95), 1995, pages 283–292. [ACM proceedings entry](https://doi.org/10.1145/225014.225041). [Read the preserved PDF](https://sources.afg.callum.website/the-world-and-the-machine/48c6ab4b1e17360ab32be09d0042b43630d3afcd8da7d453c17042a959ab6061/jackson-the-world-and-the-machine-icse95.pdf), copied by permission of the Association for Computing Machinery.

> The requirement — that is, the problem — is in the *world*; the *machine* is the solution we construct.

— Michael Jackson, page 283.

## Jackson’s argument

A specification describes the machine’s required behaviour in terms of the events and states it shares with the world. Meeting that specification delivers the requirement only if its assumptions about the world hold. In Jackson’s runway example, the software used pulses from the landing wheels as evidence that the plane was on the runway. The wheels aquaplaned without turning, so the system withheld reverse thrust after landing. [Pages 285–286](https://users.ece.utexas.edu/~perry/education/SE-Intro/jackson-icse95.pdf#page=3).

Jackson grounds terms in recognisable events. Library membership can be defined through events such as enrolment and lapse. He also distinguishes conditions that already hold in the world, rules people are expected to follow, and conditions the machine must enforce. [Pages 289–292](https://users.ece.utexas.edu/~perry/education/SE-Intro/jackson-icse95.pdf#page=7).

## Building with agents

Give the agent the outcome and ask what it can observe, who controls that signal, and when the signal could come apart from the outcome.

For an upload, the outcome is that the user can reopen the app and retrieve the same file. A successful response and a visible file row are useful evidence. Have the agent open a fresh session, download the file and compare its contents with the original. Ask it to test an interruption, such as closing the app just after it reports success.

Use the same standard for the agent’s own actions. A successful push shows GitHub accepted the commit. Open the live page to establish that readers can see the approved reference.
