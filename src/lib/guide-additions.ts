import { getCollection } from "astro:content";
import { relative, resolve } from "node:path";
import { pageAdditions, pageUpdates } from "./changelog.mjs";
import { cataloguePageHrefs } from "./catalogue.mjs";
import { categoryGroups, legacyRedirects } from "./navigation.mjs";

export async function guideAdditions() {
  const docs = await getCollection("docs");
  const categories = categoryGroups.map((group) => group.segment.slice(1));
  type GuidePage = { title: string; href: string; file: string; previousFile?: string; category: string };
  const pages = new Map<string, GuidePage>();
  for (const id of categories) {
    const category = docs.find((entry) => entry.id === id || entry.id === `${id}/index`);
    if (!category) continue;
    for (const href of cataloguePageHrefs(category.body ?? "")) {
      const page = docs.find((entry) => `/${entry.id}/` === href);
      if (!page || page.data.draft || !page.filePath) continue;
      const previousSlug = Object.entries(legacyRedirects).find(([, target]) => target === href)?.[0];
      pages.set(page.id, {
        title: page.data.title,
        href,
        file: page.filePath,
        previousFile: previousSlug ? `src/content/docs${previousSlug}.md` : undefined,
        category: category.data.title,
      });
    }
  }
  return pageAdditions([...pages.values()], process.cwd());
}

export async function guideUpdates() {
  const cwd = process.cwd();
  const docs = await getCollection("docs");
  const hrefsByFile = new Map<string, string>();
  for (const entry of docs) {
    if (entry.data.draft || !entry.filePath) continue;
    const slug = entry.id.replace(/\/index$/, "");
    hrefsByFile.set(relative(cwd, resolve(cwd, entry.filePath)), slug === "index" ? "/" : `/${slug}/`);
  }

  return pageUpdates(cwd).map(({ pages, ...update }) => ({
    ...update,
    pages: pages.map(({ file, ...page }) => ({ ...page, href: hrefsByFile.get(file) })),
  }));
}
