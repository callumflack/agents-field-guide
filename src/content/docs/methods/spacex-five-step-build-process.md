---
title: SpaceX five-step build process
description: The sign’s five steps and notes from the article.
lastUpdated: 2026-11-25
---

Elon Musk’s five-step build process. The notes below are reproduced verbatim from Callum Flack’s [Do the grid fins still fold in?](https://www.callum.website/do-the-grid-fins-still-fold-in).

![SpaceX's five-step build process.](/images/spacex-build-steps.jpeg)

## The five steps

1. Make Requirements Less Dumb
2. Delete the Part or Process Step
3. Optimize
4. Accelerate
5. Automate

## Notes

### Make your requirements less dumb

- **your requirements are definitely dumb**
- it’s particularly dangerous if a smart person gave you the requirements b/c you might not **question them** enough
- everyone’s wrong at least some of the time
- always **question the person** who gave the requirement, not the department

### Delete the part or process

- **if you’re not occasionally adding things back in 10% of the time, you’re not deleting enough**
- you can make “in case” arguments for most things; **don’t hedge bets …** run at tight margins to get into orbit
- *CF note: a prime example of Thiel’s Definitive Optimism (as opposed to the “just in case” Indefinite Optimism bet-hedging): “a bad plan is better than no plan”*
- \*\*do not build what you do not need — “\*\*that’s why the griffins don’t fold down because it’s a whole mechanism we don’t need … our simulation show that so long as they follow the flow, it’s neither here nor there … so long as they don’t have a high angle of attack it doesn’t matter … can be added later … why were we adding them anyway?”
- **whatever it is, it must come with a name, not a department** — otherwise, you can have requirements that were randomly given 2 years ago by someone who has left etc … it may have been thought of as gospel but was actually just mentioned by someone in passing
- **a person must always hold responsibility for a requirement**, this allows you to question the person who gave the requirement

### Simplify or optimise

- **The most common error of a smart engineer is to optimise a thing that should not exist**
- **everyone’s been trained to answer the question (convergent logic)** — you can’t tell your professor he’s dumb or you’ll get a bad grade, you must answer the question **— this is an automatic mental straightjacket**
- safety can be **overcorrected**: “neither of those is true, it’s not cyanide nor is it that healthy for you” — story where they passed around a cup of hydrazine so everyone knew what it smelt like — showing that there’s no need to optimise a safety issue that does not exist

### Accelerate cycle time

- you’re moving too slowly, go faster
- …but don’t go faster until you’ve worked on the other 3 steps first — **if you’re digging your grave, don’t dig it faster, stop digging your grave**
- **you can always make things go faster**

### Automate

- *CF note: Musk doesn’t even give reasons here as it’s self-explanatory: once a process is assured, automate it*
- *CF note: we work with a lab testing agency who will not let us push and pull results via API, we’re forced to manually drag and drop PDFs … much human error ensues … “a little caution will get you killed.” — Cooper, Interstellar*

### Bonus: do not do in reverse + do not accidentally set limiters

- **do not do it in reverse!** ie. automated, accelerated, optimising/simplified, deleted…
- great example story of “the mat” ([23:30](https://youtu.be/t705r8ICkRw?t=1405)):
	- He was living on the production line because some process was choking their entire system
		- “I asked the battery safety team, what are these mats for? Then I asked the insulation team. **Each team said it was the other team’s prerogative …like a Dilbert cartoon”**
		- so they tested the car with and without fibreglass mats and couldn’t tell the difference, so they deleted them
- too much in-process testing ([25:00](https://youtu.be/t705r8ICkRw?t=1492)): **don’t set an accidental limiter which leads to false positives and throwing away good parts**
	- you don’t know where it’s breaking, so test WIP to isolate the mistake
		- forget to remove the in-process testing even though end-of-line testing is passing … creates useless debugging which chokes the cycle time
		- always remove almost every test when ready
		- *CF note: one could say there’s a relation between overcorrection and false positives — so conservative thought can be uncertain thought, which leads to overcorrection, too many “just in case” arguments, enlarged scope, and so on — character matters, strong founders matter! We think in terms of agility (externalised as a method) when perhaps we should think in terms of character (internalised as intellect)*

## Sources

- YouTube: [Starbase Tour with Elon Musk [PART 1 // Summer 2021]](https://www.youtube.com/watch?v=t705r8ICkRw&t=802s) — Everyday Astronaut. 53:16; the five-step process starts at 13:22.
- Article: [Do the grid fins still fold in?](https://www.callum.website/do-the-grid-fins-still-fold-in) — Callum Flack.
