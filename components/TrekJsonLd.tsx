import { Trek } from '@/app/types/trek'
import { siteConfig } from '@/app/metadata'

export default function TrekJsonLd({ trek }: { trek: Trek }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: trek.name,
    description: trek.description,
    url: `${siteConfig.siteUrl}/treks/${trek.slug}`,
    image: trek.imageUrl,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: trek.region,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
} 