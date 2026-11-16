---
title: Describe how an existing product behaves
description: Trace what people experience when a flow is interrupted.
lastUpdated: 2026-11-16
---

Use this when you need an outside-in account of an existing product. Describe what people see, what they can do, and what happens when they stop halfway through.

## Start with one feature

1. **Scope one surface.** Name the app, route or role, and configuration. Pin the source commit and read the code and tests for one small feature with a real interaction.
2. **Describe it event by event.** Write what the person does, what they see, what changes during the interaction, and what gets committed. Ask the same questions about cancellation and interruption for every feature.
3. **Verify it in the running product.** Turn observable claims into checks. Record what happens, correct the description where needed, and collect suspected defects with a repro and the decision they need.

Use the pilot to settle the vocabulary and depth before extending the description. Put shared facts such as what “saved” means in one foundation page the rest can cite.

## Run the method with an agent

[Open Steve Ruiz’s `product-description` skill](https://gist.github.com/steveruizok/83ae5c53f2784ebf8f5fe0a3fb94480f/f9435a3c7b022ecadc8441542675a9163cdb6b7f#file-skill-md) · [Also available in Callum’s skills.sh collection](https://www.skills.sh/callumflack/skills/product-description).

```text
$product-description

Write a product description for one feature: [feature] on [screen, route, or command].

Source checkout: [absolute path to the existing product repo]
Output repo: [absolute path to a new directory alongside the source checkout]

Initialize the output directory as its own local Git repo and put every generated file there. Treat the source checkout as read-only.

Use this feature as the pilot. Read the code and tests, describe what the user sees and does event by event, and check what happens if they cancel or get interrupted. Verify the behavior in the running product and record anything you couldn’t confirm.

Stop after the pilot and show me the output repo path and the feature document.
```

In Codex, invoke `$product-description` with the source checkout, the surface to describe, and the first feature to pilot. Choose a new directory alongside the checkout for the description. The skill creates a self-contained Git repo there and treats the product’s source repo as read-only.
