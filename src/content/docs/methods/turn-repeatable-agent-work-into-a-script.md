---
title: Turn repeatable agent work into a script
description: Use the agent to work out the rules, then script the steps you can check.
lastUpdated: 2026-11-12
---

Keep exploring with the agent while a new case could change the rules. Hand execution to a script when you can name the inputs, describe what should happen, and check the result.

- **Keep exploring** when examples still lead to different decisions. Have the agent work through a few real cases and show you where the rules break.
- **Write the script** when the same rules work across those cases. Give it a check you can run again and a clear error when it hits an input it can’t handle.

## Example

For a new Field Guide playbook, work with the agent on the title, description, and placement, then add the entry to the [Playbooks index](/methods/). Run `npm run catalogue:sync` to rebuild the homepage catalogue from the category pages. Open the homepage on localhost to check how the entry wraps and follow its link.
