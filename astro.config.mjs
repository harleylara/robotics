import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import mdx from "@astrojs/mdx";
import { unified } from '@astrojs/markdown-remark';

import tailwindcss from '@tailwindcss/vite';

// import AutoImport from 'astro-auto-import';
// import MDXCodeBlocks, { mdxCodeBlockAutoImport } from 'astro-mdx-code-blocks';
import MDXCodeBlocks from 'astro-mdx-code-blocks';

// https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeCitation from 'rehype-citation';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeMathML from '@daiji256/rehype-mathml';
import { NOTATION } from './src/consts';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    preact({
      include: ['**/preact/*'],
    }),
    react({
      include: ['**/react/*']
    }),
    MDXCodeBlocks(),
    mdx()
  ],
  site: `https://robotics.harleylara.com`,
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkMath,
        remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, {
          behavior: 'append'
        }],
        [rehypeMathML, {
          macros: NOTATION,
          wrap: "none",
        }],
        // rehypeMathLinks,
        [rehypeExternalLinks, {
          rel: ['nofollow', 'noopener', 'noreferrer'],
          target: '_blank',
          contentProperties: {
            className: ['external-link'],
          },
          content: { type: 'text', value: '↗' }
        }],
        [rehypeCitation, {
          bibliography: "references.bib",
          path: "./src/content/docs/en/",
          csl: "apa",
          // lang: "https://raw.githubusercontent.com/citation-style-language/locales/refs/heads/master/locales-eu.xml",
          linkCitations: true,
          showTooltips: true,
          tooltipAttribute: "data-tooltip"
          // inlineClass: ["bib-reference"]
        }],
      ]
    })
  }
});
