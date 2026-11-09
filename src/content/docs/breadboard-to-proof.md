---
title: Take a breadboard from sketch to proof
description: Map an upload, ask an agent to build it, and prove the result survives reopening.
---

**9 Nov 2026**

Use this when a flow can be interrupted and you need to know what the user will find when they come back.

## Map the flow

I learned from Ryan Singer (@rjs) to use the breadboard as the source of truth. Give the shaping doc the same structure as the breadboard so readers can match the prose to the flow. [Ryan Singer’s original post (21 Oct 2026)](https://x.com/rjs/status/2112657531910705296)

To map your own workflow with an agent, use Callum Flack’s [breadboard skill](https://www.skills.sh/callumflack/skills/breadboard), published 2 Nov 2026.

<a href="https://desktop-source-deletion.callumflack.chatgpt.site/index.html?flow=recovery" target="_blank" rel="noopener noreferrer">Open Unity Surfaces’ deletion recovery breadboard</a>. Select **Quit after the server delete, before local cleanup** to follow the story through to its native check.

**Worked example.** A person uploads a file, closes the tab while it is processing, and later returns to open the result. The promise: **the same upload has exactly one usable result after reopening.**

```text
Upload a file → Processing → Close the tab
Reopen uploads → Find the same upload
  Still processing → See its current status
  Ready            → Open the result
  Failed           → Retry this upload
```

The breadboard names the places and actions the person can use. The saved upload ties those places together: it gives the returning user something to find even if the tab and its memory are gone. If retry and completion can overlap, [chart the states and event orders](/find-implicit-state-machines/) before choosing how to handle them.

## Give the agent this prompt

```text
Use this breadboard to implement one flow: upload a file, close the tab
while it is processing, then reopen the uploads page and open the result.

On return, find the original upload and show its current status. If the
upload failed, let the user retry that same upload.

Add and run a check called return-after-interrupted-upload. Use a fixture
whose expected result you can inspect. Confirm processing has started
before closing the tab. Reopen in a fresh tab with the same account.
Find the original upload, wait for it to finish, and assert that it has
exactly one result and that opening it returns the expected content.

Show the exact command, the relevant assertions, and the observed result.
Call out which paths you did not exercise.
```

## Check the result

1. **The interruption happened.** The check saw processing before it closed the tab.
2. **The result survived.** After reopening, the check found the original upload by its identity and counted exactly one result for it.
3. **The result worked.** The check opened the result through the user-facing flow and compared its content with the fixture's expected output.

A success message shows what appeared on screen. It cannot establish that the original result is still there, unique, and usable. The check above covers one interruption in the environment where it ran. To claim retry is safe, run a separate case where the first attempt can finish after retry begins and check that only one usable result remains.

[Ask for proof of work instead of a summary](/ask-for-proof-of-work/) is the reusable version of the last instruction. For a real example of a check going green without establishing the user outcome, see Vana’s [Green without reading data](https://unity-testing-lessons.callumflack.chatgpt.site/#case-three). For the reasoning behind the boundary, see [Four Dark Corners of Requirements Engineering](/four-dark-corners-of-requirements-engineering/).

## After you try it

Reply where we shared this page. Tell me the first place it stopped helping or what you changed to make the check work. I’ll keep useful observations here as dated field reports and link them to any change they prompted.

```text
Page version: 2026-11-09
I was trying to:
I expected / what happened:
Evidence I can share:
I’d change:
```
