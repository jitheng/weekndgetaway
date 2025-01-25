import { Metadata } from 'next'
import { siteConfig } from '@/app/metadata'
import prisma from '@/app/lib/prisma'

// Generate metadata for each trek page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Fetch trek data based on slug
  const trek = await prisma.trek.findUnique({
    where: {
      slug: params.slug
    }
  })

  if (!trek) {
    return {
      title: 'Trek Not Found',
      description: 'The requested trek could not be found'
    }
  }

  return {
    title: `${trek.name} Trek - Complete Guide`,
    description: `Complete guide to ${trek.name} trek. Find difficulty level, best time to visit, detailed itinerary, and everything you need to know about ${trek.name}.`,
    openGraph: {
      title: `${trek.name} Trek - Complete Guide | ${siteConfig.title}`,
      description: `Explore ${trek.name} trek. Get detailed information about difficulty, duration, best season, and complete itinerary.`,
      images: [
        {
          url: trek.imageUrl,
          width: 1200,
          height: 630,
          alt: trek.name,
        },
      ],
    },
  }
}

export default async function TrekPage({ params }: { params: { slug: string } }) {
  const trek = await prisma.trek.findUnique({
    where: {
      slug: params.slug
    }
  })

  if (!trek) {
    return <div>Trek not found</div>
  }

  return (
    <article>
      <h1 className="text-4xl font-bold mb-6">{trek.name} Trek</h1>
      
      <section className="trek-overview">
        <h2 className="text-2xl font-semibold mb-4">Trek Overview</h2>
        {/* Trek overview content */}
      </section>

      <section className="trek-details">
        <h2 className="text-2xl font-semibold mb-4">Trek Details</h2>
        {/* Trek details content */}
      </section>

      {/* Other sections */}
    </article>
  )
} 