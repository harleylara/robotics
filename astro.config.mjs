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
import rehypeKatex from 'rehype-katex';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeCitation from 'rehype-citation';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
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
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append'
      }],
      [rehypeKatex, {
        macros: NOTATION,
        stric: "ignore"
      }],
      [rehypeExternalLinks, {
        rel: ['nofollow'],
        target: '_blank',
        content: { type: 'text', value: ' ↗' }
      }],
      [rehypeCitation, {
        "bibliography": [
          "./src/content/docs/en/references.bib",
        ],
        "csl": "https://raw.githubusercontent.com/citation-style-language/styles/refs/heads/master/apa.csl",
        "lang": "https://raw.githubusercontent.com/citation-style-language/locales/refs/heads/master/locales-eu.xml",
        "linkCitations": true
      }]
    ]
  }
});
