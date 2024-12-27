import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import node from '@astrojs/node';

// https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeCitation from 'rehype-citation';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkCapitalizeHeadings from 'remark-capitalize-headings';
import { NOTATION } from './src/consts';

// Component auto import
import AutoImport from 'astro-auto-import';

import mdx from "@astrojs/mdx";
import MDXCodeBlocks, { mdxCodeBlockAutoImport } from 'astro-mdx-code-blocks';
import { citationTransform } from './src/plugins/citation.mjs';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  },
  integrations: [preact(), react(), tailwind(),
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
            macros: NOTATION
        }],
        [rehypeExternalLinks, {
          rel: ['nofollow'],
          target: '_blank',
          content: { type: 'text', value: ' ↗' }
        }],
        // [rehypeCitation, {
        //   "bibliography": [
        //     "https://raw.githubusercontent.com/timlrx/rehype-citation/main/test/references-data.bib",
        //     "./src/content/docs/en/references.bib"
        //   ],
        //   // "csl": "https://raw.githubusercontent.com/citation-style-language/styles/master/acm-sig-proceedings.csl",
        //   "linkCitations": true
        // }]
    ]
  }
});
