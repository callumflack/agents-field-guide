---
title: AgentsView learning
tableOfContents: false
---

*Prob nah.*

I tried AgentsView to find decisions in old chats. It recovered the passages I was looking for, and the surrounding conversation helped distinguish the accepted decisions from proposals.

I tried it again to see where Codex got stuck. The viewer made repeated polling easy to spot. A large batch of failed calls surfaced only when I checked Codex’s raw logs. Grouping failures by tool and error showed the same problem across different inputs.

I’m keeping my current learning reader. One request with the intended settings would have exposed the failure before the batch ran. See the [playbook for recovering drifting work](/recover-drifting-work/).

[AgentsView v0.46.1](https://github.com/kenn-io/agentsview/releases/tag/v0.46.1)
