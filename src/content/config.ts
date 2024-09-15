import { defineCollection, z } from 'astro:content'
// import { Categories } from '../config.ts'
// const slugs = Categories.map(c => c.slug)
// const categories = z.enum(slugs as [string, ...string[]])

const posts = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cardImage: image(),
      cardImage2: image().optional(),
      ogImage: image()
        .refine((img) => img.width >= 1200 && img.height >= 630, {
          message: 'OpenGraph image must be at least 1200 X 630 pixels!',
        })
        .or(z.string())
        .optional(),
      category: z.string(),
      pubDate: z.coerce.date(),
      selected: z.boolean().optional(),
      show: z.boolean().optional(),
      oldViewCount: z.number().optional(),
      tags: z.array(z.string()).optional(),
      updatedDate: z.coerce.date().optional(),
    }),
})

const categoryCollection = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    }),
})

export const collections = { posts, categories: categoryCollection }
