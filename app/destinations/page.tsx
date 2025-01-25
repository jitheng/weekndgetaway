import { Compass, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DestinationsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Weekend Destinations</h1>
          <p className="text-muted-foreground">
            Discover perfect weekend getaways around Bengaluru
          </p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
          <Filter className="mr-2 h-4 w-4" />
          Filter Destinations
        </Button>
      </div>

      {/* Placeholder for destinations grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1623910270365-3d5e4da04533?q=80&w=2070")',
              }}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Destination {i}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                A beautiful weekend getaway perfect for nature lovers and adventure
                seekers.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">200 km from Bengaluru</span>
                <Button variant="ghost" size="sm">
                  <Compass className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}