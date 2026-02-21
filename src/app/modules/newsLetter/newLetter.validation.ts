import { z } from "zod";

export const createNewsArticleValidation = z.object({
  body: z.object({
    article_id: z.string().min(1),
    link: z.string().url(),
    title: z.string().min(1),
    description: z.string().optional(),
    content: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    creator: z.array(z.string()).default([]),
    language: z.string(),
    country: z.array(z.string()),
    category: z.array(z.string()),
    datatype: z.string(),
    pubDate: z.coerce.date(),
    fetched_at: z.coerce.date(),
    image_url: z.string().url().optional(),
    video_url: z.string().url().nullable().optional(),
    source: z.string(), 
    duplicate: z.boolean().optional(),
  }),
});