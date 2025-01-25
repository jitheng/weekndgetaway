import { Compass } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next'
import { siteConfig } from './metadata'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Discover amazing weekend getaway places, hiking trails and plan your next adventure with HikeExplorer. Find detailed trek information, guides, and tips.',
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-cover bg-center" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1623910270365-3d5e4da04533?q=80&w=2070")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}>
        <div className="text-center text-white z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Weekend Escapes from Bengaluru
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Explore handpicked destinations within 300km of Bengaluru perfect for your next weekend adventure
          </p>
          <Link href="/destinations">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Compass className="mr-2 h-5 w-5" />
              Explore Destinations
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Plan Your Perfect Weekend Getaway
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Curated Destinations</h3>
              <p className="text-muted-foreground">
                Discover handpicked locations perfect for short trips, complete with detailed guides and local insights.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Smart Trip Planning</h3>
              <p className="text-muted-foreground">
                Use our interactive tools to plan your route, estimate costs, and create custom itineraries.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Community Insights</h3>
              <p className="text-muted-foreground">
                Read reviews, tips, and recommendations from fellow travelers to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}