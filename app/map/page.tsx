"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";

// Dynamically import the map component to avoid SSR issues
const GoogleMapComponent = dynamic(
  () => import("@/components/map/google-map"),
  { ssr: false }
);

export default function MapPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Explore Destinations</h1>
          <p className="text-muted-foreground mb-4">
            Discover weekend getaways around Bengaluru on the map
          </p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter Destinations
        </Button>
      </div>

      {/* Map Container */}
      <Card className="p-0 overflow-hidden">
        <GoogleMapComponent />
      </Card>

      {/* Legend */}
      <div className="mt-4 p-4 bg-card rounded-lg">
        <h3 className="font-semibold mb-2">Map Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span>Bengaluru (Center)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span>Destinations</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">Click markers for details</span>
          </div>
        </div>
      </div>
    </main>
  );
}