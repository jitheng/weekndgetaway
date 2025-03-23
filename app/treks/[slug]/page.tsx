import { Metadata } from 'next'
import { siteConfig } from '@/app/metadata'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

// Remove the dynamic config
// export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  try {
    // Add error handling and logging
    console.log('Fetching treks for static params...')
    const treks = await prisma.trek.findMany({
      select: { slug: true },
    })
    
    console.log('Found treks:', treks)

    // Return empty array if no treks found
    if (!treks?.length) {
      console.log('No treks found, returning empty array')
      return []
    }

    return treks.map((trek) => ({
      slug: trek.slug,
    }))
  } catch (error) {
    console.error('Error fetching treks:', error)
    return [] // Return empty array on error
  }
}

// Generate metadata for each trek page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const trek = await prisma.trek.findUnique({
    where: { slug: params.slug },
  })

  if (!trek) {
    return {
      title: 'Trek Not Found',
      description: 'The requested trek could not be found',
    }
  }

  return {
    title: `${trek.name} - Trek Details`,
    description: trek.description,
  }
}

export default async function TrekPage({ params }: { params: { slug: string } }) {
  const trek = await prisma.trek.findUnique({
    where: { slug: params.slug },
  })

  if (!trek) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{trek.name}</h1>
      {/* Rest of your trek details */}
    </div>
  )
} 