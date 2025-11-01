import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel';
import mdx from "@astrojs/mdx";

import AutoImport from 'astro-auto-import';
import MDXCodeBlocks, { mdxCodeBlockAutoImport } from 'astro-mdx-code-blocks';

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
  integrations: [
    preact({
      include: ['**/preact/*'],
    }),
    react({
      include: ['**/react/*']
    }),
    tailwind(),
    // AutoImport expose components in the global scope
    // IMPORTANT!!: Do not use Global Objects from Javascript
    // E.g. A component called Math will overwrite
    // the global Math object
    AutoImport({
      imports: [
        mdxCodeBlockAutoImport('./src/components/Globals/CodeBlock.astro'),
        './src/components/Globals/Equation.astro',
        './src/components/Globals/Image.astro',
        './src/components/Globals/Drawio.astro',
        './src/components/Globals/Definition.astro',
        './src/components/Globals/Important.astro',
        './src/components/Globals/Terminal.astro',
        './src/components/Globals/Think.astro',
        // './src/components/Globals/Math/MathDefinition.astro',
        './src/components/Presentations/Presentation.astro',
        './src/components/Presentations/Slide.astro',
        './src/components/Presentations/OnlyOnSlide.astro']
    }),
    MDXCodeBlocks(),
    mdx()
  ],
  site: `https://robotics.harleylara.com`,
  markdown: {
    // Applied to .md and .mdx files
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
      }],
      // rehypeMathLinks,
      [rehypeExternalLinks, {
        rel: ['nofollow', 'noopener', 'noreferrer'],
        target: '_blank',
        contentProperties: { 
          className: ['link-icon'],
        },
        content: { type: 'text', value: ' ↗' }
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
  }
});
