---
title: Coordinate work in Codex (Sol/Astra 6.2)
description: Split work across agents and chats, and keep a shared worklog.
lastUpdated: 2026-11-23
head:
  - tag: style
    content: |
      .docs-content pre.astro-code[data-language="text"] {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }
      .docs-content pre.astro-code[data-language="text"] > code {
        width: auto;
      }
      .docs-content pre.astro-code[data-language="text"] .line {
        display: inline;
        white-space: inherit;
      }
---

Eric Provencher shared these instructions at OpenAI DevDay 2026. Use the first four blocks as skill instructions in Codex. Put the worklog paragraph in `AGENTS.md`.

## Coordinate

```text
Split independent work into parallel sub-agent lanes with clear outcomes and ownership. Have agents message the relevant agent directly, to resolve concrete dependencies. Ask them to report back when the outcome changes the plan or they can’t resolve it. Integrate and check the final result.
```

## Manager

```text
Give two peers one concrete outcome, shared constraints, complementary responsibilities, and an initial write split. Both do substantive work; name one to assemble the result. Have them coordinate directly and adjust their split within the authorized subsystem without overlapping edits. Escalate changes to the outcome, protected boundaries, or another lane’s ownership.
```

## PR review queue

```text
For each PR in the review queue, spin up an independent chat to review the changes and report issues back to you. Manage their remediation within these chats and then orchestrate each lane to safely merge each into main. Report any blockers back to me.
```

## Producer

```text
Create dedicated chats responsible for Art, Design, Programming/integration, and Playtesting. Each lane should be treated as the sole owner and authority for its part of the work. Your job as the producer is to break up and assign tasks where best applicable, and keep all lanes moving towards the shared goal.
```

## Worklog

```text
Keep one worklog of the goal, current instructions, owners, unfinished work, and decisions. Reconcile new guidance with work already underway and update the relevant entries. Record decisions and their consequences, and notify affected agents directly, one-to-one. After compaction or handoff, read the worklog and check current state before continuing.
```

[Watch *What Comes After Loops?* on YouTube](https://www.youtube.com/watch?v=nAubbmlhPfI).
