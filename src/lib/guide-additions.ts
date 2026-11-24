import { getCollection } from "astro:content";
import { pageAdditions } from "./changelog.mjs";
import { catalogueEntries } from "./catalogue.mjs";

export async function guideAdditions() {
  const docs = await getCollection("docs");
  const categories = ["skills", "prompts", "methods", "field-reports", "references", "tools"];
  type GuidePage = { title: string; href: string; file: string; category: string };
  const pages = new Map<string, GuidePage>();
  for (const id of categories) {
    const category = docs.find((entry) => entry.id === id);
    if (!category) continue;
    for (const line of catalogueEntries(category.body ?? "")) {
      const href = line.match(/^- \[[^\]]+\]\((\/(?!\/)[^)#]+)\)/)?.[1];
      if (!href) continue;
      const page = docs.find((entry) => `/${entry.id}/` === href);
      if (!page || page.data.draft || !page.filePath) continue;
      pages.set(page.id, {
        title: page.data.title,
        href,
        file: page.filePath,
        category: category.data.title,
      });
    }
  }
  return pageAdditions([...pages.values()], process.cwd());
}
