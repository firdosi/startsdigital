import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const mediaSchema = z.object({
  src: z.string(),
  alt: z.string().min(1),
  caption: z.string().optional()
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/case-studies' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    industry: z.string(),
    services: z.array(z.string()),
    outcomeSummary: z.string(),
    metrics: z.array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    ),
    responsibilities: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    seoTitle: z.string(),
    seoDescription: z.string(),
    ogImage: z.string().optional(),
    heroImage: mediaSchema.optional(),
    gallery: z.array(mediaSchema).optional(),
    draft: z.boolean().default(true)
  })
});

export const collections = { 'case-studies': caseStudies };
