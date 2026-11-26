---
title: Design modules around hidden decisions
description: A module-design method adapted for agents.
---

Use this when adding a capability or changing a design decision that several parts of a codebase depend on. For a local change within an established contract, work through the existing owner.

**Give a difficult or changeable design decision one owner, and let callers work without knowing that decision.** A module's responsibility determines its boundary. Files and processing steps alone do not establish that boundary.

This playbook adapts D. L. Parnas's module-decomposition criteria. The workflow and applications to agents are interpretations developed for the Field Guide.

## 1. Find the decision behind the change

Have the agent inspect the relevant implementation and callers. Name the required behaviour, then identify the decision that might change: storage format, provider, search algorithm, caching policy or when results are computed.

Keep the scope concrete. “Replace the notification provider” exposes a decision and its consumers. “Make the system modular” gives the agent no useful boundary.

## 2. Give that decision one owner

Put the representation and the operations that maintain it together. Callers should request the service they need through a contract that explains its behaviour, inputs, results and failures.

For example, a notification module can own provider payloads and error translation. If every caller still constructs those payloads and interprets provider errors, the decision remains spread across the codebase. Another wrapper has not contained it.

## 3. Question every promise

Ask which guarantees callers actually need. Storage layout, incidental ordering and the timing of internal work can become dependencies just as readily as function names.

In Parnas's index example, the printer needs the next alphabetically ordered entry. Asking the alphabetiser for that entry leaves it free to sort everything in advance or calculate the answer when requested. Requiring a completed table commits the printer to one timing choice.

Parnas also finds that his shifter promises an unnecessary numbering of rotations. Removing that promise allows it to produce already alphabetised entries. Final alphabetical order is required; the intermediate numbering was an implementation choice.

Preserve required guarantees. If a caller depends on delivery order or needs to distinguish a failed notification from a pending one, the contract must say so.

## 4. Assign agent work through the contract

When splitting work among agents, assign ownership of a decision and its implementation, and give consuming agents the agreed contract. A storage agent can choose a representation while a consumer uses the operations it exposes.

If the tasks require every agent to understand the same internal format, revisit the boundary before parallel implementation. Keep unresolved contract decisions with the person or agent responsible for settling them.

## 5. Check what a replacement would disturb

Walk through one plausible replacement. Which implementation files would change? Which callers would need new knowledge? A storage-format change that spreads into consumers reveals a dependency the boundary still exposes.

Have the agent explain the affected callers and verify the required behaviour through the project's existing checks. Add an abstraction when it contains a real decision or removes a real consumer obligation. A hypothetical future replacement alone does not justify extra machinery.

**Which promises does the caller actually need, and which merely describe how this version happens to work?**

---

Read D. L. Parnas's [On the Criteria To Be Used in Decomposing Systems into Modules](https://dl.acm.org/doi/pdf/10.1145/361598.361623), its [preserved PDF](https://sources.afg.callum.website/decomposing-systems-into-modules/7008fd6abc833ded750e52dbac4968e8eda339f66b462ca4427f1953f98df9c4/02-ParnasCriteria.pdf), or the [paper reference](/references/decomposing-systems-into-modules/) for alternate reading links.
