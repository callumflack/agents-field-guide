import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import nimbus, {
  defineConfig as defineNimbusConfig,
} from "@cloudflare/nimbus-docs";
import { externalLinks, tableScroll } from "@cloudflare/nimbus-docs/markdown";

const nimbusConfig = defineNimbusConfig({
  // CHANGE_ME: your site's canonical origin (no trailing slash). Drives
  // canonical URLs, absolute OG image URLs, robots.txt, sitemap, and the
  // links in /llms.txt — leaving the placeholder breaks all of them.
  site: "https://agents-field-guide.callumflack-97f.workers.dev",
  // CHANGE_ME: your project's name — used for <title>, the home H1, and OG.
  title: "Agents Field Guide",
  // CHANGE_ME: a one-line description of your docs — used for meta + OG.
  description: "Prompts, methods, and worked examples for building with agents.",
  locale: "en",
  // CHANGE_ME: your repository — shown as the GitHub link in the header.
  socialImageAlt: "Agents Field Guide",
  features: { sidebar: false },
  sidebar: {
    items: [
      "index",
      {
        label: "Skills",
        segment: "/skills",
        landing: "/skills/",
        collapsed: true,
        items: ["skills-i-publish", "external-skills"],
      },
      {
        label: "Prompts",
        segment: "/prompts",
        landing: "/prompts/",
        collapsed: true,
        items: [
          "ask-for-proof-of-work",
          "find-implicit-state-machines",
          { autogenerate: { directory: "prompts" } },
        ],
      },
      {
        label: "Playbooks",
        segment: "/methods",
        landing: "/methods/",
        collapsed: true,
        items: [
          "breadboard-to-proof",
          "prove-the-user-outcome",
          "recover-drifting-work",
          "independently-valuable-steps",
          "turn-repeatable-agent-work-into-a-script",
          "give-the-agent-a-way-to-verify",
          "give-a-long-task-a-worklog",
        ],
      },
      {
        label: "Field reports",
        segment: "/field-reports",
        landing: "/field-reports/",
        items: [
          "why-i-turned-off-automatic-agent-memory",
          "agentsview-learning",
          "t3-code-experiment",
        ],
      },
      {
        label: "References",
        segment: "/references",
        landing: "/references/",
        collapsed: true,
        items: [
          "four-dark-corners-of-requirements-engineering",
          "towards-self-driving-codebases",
          "topology-of-an-llm-agent-loop",
          "case-against-formal-verification",
        ],
      },
      {
        label: "Tools I use",
        segment: "/tools",
        landing: "/tools/",
        collapsed: true,
        items: [
          { label: "Scrawl", link: "https://scrawl.kitlangton.com/" },
          { label: "Hex", link: "https://github.com/anomalyco/hex" },
        ],
      },
    ],
  },
});

export default defineConfig({
  // nimbus:adapter
  output: "static",
  redirects: {
    "/experiments": "/field-reports/",
    "/examples": "/methods/",
  },
  // Tailwind v4 via its Vite plugin (the integration Astro recommends for
  // Tailwind v4 — replaces the PostCSS plugin, which doesn't build under
  // Astro 7's Vite 8 bundler).
  vite: {
    plugins: [tailwindcss()],
  },
  // Hover-prefetch link targets so full-page navigations feel instant without
  // a client-side router.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    nimbus(nimbusConfig, {
      // Authoring rules are opt-in by design — your repo, your taste. The
      // two below are the load-bearing pair: frontmatter has to validate
      // against the content schema for the page to render properly, and
      // broken internal links are 404s for your readers. Add the others
      // (heading hierarchy, code-block language, style, etc.) when you're
      // ready to enforce them — see `nimbus-docs lint --help`.
      rules: {
        "nimbus/frontmatter-shape": "error",
        "nimbus/internal-link": "error",
      },
      markdown: {
        // Wrap wide tables so they scroll instead of overflowing the page
        // (styled by `.nb-table-scroll` in src/styles/prose.css).
        hastPlugins: [
          tableScroll(),
          externalLinks({
            arrow: null,
            internalHosts: [new URL(nimbusConfig.site).host],
            rel: ["noopener", "noreferrer"],
          }),
        ],
        // `## Install {#install}` gives a heading a fixed id. A heading that
        // ends in other `{…}` text, such as `{account_id}` in a .md file, is
        // read as attributes too; remove this to keep it as text.
        features: { headingAttributes: true },
      },
    }),
  ],
});
