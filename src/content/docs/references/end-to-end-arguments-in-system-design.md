---
title: End-to-End Arguments in System Design
description: Paper on where functions belong in layered systems.
---

[Read the paper (PDF)](https://web.mit.edu/saltzer/www/publications/endtoend/endtoend.pdf) by Jerome H. Saltzer, David P. Reed and David D. Clark, published in *ACM Transactions on Computer Systems*, November 1984, volume 2, number 4, pages 277–288. The journal article revises a paper presented in 1981.

> Only if the two checksums agree does the file transfer application declare the transaction committed.

— Saltzer, Reed and Clark, [page 3 of the MIT copy](https://web.mit.edu/saltzer/www/publications/endtoend/endtoend.pdf#page=3).

## The authors’ argument

Place a guarantee where the system has enough information to deliver it. In the authors’ file transfer example, the receiving application reads the file back from disk, computes its checksum, and sends it to the sender to compare with the original. Packet checks can reduce retries. The application still owns the comparison, because the file can be corrupted before or after the network carries it. [Pages 2–5 of the MIT copy](https://web.mit.edu/saltzer/www/publications/endtoend/endtoend.pdf#page=2).

## Building with agents

Give the completion check to the part of the workflow that knows what the user approved and can inspect what the user receives. To publish a reference, give the agent the approved text and the canonical URL. Have it fetch that URL after deployment and compare the visible content with the approved version before reporting success.

Keep the push and build receipts for diagnosis. If the push succeeded and readers still see the old page, report those two observations so the next check can start at deployment or serving.
