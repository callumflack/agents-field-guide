---
title: Leave room for plausible corrections
description: Keep a cheap route to a plausible design correction.
lastUpdated: 2026-11-19
---

**Choosing a component also chooses which future changes remain cheap.** When requirements are uncertain and swapping a component would be cheaper than redesigning the system, prefer a suitable component with room to adjust in the likely directions.

## The anecdote

In a post recalling an anecdote attributed to Richard Feynman, Isegoria writes:

> I'm reminded of Feynman's anecdote about an early wartime engineering job he had, where he was given a catalog of parts and told never to use the largest or smallest part available, because there's a reason that it's the largest or smallest part available.

The repost explains the practical consequence: if the design needs a tweak, there may be no larger or smaller part to substitute. A small correction becomes a redesign.

Kirk Kerekes adds:

> At some point in the design process, the parts already in the design start to control the future of the design. A device ends up being designed by its parts.

## Bring this question to the decision

When an agent proposes a component, dependency or service whose limits could constrain the surrounding design, ask:

> If this assumption is wrong, what would we change next—and is that option available?

Name the uncertain assumption, the likely direction of correction, and the actual substitute or adjustment. Compare the cost of keeping that option with the cost of needing it later.

For example, if expected inputs already approach a service's maximum supported payload, slightly larger inputs may require splitting the work or switching services. Check whether larger inputs are plausible and whether accommodating them now is worth the cost.

## When the extreme is right

A smallest available component may be the only one that fits a fixed enclosure. Choose it, accept the constraint, and identify what a later correction would require.

The middle is not automatically best. Preserve a cheap option for a plausible change; an expensive option for an imagined future may be worse than accepting redesign.

## Sources

[The repost](https://x.com/rsnous/status/2123004152339120190) carries Isegoria's recollection and the explanation about substitution. [Kirk Kerekes's reply](https://x.com/Cocoader/status/2123146403421843620) supplies the observation about parts governing the design. The Feynman attribution has not been checked against a primary source.
