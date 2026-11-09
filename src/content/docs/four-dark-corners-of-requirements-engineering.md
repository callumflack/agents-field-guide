---
title: Four Dark Corners of Requirements Engineering
description: How a software specification, together with facts about the world, delivers a requirement.
---

**Paper published Jan 1997**

Pamela Zave and Michael Jackson’s *Four Dark Corners of Requirements Engineering* argues that **a requirement describes what we want to happen in the world. A specification describes what the software must do at its boundary to make that outcome follow, given how the world works.**

1. **Ground formal terms in reality.** Give each primitive term a precise, plain-language *designation*. “Only students enroll in courses” is almost tautological if *student* means anyone enrolled in a course. It becomes a substantive claim if *student* means someone who has formally matriculated.
2. **Separate facts from desired outcomes.** The authors call these the *indicative* and *optative* moods. An account balance is a debt the bank owes the customer. Paying out a valid withdrawal request is a desired outcome. Both describe the world the software operates in, and neither dictates how the software stores its state.
3. **Distinguish what software can observe from what it controls.** A turnstile controller can detect payment and a push, and it can lock the turnstile. A person actually entering is an event the controller may never observe. Yet that event is central to the requirement that admissions never outnumber payments.
4. **Use domain knowledge to bridge the gap.** The turnstile specification tells the controller when to lock and unlock. That satisfies the admissions requirement only because of facts about the hardware and timing, such as a locked turnstile preventing a push. The same reasoning exposes requirements that depend on hidden information or future events. Where the best available signal is an estimate, the gap is real. Recorded stock movements, for example, can diverge from what is physically in a bin.

The paper’s test for completion is **S, K ⊢ R**. The implementable specification *S*, together with validated domain knowledge *K*, must entail the customer’s requirements *R*. The specification and domain knowledge must also be consistent. This separates two questions that are easy to collapse. Does the software meet its specification? And would software that meets that specification actually deliver the outcome the customer asked for?

[Read the original paper by Pamela Zave and Michael Jackson (PDF)](https://www.pamelazave.com/4dc.pdf).
