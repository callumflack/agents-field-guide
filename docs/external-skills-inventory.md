# Refresh the external skills list

Run this from the Field Guide repo root. The global lockfile records external installs. It is a starting point for deciding what belongs on the public list.

```sh
mkdir -p .local
python3 - <<'PY' > .local/external-skills.md
from collections import defaultdict
import json
from pathlib import Path
import re

lockfile = Path.home() / ".agents" / ".skill-lock.json"
skills = json.loads(lockfile.read_text())["skills"]
authors = {
    "cursor": "Cursor",
    "emilkowalski": "Emil Kowalski",
    "jakubkrehel": "Jakub Krehel",
    "kitlangton": "Kit Langton",
    "mattpocock": "Matt Pocock",
    "t3dotgg": "Theo",
    "vercel-labs": "Vercel",
}
groups = defaultdict(lambda: defaultdict(list))
other = []
for name, entry in skills.items():
    repo = entry.get("source", "")
    if entry.get("sourceType") == "github" and re.fullmatch(r"[\w.-]+/[\w.-]+", repo):
        owner = repo.split("/")[0]
        groups[owner][repo].append(name)
    else:
        other.append(name)

print(f"# External skills inventory\n\n{len(skills)} lockfile entries. Local review copy.")
for owner in sorted(groups, key=lambda key: authors.get(key, key).casefold()):
    print(f"\n## {authors.get(owner, owner)}")
    for repo, names in sorted(groups[owner].items()):
        print(f"\n- [{repo}](https://www.skills.sh/{repo}). " + ", ".join(sorted(names)))
if other:
    print("\n## Other sources\n")
    for name in sorted(other):
        print(f"- {name}")
PY
```

1. Open `.local/external-skills.md`. It groups locked skill names by author or organization, then by collection. Treat the generated skills.sh URLs as candidates.
2. Pick the authors and collections you want to recommend. Confirm each public catalogue, then add its link and a short reason to use it to [External skills](../src/content/docs/external-skills.md). Use an original public project page if there is no catalogue.
3. Run `npm run build` and check the rendered External skills page. The inventory stays in ignored `.local/`. The lockfile, install details, and any unpublished collections stay outside `src/content/docs/`.
