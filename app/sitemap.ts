import { MetadataRoute } from 'next'
import { siteConfig } from './metadata'
import { fetchAllTreks } from './lib/fetchAllTreks'
import { Trek } from './types/trek'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch your trek data
  const treks = await fetchAllTreks()

  const trekUrls = treks.map((trek: Trek) => ({
    url: `${siteConfig.siteUrl}/treks/${trek.slug}`,
    lastModified: new Date(trek.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteConfig.siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...trekUrls,
  ] as MetadataRoute.Sitemap
}