import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';

import {NOTATION} from './src/consts';

// Component auto import
import AutoImport from 'astro-auto-import';

// https://astro.build/config
export default defineConfig({
    vite: {
        server: {
            watch: {
                usePolling: true
            }
        }
    },
    integrations: [
        preact(),
        react(), 
        tailwind(), 
        // AutoImport expose components in the global scope
        // IMPORTANT!!: Do not use Global Objects from Javascript
        // E.g. A component called Math will overwrite
        // the global Math object
        AutoImport({
           imports: [
                './src/components/Globals/Blockquote.astro',
                './src/components/Globals/A.astro',
                './src/components/Globals/Pre.astro',
                './src/components/Globals/CodeBlock.astro',
                './src/components/Globals/InlineCode.astro',
                './src/components/Globals/Em.astro',
                './src/components/Globals/H1.astro',
                './src/components/Globals/H2.astro',
                './src/components/Globals/H3.astro',
                './src/components/Globals/H4.astro',
                './src/components/Globals/H5.astro',
                './src/components/Globals/H6.astro',
                './src/components/Globals/Hr.astro',
                './src/components/Globals/Img.astro',
                './src/components/Globals/Ul.astro',
                './src/components/Globals/Ol.astro',
                './src/components/Globals/Li.astro',
                './src/components/Globals/Strong.astro',
                './src/components/Globals/P.astro',
                './src/components/Globals/Equation.astro',
                './src/components/Globals/Image.astro',
                './src/components/Globals/Drawio.astro',
            ]
        }),
        mdx()
    ],
    site: `https://robotics.harleylara.com`,
    markdown: {
        // Applied to .md and .mdx files
        remarkPlugins: [
            remarkMath,
            remarkGfm
        ],
        rehypePlugins: [
            [rehypeAutolinkHeadings, { 
                behavior: 'append'
            }],
            [rehypeKatex, {
                macros: NOTATION
            }]
        ]
    },
});
