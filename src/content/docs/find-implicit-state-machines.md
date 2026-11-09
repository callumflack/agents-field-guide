---
title: Find implicit state machines with Pstack
---

[Field Guide](/) · Draft

Ask the agent to find the state machines already implied by the app’s code. Use one formal verification skill per subsystem to check its rules, and draw statecharts for the user flows you most need to understand. Seeing the event orders side by side can expose a race before you change the code.

## The prompt

```text
find all of the implicit state machines in my app

use /create-formal-verification-skill to model these state machines, one skill per subsystem. and use /statechart to visualize my most important user flows

both skills are in pstack
```

Lauren (@poteto). [Original post](https://x.com/poteto/status/2119521036660314339)
