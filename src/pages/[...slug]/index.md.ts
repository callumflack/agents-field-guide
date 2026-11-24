import type { APIRoute } from "astro";
import { markdownRoute } from "@cloudflare/nimbus-docs/agent-endpoints";
import { guideAdditions } from "../../lib/guide-additions";

const markdown = markdownRoute();
export const getStaticPaths = markdown.getStaticPaths;
export const GET: APIRoute = async (context) => {
  const response = await markdown.GET(context);
  if (context.params.slug !== "changelog" || !response.ok) return response;

  const additions = await guideAdditions();
  const dates = [...new Set(additions.map((page) => page.date))];
  const timeline = dates.map((date) => `## ${date}\n\n${additions
    .filter((page) => page.date === date)
    .map((page) => `- [${page.title}](${page.href}) — ${page.category}`)
    .join("\n")}`).join("\n\n");
  const body = await response.text();
  const source = body.indexOf("\nSource: ");
  const content = source < 0
    ? `${body}\n\n${timeline}\n`
    : `${body.slice(0, source)}\n${timeline}\n${body.slice(source)}`;
  const headers = new Headers(response.headers);
  headers.delete("etag");
  headers.delete("content-length");
  return new Response(content, { status: response.status, headers });
};
