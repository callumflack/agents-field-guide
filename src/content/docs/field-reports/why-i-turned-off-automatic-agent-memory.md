---
title: Why I turned off automatic agent memory
description: I tested whether lessons saved from old chats helped agents on four new tasks.
lastUpdated: 2026-11-12
---

I built a searchable library of short case records from past coding chats. A record kept what happened, what I corrected, and when the lesson applied. I tried saving those cases automatically and loading relevant ones into later Codex and Pi tasks.

## What I tested

I ran each task twice in fresh chats with the same model, brief, and project docs. For one run per task, the agent could search 11 cases from earlier chats. I set the scoring criteria before looking at the results.

| Task | What happened in both runs | Score in each run |
| --- | --- | --- |
| Prototype a disconnect dialog | The dialog handled retry and success, and its buttons shifted while the request was pending. | 4/5 |
| Propose a shared archive for the cases | Both proposals kept the archive readable and made the evidence portable. | 4/4 |
| Review replacing dialog buttons with a spinner | Both reviews recommended keeping the existing buttons visible. | 3/3 |
| Review when a revocation dialog should close | Both reviews required a fresh read showing the revoked access was gone. | 3/3 |

The agent with search found the relevant dialog case and said the buttons would stay put. In the browser, the buttons shifted about 37 pixels in both versions. The check allowed two pixels.

## Why I stopped

The automatic setup took work to maintain. Its checker flagged two Codex chats as missing cases they’d already received. We fixed how it read truncated logs and tracked what the agent had seen before the chat was condensed.

I could show that cases reached agents. The four-task test gave me no score gain, and I still had no evidence the setup saved me time in ordinary work. I turned off automatic capture, delivery, and monitoring. I kept the cases and the ability to look them up.

## Still to try

I haven’t tested keeping a long-running chat for each role. I also haven’t tried other memory systems such as Victor Taelin’s UniiChat, which keeps one ongoing conversation and lets the agent open older summaries back to the original messages. [UniiChat](https://github.com/VictorTaelin/uniichat).
