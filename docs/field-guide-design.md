# A Field Guide we can get better at together

Plan · 9 November 2026 · Updated 11 November 2026

The guide should help you make the next move on real work. Open it because you have a flow to design, an agent that keeps missing the point, or a result you need to trust. Find a method, see it applied, and try it. If it breaks in your situation, that is material for the next edition.

## What I’d add first

| Method | What you get on the page |
| --- | --- |
| **Prove the thing the user can actually do** | A way to turn a promise into an observable check. Show the gap between a success message, a saved result, and a result a returning user can retrieve. Link to the existing proof-of-work prompt as something you can paste. |
| **Take a breadboard from sketch to working software** | One story mapped from action to outcome, with a small annotated diagram and a named check. Show how UI grammar describes the parts and actions, and where a statechart helps with interruption and recovery. |
| **Get an agent unstuck when it keeps missing the point** | A decision table for a clear edit, an unsettled design, and a recurring miss. Show when to compare alternatives side by side, and when to inspect the first divergence and make one focused repair. |

The [breadboard playbook](../src/content/docs/breadboard-to-proof.md) already has the interrupted-upload walkthrough, a copyable prompt, and a named check. The upload is a worked example. The playbook links to a real deletion-recovery case and invites readers to send reports from their own use. The proof playbook reuses the upload example.

## How I’d find things

Keep the catalogue in the homepage content in this order. **Skills, Prompts, Playbooks, Field reports, References, Tools I use.** Lead with **What are you trying to do?**, the existing full-text search, and a few suggested moves such as *Map a flow*, *Prove the result*, and *Recover drifting work*. Each points straight to a useful page. Use the category pages and breadcrumbs for navigation through the guide.

| Thing | The question it answers |
| --- | --- |
| Playbook | How do I make this judgment when the details change? |
| Runbook, linked from a method where useful | What do I execute here? Which environment, prerequisites, steps, stop conditions, proof, and cleanup apply? |
| Field report | What am I trying, what held up in practice, and what changed? |
| Reference | What fact, paper, or lookup helps me make this decision? |
| Example | Can I inspect a concrete artifact or case? |

Put experiments in Field reports and mark ongoing trials *In progress*. Link to examples from the playbooks they illustrate so a reader can see how to apply the method.

A prompt keeps its exact wording, one line on when to use it, and its source. A skill has its own callable entry point. Link to both from the methods where they help. Give a runbook a separate page when someone needs to run it independently. Actual operational runbooks belong with the system and owner that can keep them current. A public runbook should be a runnable exercise in a safe environment, with its own prerequisites and expected result.

## One worked page

**Take a breadboard from sketch to working software**

Use this when a flow has an outcome you can state and an interruption that could change it. A routine copy edit can use its existing UI check.

> **Illustrative example** · A person uploads a file, closes the tab while it is processing, and later returns to find one usable result.

```text
Choose file → Upload → Processing → Return later → Open result
                                      └─ If failed → Retry → Open result
```

1. **Name the promise.** After reopening, the same file has one usable result. Decide what the person should see if processing is still under way.
2. **Trace the real owners.** The breadboard shows the person’s path. A statechart earns its place if you need to reason about concurrent completion and retry. The owner of the saved result determines what persistence means.
3. **Name the check.** `return-after-interrupted-upload` starts the upload, closes the tab at the relevant point, reopens, and inspects the result. Exercise retry separately if it makes a distinct promise.
4. **Keep the evidence with the claim.** A screenshot shows what appeared. The check establishes whether the same usable result survived reopening in that environment. A checked state model can establish specific ordering properties within its bounds.

Put the diagram and check on screen together. Link out to the exact prompt, the relevant skill, and the original sources. For a paper, add the decision it informs and the assumption that limits its use. [Breadboard as source of truth](https://x.com/rjs/status/2112657531910705296) · [Maggie Appleton on interface grammar](https://x.com/Mappletons/status/2114779610596675824)

## What to log

Keep the top of each playbook clean and current. Give it a small **Field reports** section for uses that teach something, including failures to find it and good reasons to skip it. Give each report a stable anchor and link it to the version tried. Keep an ordinary **Changes** section for edits that change what someone should do. An optional sitewide log can link to those dated entries when there are enough to browse.

```text
Method + version · date
I was trying to …
I expected … / What actually happened …
Evidence or example I can share …
I’d change …
```

The editor can add a one-line disposition and link the resulting edit, open question, or counterexample. For instance, if a friend can run the upload check but finds that it passes with two results, the report earns a specific revision to the assertion. A friend who tries the method in a second setting gives evidence about where it travels. Publication means the page is available to try. Its evidence should separately say whether it is source-backed, tried in a named setting, or independently reproduced. A formal claim about improved agent behavior deserves a stronger comparison.

Capture deeply at the moments that change judgment. Keep transcripts and runtime logs with their original owners. A working log carries an open decision and the next action. A field report carries a dated observation. A playbook revision carries the resulting change to the method. These can link to one another without repeating the account.

## Make it portable and easy to contribute

Keep a single editable public edition in portable Markdown with relative assets, stable URLs, and a way to refer to earlier revisions. The website renders those files and gives people a direct Markdown view. Private notes and source records retain their own authority. Only reviewed public pages and assets enter the site, and citations point to original public sources. An exact run can link to the project’s current runnable owner where access permits.

Start by sending friends the draft page with a link they can reply to in a channel you already share. Ask them to arrive with a real task and tell you the first place the guide failed them. Can they find the right page from the homepage, decide whether it applies, use it without a walkthrough, and send back enough detail to improve it? Those are four separate tests. A friend reaching for an example directly is evidence for a better index. A friend who finds the page and still can’t act is evidence for a better page.
