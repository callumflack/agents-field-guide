import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import nimbus, {
  defineConfig as defineNimbusConfig,
} from "@cloudflare/nimbus-docs";
import { tableScroll } from "@cloudflare/nimbus-docs/markdown";

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
  sidebar: {
    items: [
      "index",
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
        label: "Skills",
        segment: "/skills",
        landing: "/skills/",
        collapsed: true,
        items: ["skills-i-publish", "external-skills"],
      },
      {
        label: "Methods",
        segment: "/methods",
        landing: "/methods/",
        collapsed: true,
        items: [
          "breadboard-to-proof",
          { label: "Use the breadboard as the source of truth", link: "https://x.com/rjs/status/2112657531910705296" },
          { label: "Work in independently valuable steps", link: "https://x.com/jamesacowling/status/2077104612398743701" },
          { label: "Give the agent a way to verify its work", link: "https://x.com/addyosmani/status/2111604705340326393" },
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
      {
        label: "Experiments",
        segment: "/experiments",
        landing: "/experiments/",
        collapsed: true,
        items: ["t3-code-experiment", "agentsview-learning"],
      },
      {
        label: "Examples",
        segment: "/examples",
        landing: "/examples/",
        collapsed: true,
        items: [
          { label: "Four design options side by side", link: "https://x.com/rjs/status/2109351403005030603" },
          { label: "ToDesktop’s visual system docs", link: "https://x.com/davej/status/2096970427583074511?s=12" },
          { label: "An eval with held-out support tickets", link: "https://claude.dev/blog/automating-eval-design-and-hillclimbing/" },
        ],
      },
      {
        label: "References",
        segment: "/references",
        landing: "/references/",
        collapsed: true,
        items: [
          "four-dark-corners-of-requirements-engineering",
          { label: "Towards Self-Driving Codebases", link: "https://blog.detail.dev/posts/towards-self-driving-codebases/" },
          { label: "The Topology of an LLM Agent Loop With Tool Use", link: "https://blog.exe.dev/topology" },
          { label: "The Case Against Formal Verification, 50 Years Later", link: "https://ivan-gavran.github.io/0-social-processes-paper" },
        ],
      },
    ],
  },
});

export default defineConfig({
  // nimbus:adapter
  output: "static",
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
        hastPlugins: [tableScroll()],
        // `## Install {#install}` gives a heading a fixed id. A heading that
        // ends in other `{…}` text, such as `{account_id}` in a .md file, is
        // read as attributes too; remove this to keep it as text.
        features: { headingAttributes: true },
      },
    }),
  ],
});
