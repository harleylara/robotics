import { defineConfig } from 'astro/config';
// https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import preact from '@astrojs/preact';
import react from '@astrojs/react';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import mdx from "@astrojs/mdx";

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
        // Enable Preact to support Preact JSX components.
        preact(),
        // Enable React for the Algolia search component.
        react(), tailwind(), mdx()],
    site: `https://robotics.harleylara.com`,
    markdown: {
        // Applied to .md and .mdx files
        rehypePlugins: [[rehypeAutolinkHeadings, { behavior: 'append' }]]
    },
});
