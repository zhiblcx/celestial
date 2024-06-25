import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import { SITE } from '../config.ts'

export async function GET() {
    const posts: CollectionEntry<'posts'>[] = (await getCollection('posts')).sort(
        (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    )

    return rss({
        title: SITE.title,
        description: SITE.description,
        site: SITE.url,
        items: posts.map(post => ({
            ...post.data,
            link: `/posts/${post.slug}/`,
        })),
    })
}
