import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { SITE } from './consts';

const docs = defineCollection({
    loader: glob({
        pattern: 'en/**/*.mdx',
        base: './src/content/docs',
    }),
    schema: z.object({
        title: z.string().default(SITE.title),
        description: z.string().default(SITE.description),
        lang: z.literal('en-us').default(SITE.defaultLanguage),
        dir: z.union([z.literal('ltr'), z.literal('rtl')]).default('ltr'),
        toc: z.boolean().default(true),
        image: z.object({
            src: z.string(),
            alt: z.string(),
        }).optional(),
        ogLocale: z.string().optional(),
    }),
});

export const collections = { docs };
